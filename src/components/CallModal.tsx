import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';
import { Contact } from '../types';

interface CallModalProps {
  contact: Contact;
  type: 'voice' | 'video';
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ contact, type, onClose }) => {
  const [status, setStatus] = useState<'Ringing...' | 'Connecting...' | 'Connected'>('Ringing...');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const ringTimer = setTimeout(() => {
      setStatus('Connecting...');
    }, 1500);

    const connectTimer = setTimeout(() => {
      setStatus('Connected');
    }, 2800);

    return () => {
      clearTimeout(ringTimer);
      clearTimeout(connectTimer);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (status === 'Connected') {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#111b21] border border-[#222d34] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-8 text-white">
        
        {/* Call type badge */}
        <div className="text-xs uppercase tracking-wider text-[#00a884] font-semibold mb-6 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" />
          <span>WhatsApp {type === 'video' ? 'Video' : 'Voice'} Call</span>
        </div>

        {/* Contact Avatar / Video Frame */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#00a884]/30 shadow-xl flex items-center justify-center bg-zinc-800">
            <img 
              src={contact.avatar} 
              alt={contact.name}
              className="w-full h-full object-cover" 
            />
          </div>
          {status === 'Ringing...' && (
            <span className="absolute -inset-2 rounded-full border-2 border-[#00a884] animate-ping opacity-75" />
          )}
        </div>

        {/* Contact Name & Status */}
        <h3 className="text-xl font-medium mb-1 text-center">{contact.name}</h3>
        <p className="text-sm text-zinc-400 mb-8 tabular-nums">
          {status === 'Connected' ? formatTimer(duration) : status}
        </p>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {type === 'video' && (
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                isVideoOff ? 'bg-red-500/20 text-red-500' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isVideoOff ? 'Turn video on' : 'Turn video off'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          {/* End Call Button */}
          <button 
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg transition transform active:scale-95"
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
