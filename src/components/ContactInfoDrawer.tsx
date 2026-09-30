import React from 'react';
import { X, Phone, Video, Bell, BellOff, Lock, Trash2, Heart, ShieldCheck } from 'lucide-react';
import { Contact } from '../types';

interface ContactInfoDrawerProps {
  contact: Contact;
  onClose: () => void;
  onToggleMute: () => void;
  onClearChat: () => void;
}

export const ContactInfoDrawer: React.FC<ContactInfoDrawerProps> = ({
  contact,
  onClose,
  onToggleMute,
  onClearChat
}) => {
  return (
    <aside 
      className="w-80 md:w-96 border-l h-full flex flex-col overflow-y-auto select-none transition-all duration-200 z-20 shrink-0"
      style={{
        backgroundColor: 'var(--wa-panel-bg)',
        borderColor: 'var(--wa-border)'
      }}
      aria-label="Contact information"
    >
      {/* Header */}
      <div 
        className="flex items-center gap-6 px-4 h-[59px] shrink-0 border-b"
        style={{ 
          backgroundColor: 'var(--wa-header-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        <button 
          onClick={onClose}
          className="text-[var(--wa-icon)] hover:text-[var(--wa-text-primary)] transition"
          title="Close contact info"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-medium text-base" style={{ color: 'var(--wa-text-primary)' }}>
          Contact info
        </h3>
      </div>

      {/* Main Profile Summary */}
      <div className="flex flex-col items-center py-6 px-4 border-b text-center" style={{ borderColor: 'var(--wa-border)' }}>
        <div className="w-36 h-36 rounded-full overflow-hidden mb-4 shadow-md bg-slate-300">
          <img 
            src={contact.avatar} 
            alt={contact.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <h2 className="text-xl font-medium mb-1" style={{ color: 'var(--wa-text-primary)' }}>
          {contact.name}
        </h2>
        <p className="text-sm text-[var(--wa-text-secondary)] mb-4 tabular-nums">
          {contact.phone}
        </p>
      </div>

      {/* About section */}
      <div className="py-4 px-6 border-b" style={{ borderColor: 'var(--wa-border)' }}>
        <h4 className="text-xs uppercase font-semibold text-[var(--wa-text-muted)] mb-1">
          About
        </h4>
        <p className="text-sm font-medium" style={{ color: 'var(--wa-text-primary)' }}>
          {contact.about}
        </p>
      </div>

      {/* Media, Links & Docs */}
      <div className="py-4 px-6 border-b" style={{ borderColor: 'var(--wa-border)' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs uppercase font-semibold text-[var(--wa-text-muted)]">
            Media, links and docs
          </h4>
          <span className="text-xs text-[var(--wa-text-muted)]">12</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((_, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-md bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs text-[var(--wa-text-muted)] border"
              style={{ borderColor: 'var(--wa-border)' }}
            >
              Photo {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="py-2 border-b space-y-1" style={{ borderColor: 'var(--wa-border)' }}>
        <button 
          onClick={onToggleMute}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition text-sm text-left"
          style={{ color: 'var(--wa-text-primary)' }}
        >
          <div className="flex items-center gap-3">
            {contact.muted ? <BellOff className="w-5 h-5 text-red-500" /> : <Bell className="w-5 h-5 text-[var(--wa-icon)]" />}
            <span>Mute notifications</span>
          </div>
          <span className="text-xs text-[var(--wa-text-muted)]">
            {contact.muted ? 'Muted' : 'Off'}
          </span>
        </button>

        <div className="flex items-center gap-3 px-6 py-3 text-sm text-[var(--wa-text-secondary)]">
          <ShieldCheck className="w-5 h-5 text-[#00a884] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold block text-[var(--wa-text-primary)]">Encryption</span>
            <span>Messages and calls are end-to-end encrypted. Tap to verify.</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="py-2">
        <button 
          onClick={onClearChat}
          className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-500/10 text-red-500 transition text-sm text-left font-medium"
        >
          <Trash2 className="w-5 h-5" />
          <span>Clear messages in this chat</span>
        </button>
      </div>
    </aside>
  );
};
