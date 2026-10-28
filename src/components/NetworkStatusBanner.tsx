import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { getPendingSubmissions, syncPendingSubmissions } from '../utils/offlineQueue';

export const NetworkStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [showReconnected, setShowReconnected] = useState(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check initial queue count
    setPendingCount(getPendingSubmissions().length);

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      // Trigger automatic sync
      handleManualSync();
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 4500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    const handleQueueUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      setPendingCount(customEvent.detail?.count ?? getPendingSubmissions().length);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser default install banner prompt
      e.preventDefault();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('offline-queue-updated', handleQueueUpdate);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('offline-queue-updated', handleQueueUpdate);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const res = await syncPendingSubmissions();
      setPendingCount(res.remaining);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      {/* Offline Mode Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 text-xs sm:text-sm font-semibold shadow-md flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <WifiOff className="w-4 h-4 shrink-0 text-white" />
            <span>
              <strong>Offline Mode:</strong> You are currently offline. Product catalog, machining specs, and company info are fully available. Enquiries will be queued on your phone and sent when you reconnect.
            </span>
          </div>
          {pendingCount > 0 && (
            <span className="bg-amber-700/60 px-2.5 py-0.5 rounded-full text-[11px] whitespace-nowrap">
              {pendingCount} saved offline
            </span>
          )}
        </div>
      )}

      {/* Reconnected Banner */}
      {isOnline && showReconnected && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-emerald-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
          <Wifi className="w-4 h-4 shrink-0" />
          <span>Connection restored! You are back online.</span>
          {pendingCount > 0 && (
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="ml-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-700 hover:bg-emerald-800 rounded-full text-[11px] font-bold"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync {pendingCount} Pending</span>
            </button>
          )}
        </div>
      )}

      {/* Floating Offline Queue Chip if items are pending */}
      {pendingCount > 0 && isOnline && !showReconnected && (
        <div className="fixed bottom-24 right-4 z-40">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy text-white text-xs font-bold shadow-lg hover:bg-brand-navy-light transition-all border border-brand-orange/40"
            title="Click to sync offline inquiries to server"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-brand-orange ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : `Sync ${pendingCount} offline ${pendingCount === 1 ? 'request' : 'requests'}`}</span>
          </button>
        </div>
      )}
    </>
  );
};
