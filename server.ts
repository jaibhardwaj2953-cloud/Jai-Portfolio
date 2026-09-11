import express from 'express';
import path from 'path';
import https from 'https';
import http from 'http';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Streaming Proxy for Google Drive Video Master Files
  // Eliminates cross-origin iframe sandboxing, rate-limits, and third-party cookie blocks
  app.get('/api/video/:fileId', (req, res) => {
    const { fileId } = req.params;

    if (!fileId || !/^[a-zA-Z0-9_-]{20,}$/.test(fileId)) {
      res.status(400).send('Invalid Google Drive file ID');
      return;
    }

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
