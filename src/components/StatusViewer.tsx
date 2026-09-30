import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Contact } from '../types';

interface StatusViewerProps {
  contacts: Contact[];
  onClose: () => void;
}

export const StatusViewer: React.FC<StatusViewerProps> = ({ contacts, onClose }) => {
  // Collect all contacts with status stories
  const contactsWithStories = contacts.filter(
    c => c.statusStories && c.statusStories.length > 0
  );

  const [currentContactIdx, setCurrentContactIdx] = useState(0);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeContact = contactsWithStories[currentContactIdx];
  const activeStory = activeContact?.statusStories?.[currentStoryIdx];

  useEffect(() => {
    if (!activeStory || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next story or contact
          if (activeContact.statusStories && currentStoryIdx < activeContact.statusStories.length - 1) {
            setCurrentStoryIdx(s => s + 1);
            return 0;
          } else if (currentContactIdx < contactsWithStories.length - 1) {
            setCurrentContactIdx(c => c + 1);
            setCurrentStoryIdx(0);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory, isPaused, currentStoryIdx, currentContactIdx, contactsWithStories.length, activeContact, onClose]);

  if (!activeContact || !activeStory) {
    return null;
  }

  const handleNext = () => {
    setProgress(0);
    if (activeContact.statusStories && currentStoryIdx < activeContact.statusStories.length - 1) {
      setCurrentStoryIdx(s => s + 1);
    } else if (currentContactIdx < contactsWithStories.length - 1) {
      setCurrentContactIdx(c => c + 1);
      setCurrentStoryIdx(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (currentStoryIdx > 0) {
      setCurrentStoryIdx(s => s - 1);
    } else if (currentContactIdx > 0) {
      setCurrentContactIdx(c => c - 1);
      setCurrentStoryIdx(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1317] flex items-center justify-center select-none animate-in fade-in duration-200">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 z-30 transition"
        title="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Story Container */}
      <div className="relative w-full max-w-md h-[90vh] bg-black rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
        {/* Top Progress Bars */}
        <div className="absolute top-0 inset-x-0 p-3 z-20 flex gap-1.5">
          {activeContact.statusStories?.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: idx === currentStoryIdx ? `${progress}%` : idx < currentStoryIdx ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header info */}
        <div className="absolute top-6 inset-x-0 px-4 py-2 z-20 flex items-center justify-between text-white bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-3">
            <img 
              src={activeContact.avatar} 
              alt={activeContact.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-[#00a884]"
            />
            <div>
              <h4 className="font-semibold text-sm leading-tight">{activeContact.name}</h4>
              <p className="text-xs text-white/70">{activeStory.time}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-2 text-white/80 hover:text-white"
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>

        {/* Story Visual Content */}
        <div className="flex-1 relative flex items-center justify-center bg-zinc-900">
          <img 
            src={activeStory.imageUrl} 
            alt="Status" 
            className="w-full h-full object-cover"
          />

          {/* Navigation touch overlay */}
          <div className="absolute inset-y-0 left-0 w-1/3 cursor-pointer" onClick={handlePrev} />
          <div className="absolute inset-y-0 right-0 w-1/3 cursor-pointer" onClick={handleNext} />
        </div>

        {/* Caption */}
        {activeStory.caption && (
          <div className="absolute bottom-6 inset-x-0 px-6 py-4 text-center z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-sm font-medium">
            {activeStory.caption}
          </div>
        )}
      </div>

      {/* Prev / Next Chevrons on desktop */}
      <button 
        onClick={handlePrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
