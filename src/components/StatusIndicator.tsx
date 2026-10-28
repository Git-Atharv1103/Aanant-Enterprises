import React, { useState, useEffect } from 'react';
import { Server, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const StatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<{
    status: string;
    emailForwardingConfigured: boolean;
    totalEnquiriesStored: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL 
          ? `${import.meta.env.VITE_API_URL}/api/status`
          : '/api/status';
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
        }
      } catch {
        // Backend might be offline during static testing
      }
    };
    checkStatus();
  }, []);

  if (!status) return null;

  return (
    <div className="fixed bottom-6 left-20 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-[11px] font-semibold text-brand-navy shadow-md hover:bg-white transition-colors"
          title="Click to check backend integration status"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <Server className="w-3.5 h-3.5 text-brand-orange" />
          <span>Form API Operational</span>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-72 text-xs space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-brand-navy flex items-center gap-1.5">
              <Server className="w-4 h-4 text-brand-orange" />
              <span>System & Form Status</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-gray-600">
            <div className="flex items-center justify-between">
              <span>Backend Server:</span>
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Local Enquiries Stored:</span>
              <span className="font-mono font-bold text-brand-navy">{status.totalEnquiriesStored}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Forwarding:</span>
              <span className={status.emailForwardingConfigured ? "text-green-600 font-semibold" : "text-amber-600 font-semibold flex items-center gap-1"}>
                {status.emailForwardingConfigured ? 'Active (SMTP)' : (
                  <>
                    <AlertTriangle className="w-3 h-3" /> Secure Local Log
                  </>
                )}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 border-t border-gray-100 pt-2">
            Every enquiry is recorded with a unique tracking ID in <code className="bg-gray-100 px-1 py-0.5 rounded">server/data/enquiries.json</code>.
          </p>
        </div>
      )}
    </div>
  );
};
