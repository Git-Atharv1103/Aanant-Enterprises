// Offline Queue & Storage Sync Utility for Mobile and Desktop
export interface PendingSubmission {
  id: string;
  type: 'enquiry' | 'quote' | 'custom-request';
  endpoint: string;
  payload: Record<string, unknown>;
  createdAt: string;
  retryCount: number;
}

const STORAGE_KEY = 'aanant_offline_pending_submissions';

export const isDeviceOnline = (): boolean => {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
};

export const getPendingSubmissions = (): PendingSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to read offline queue from localStorage:', err);
    return [];
  }
};

export const savePendingSubmission = (
  type: PendingSubmission['type'],
  endpoint: string,
  payload: Record<string, unknown>
): PendingSubmission => {
  const pending: PendingSubmission = {
    id: `offline-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type,
    endpoint,
    payload,
    createdAt: new Date().toISOString(),
    retryCount: 0
  };

  try {
    const existing = getPendingSubmissions();
    existing.push(pending);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('offline-queue-updated', { detail: { count: existing.length } }));
  } catch (err) {
    console.error('Failed to save to offline queue:', err);
  }

  return pending;
};

export const syncPendingSubmissions = async (): Promise<{
  synced: number;
  failed: number;
  remaining: number;
}> => {
  if (!isDeviceOnline()) {
    return { synced: 0, failed: 0, remaining: getPendingSubmissions().length };
  }

  const items = getPendingSubmissions();
  if (items.length === 0) {
    return { synced: 0, failed: 0, remaining: 0 };
  }

  let synced = 0;
  let failed = 0;
  const remainingItems: PendingSubmission[] = [];

  for (const item of items) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}${item.endpoint}`
        : item.endpoint;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload)
      });

      if (res.ok) {
        synced++;
      } else {
        item.retryCount += 1;
        remainingItems.push(item);
        failed++;
      }
    } catch {
      item.retryCount += 1;
      remainingItems.push(item);
      failed++;
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingItems));
    window.dispatchEvent(
      new CustomEvent('offline-queue-updated', {
        detail: { count: remainingItems.length, syncedCount: synced }
      })
    );
  } catch (err) {
    console.warn('Failed to update remaining offline submissions:', err);
  }

  return { synced, failed, remaining: remainingItems.length };
};

// Global background listener for network reconnection
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('[OfflineQueue] Reconnected online! Initiating automatic sync...');
    syncPendingSubmissions().then((result) => {
      if (result.synced > 0) {
        window.dispatchEvent(
          new CustomEvent('offline-sync-completed', {
            detail: { message: `Synced ${result.synced} offline inquiry/request to the server.` }
          })
        );
      }
    });
  });
}
