import express from 'express';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Dedicated Same-Origin Embed Player Page for <iframe> integration
  // Plays smoothly inside iframes without third-party cookie restrictions or Google Drive quota blocks
  app.get('/embed/:fileId', (req, res) => {
    const { fileId } = req.params;

    if (!fileId || !/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
      res.status(400).send('Invalid Google Drive file ID');
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>Video Player</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .player-wrap { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; }
    video { width: 100%; height: 100%; object-fit: contain; background: #000; outline: none; }
    .unmute-btn { position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 50; background: #059669; color: #fff; border: 1px solid rgba(255,255,255,0.25); padding: 8px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 14px rgba(0,0,0,0.6); display: none; align-items: center; gap: 8px; transition: all 0.2s; -webkit-tap-highlight-color: transparent; }
    .unmute-btn:hover { background: #047857; }
    .error-card { position: absolute; inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; background: #090d16; color: #fff; text-align: center; padding: 24px; z-index: 40; }
    .drive-link { margin-top: 14px; background: #2563eb; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(37,99,235,0.4); }
  </style>
</head>
<body>
  <div class="player-wrap">
    <video
      id="v"
      controls
      autoplay
      playsinline
      preload="auto"
      poster="/api/poster/${fileId}"
      src="/api/video/${fileId}"
    >
      <source src="/api/video/${fileId}" type="video/mp4" />
      Your browser does not support HTML5 video streaming.
    </video>
    <button id="unmute" class="unmute-btn" onclick="toggleUnmute()">
      <span>🔊 Tap to Unmute Video</span>
    </button>
    <div id="err" class="error-card">
      <p style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">Playback Connection Issue</p>
      <p style="font-size: 13px; color: #94a3b8; margin-bottom: 12px; max-width: 320px;">The video stream could not be loaded directly. You can view the master file in Google Drive.</p>
      <a class="drive-link" href="https://drive.google.com/file/d/${fileId}/view" target="_blank" rel="noopener">Open Master in Google Drive ↗</a>
    </div>
  </div>
  <script>
    const vid = document.getElementById('v');
    const btn = document.getElementById('unmute');
    const err = document.getElementById('err');

    function toggleUnmute() {
      vid.muted = false;
      btn.style.display = 'none';
    }

    vid.play().catch(function() {
      vid.muted = true;
      vid.play().then(function() {
        btn.style.display = 'inline-flex';
      }).catch(function(e) {
        console.warn('Autoplay failed:', e);
      });
    });

    vid.addEventListener('error', function() {
      console.warn('Stream load error:', vid.error);
      err.style.display = 'flex';
    });
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(html);
  });

  // Streaming Proxy for Google Drive Video Master Files
  // Eliminates cross-origin iframe sandboxing, rate-limits, and third-party cookie blocks
  app.get('/api/video/:fileId', (req, res) => {
    const { fileId } = req.params;

    if (!fileId || !/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
      res.status(400).send('Invalid Google Drive file ID');
      return;
    }

    // 1. High-Performance Local Disk Streaming (Zero latency, instant scrubbing, universal H.264)
    const webVideoPath = path.join(process.cwd(), 'cache', 'videos', `${fileId}_web.mp4`);
    const masterVideoPath = path.join(process.cwd(), 'cache', 'videos', `${fileId}.mp4`);
    const localVideoPath = fs.existsSync(webVideoPath)
      ? webVideoPath
      : fs.existsSync(masterVideoPath)
      ? masterVideoPath
      : null;

    if (localVideoPath) {
      try {
        const stat = fs.statSync(localVideoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Cache-Control', 'public, max-age=86400');

        if (range) {
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          if (start >= fileSize || end >= fileSize || start > end) {
            res.status(416).setHeader('Content-Range', `bytes */${fileSize}`).end();
            return;
          }

          const chunksize = end - start + 1;
          res.status(206);
          res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
          res.setHeader('Content-Length', chunksize);

          const stream = fs.createReadStream(localVideoPath, { start, end });
          req.on('close', () => {
            stream.destroy();
          });
          stream.on('error', (err) => {
            console.error(`Stream error for local file ${fileId}:`, err);
            if (!res.headersSent) {
              res.status(500).send('Video stream error');
            }
          });
          stream.pipe(res);
          return;
        } else {
          res.status(200);
          res.setHeader('Content-Length', fileSize);
          const stream = fs.createReadStream(localVideoPath);
          req.on('close', () => {
            stream.destroy();
          });
          stream.on('error', (err) => {
            console.error(`Stream error for local file ${fileId}:`, err);
            if (!res.headersSent) {
              res.status(500).send('Video stream error');
            }
          });
          stream.pipe(res);
          return;
        }
      } catch (err) {
        console.error(`Error reading local video cache for ${fileId}:`, err);
      }
    }

    // 2. Fallback: proxy stream through Google Drive
    const clientRange = req.headers.range;
    const initialUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;

    function streamFromGoogleDrive(targetUrl: string, redirectCount = 0) {
      if (redirectCount > 5) {
        res.status(502).send('Too many redirects from Google Drive');
        return;
      }

      const headers: Record<string, string> = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      };

      if (clientRange) {
        headers['Range'] = clientRange;
      }

      const client = targetUrl.startsWith('https') ? https : http;

      const upstreamRequest = client.get(targetUrl, { headers }, (upstreamResponse) => {
        // Handle HTTP 301/302/303/307 redirects from Google Drive
        if (
          upstreamResponse.statusCode &&
          upstreamResponse.statusCode >= 300 &&
          upstreamResponse.statusCode < 400 &&
          upstreamResponse.headers.location
        ) {
          let redirectUrl = upstreamResponse.headers.location;
          if (redirectUrl.startsWith('/')) {
            const parsed = new URL(targetUrl);
            redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
          }
          upstreamResponse.resume();
          return streamFromGoogleDrive(redirectUrl, redirectCount + 1);
        }

        // Set status code (200 OK or 206 Partial Content)
        res.status(upstreamResponse.statusCode || 200);

        // Forward headers required for smooth HTML5 video scrubbing and streaming
        const forwardHeaders = [
          'content-type',
          'content-length',
          'content-range',
          'accept-ranges',
          'last-modified',
          'cache-control',
        ];

        forwardHeaders.forEach((headerKey) => {
          const val = upstreamResponse.headers[headerKey];
          if (val) {
            res.setHeader(headerKey, val);
          }
        });

        // Ensure browser CORS and Range Seeking are explicitly permitted
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Accept-Ranges', 'bytes');

        // Pipe video stream chunks to client
        upstreamResponse.pipe(res);

        upstreamResponse.on('error', (streamErr) => {
          console.error(`Stream error for file ${fileId}:`, streamErr);
          if (!res.headersSent) {
            res.status(500).send('Error streaming video');
          }
        });
      });

      upstreamRequest.on('error', (reqErr) => {
        console.error(`Request error for file ${fileId}:`, reqErr);
        if (!res.headersSent) {
          res.status(500).send('Failed to connect to Google Drive video stream');
        }
      });

      // Cleanup if client disconnects or aborts
      req.on('close', () => {
        upstreamRequest.destroy();
      });
    }

    streamFromGoogleDrive(initialUrl);
  });

  // Cached Thumbnail / Poster Proxy for Google Drive Video Master Files
  // Avoids cross-origin blocking, hotlinking restrictions, and broken image icons
  app.get('/api/poster/:fileId', (req, res) => {
    const { fileId } = req.params;

    if (!fileId || !/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
      res.status(400).send('Invalid Google Drive file ID');
      return;
    }

    const localPosterPath = path.join(process.cwd(), 'cache', 'posters', `${fileId}.jpg`);
    if (fs.existsSync(localPosterPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      fs.createReadStream(localPosterPath).pipe(res);
      return;
    }

    const targetUrl = `https://lh3.googleusercontent.com/d/${fileId}=w1200`;

    function fetchPoster(url: string, redirectCount = 0) {
      if (redirectCount > 5) {
        res.status(502).send('Too many redirects');
        return;
      }

      const client = url.startsWith('https') ? https : http;
      const headers = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      };

      const upstream = client.get(url, { headers }, (upstreamRes) => {
        if (
          upstreamRes.statusCode &&
          upstreamRes.statusCode >= 300 &&
          upstreamRes.statusCode < 400 &&
          upstreamRes.headers.location
        ) {
          return fetchPoster(upstreamRes.headers.location, redirectCount + 1);
        }

        res.status(upstreamRes.statusCode || 200);
        res.setHeader('Content-Type', upstreamRes.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        res.setHeader('Access-Control-Allow-Origin', '*');
        upstreamRes.pipe(res);

        upstreamRes.on('error', () => {
          if (!res.headersSent) res.status(500).send('Poster pipe error');
        });
      });

      upstream.on('error', () => {
        if (!res.headersSent) res.status(500).send('Poster request error');
      });
    }

    fetchPoster(targetUrl);
  });

  // Vite middleware for development vs static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
