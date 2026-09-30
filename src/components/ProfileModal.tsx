import React, { useState } from 'react';
import { X, Camera, Edit2, Check } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [name, setName] = useState('Alex');
  const [about, setAbout] = useState('Available 🚀 Coding desktop apps');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border flex flex-col"
        style={{
          backgroundColor: 'var(--wa-panel-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ 
            backgroundColor: 'var(--wa-header-bg)',
            borderColor: 'var(--wa-border)'
          }}
        >
          <h3 className="font-semibold text-base" style={{ color: 'var(--wa-text-primary)' }}>
            Profile
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-[var(--wa-icon)] hover:text-[var(--wa-text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar area */}
        <div className="flex flex-col items-center py-6 px-6">
          <div className="relative group cursor-pointer mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[var(--wa-border)] shadow-lg">
              <img 
                src="/src/assets/images/avatar_alex_developer_1790769690262.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-150">
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium uppercase">Change photo</span>
            </div>
          </div>

          {/* Name Field */}
          <div className="w-full mb-6">
            <label className="text-xs uppercase font-semibold text-[#00a884] block mb-1">
              Your name
            </label>
            <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: 'var(--wa-border)' }}>
              {isEditingName ? (
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-base"
                    style={{ color: 'var(--wa-text-primary)' }}
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsEditingName(false)}
                    className="text-[#00a884] hover:opacity-80"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-base font-medium" style={{ color: 'var(--wa-text-primary)' }}>
                    {name}
                  </span>
                  <button 
                    onClick={() => setIsEditingName(true)}
                    className="text-[var(--wa-icon)] hover:text-[#00a884]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            <p className="text-xs text-[var(--wa-text-muted)] mt-1.5">
              This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </p>
          </div>

          {/* About Field */}
          <div className="w-full">
            <label className="text-xs uppercase font-semibold text-[#00a884] block mb-1">
              About
            </label>
            <div className="flex items-center justify-between py-1 border-b" style={{ borderColor: 'var(--wa-border)' }}>
              {isEditingAbout ? (
                <div className="flex-1 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm"
                    style={{ color: 'var(--wa-text-primary)' }}
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsEditingAbout(false)}
                    className="text-[#00a884] hover:opacity-80"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm" style={{ color: 'var(--wa-text-primary)' }}>
                    {about}
                  </span>
                  <button 
                    onClick={() => setIsEditingAbout(true)}
                    className="text-[var(--wa-icon)] hover:text-[#00a884]"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
