/**
 * Utility for persisting uploaded research documents (PDF, DOCX, TXT)
 * and custom links in IndexedDB and localStorage.
 */

const DB_NAME = 'JaiBhardwajPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'research_documents';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'paperId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export interface StoredDocument {
  paperId: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  dataUrl: string; // Base64 or Blob URL data
}

export async function saveDocument(doc: StoredDocument): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(doc);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Falling back to localStorage for document metadata:', err);
    try {
      localStorage.setItem(`doc_${doc.paperId}`, JSON.stringify({
        paperId: doc.paperId,
        name: doc.name,
        size: doc.size,
        type: doc.type,
        uploadedAt: doc.uploadedAt,
      }));
    } catch {
      // quota fallback
    }
  }
}

export async function getDocument(paperId: string): Promise<StoredDocument | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(paperId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to load from IndexedDB, checking localStorage:', err);
    const local = localStorage.getItem(`doc_${paperId}`);
    return local ? JSON.parse(local) : null;
  }
}

export async function deleteDocument(paperId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(paperId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to delete from IndexedDB:', err);
    localStorage.removeItem(`doc_${paperId}`);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
