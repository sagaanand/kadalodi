import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, Check, Package, Ship, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-ocean-100 text-ocean-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-base">Activity Notifications</h3>
                <p className="text-xs text-slate-500">Live logistics & order alerts</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No new notifications</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationRead(notif.id);
                    if (notif.orderId) {
                      navigate(`/track/${notif.orderId}`);
                      onClose();
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white border-slate-100 hover:border-slate-200 opacity-80'
                      : 'bg-ocean-50/40 border-ocean-200 hover:border-ocean-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      notif.type === 'shipment' ? 'bg-sky-100 text-sky-700' :
                      notif.type === 'customs' ? 'bg-amber-100 text-amber-700' :
                      notif.type === 'order' ? 'bg-ocean-100 text-ocean-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {notif.type === 'shipment' ? <Ship className="w-4 h-4" /> :
                       notif.type === 'order' ? <Package className="w-4 h-4" /> :
                       <AlertCircle className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold text-xs text-navy-900 line-clamp-1">{notif.title}</h4>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>

                      {notif.orderId && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-ocean-600 hover:text-ocean-700">
                          <span>View {notif.orderId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-ocean-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={() => {
                notifications.forEach(n => markNotificationRead(n.id));
              }}
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
