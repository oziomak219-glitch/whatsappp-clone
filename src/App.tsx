/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { StatusViewer } from './components/StatusViewer';
import { CallModal } from './components/CallModal';
import { ContactInfoDrawer } from './components/ContactInfoDrawer';
import { ProfileModal } from './components/ProfileModal';
import { ExportModal } from './components/ExportModal';
import { INITIAL_CONTACTS } from './data/initialData';
import { Contact, FilterType, ThemeMode, Message } from './types';
import { sounds } from './utils/sound';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string | null>('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Modals & Panels state
  const [isStatusViewerOpen, setIsStatusViewerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<{ contact: Contact; type: 'voice' | 'video' } | null>(null);

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const activeContact = contacts.find(c => c.id === activeContactId) || null;

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Switch chat
  const handleSelectContact = (id: string) => {
    setActiveContactId(id);
    // Mark as read
    setContacts(prev => prev.map(c => {
      if (c.id === id && c.unreadCount > 0) {
        return {
          ...c,
          unreadCount: 0,
          messages: c.messages.map(m => ({ ...m, status: 'read' as const }))
        };
      }
      return c;
    }));
  };

  // Send standard text message
  const handleSendMessage = (text: string) => {
    if (!activeContactId) return;

    sounds.playSent();

    const newMsgId = `m-${Date.now()}`;
    const timestamp = getFormattedTime();

    const outgoingMsg: Message = {
      id: newMsgId,
      sender: 'user',
      text,
      timestamp,
      status: 'sent'
    };

    // Append outgoing message
    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          messages: [...c.messages, outgoingMsg]
        };
      }
      return c;
    }));

    // Transition sent -> delivered tick after 600ms
    setTimeout(() => {
      setContacts(prev => prev.map(c => {
        if (c.id === activeContactId) {
          return {
            ...c,
            messages: c.messages.map(m => m.id === newMsgId ? { ...m, status: 'delivered' } : m)
          };
        }
        return c;
      }));
    }, 600);

    // Realistic auto-reply simulation
    const currentContact = contacts.find(c => c.id === activeContactId);
    if (!currentContact) return;

    // After 1200ms: contact starts typing
    setTimeout(() => {
      setContacts(prev => prev.map(c => {
        if (c.id === activeContactId) {
          return { ...c, statusText: 'typing...' };
        }
        return c;
      }));

      // After 2400ms: contact stops typing and sends reply
      setTimeout(() => {
        const replyPool = currentContact.autoReplies || [
          "Got it! That sounds great.",
          "Awesome, thanks for the update!",
          "I will check it out shortly."
        ];
        const randomReply = replyPool[Math.floor(Math.random() * replyPool.length)];
        const incomingTime = getFormattedTime();

        const incomingMsg: Message = {
          id: `reply-${Date.now()}`,
          sender: 'contact',
          text: randomReply,
          timestamp: incomingTime,
          status: 'read'
        };

        sounds.playReceived();

        setContacts(prev => prev.map(c => {
          if (c.id === activeContactId) {
            return {
              ...c,
              statusText: c.online ? 'online' : 'last seen recently',
              messages: [
                ...c.messages.map(m => m.id === newMsgId ? { ...m, status: 'read' as const } : m),
                incomingMsg
              ]
            };
          }
          return c;
        }));
      }, 1500);
    }, 1200);
  };

  // Send simulated audio note
  const handleSendAudio = (duration: string) => {
    if (!activeContactId) return;

    sounds.playSent();
    const newMsgId = `audio-${Date.now()}`;
    const timestamp = getFormattedTime();

    const outgoingAudio: Message = {
      id: newMsgId,
      sender: 'user',
      text: `Voice message (${duration})`,
      timestamp,
      status: 'delivered',
      type: 'audio',
      audioDuration: duration
    };

    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          messages: [...c.messages, outgoingAudio]
        };
      }
      return c;
    }));

    // Trigger audio reply
    setTimeout(() => {
      setContacts(prev => prev.map(c => {
        if (c.id === activeContactId) {
          return { ...c, statusText: 'typing...' };
        }
        return c;
      }));

      setTimeout(() => {
        sounds.playReceived();
        const incomingMsg: Message = {
          id: `reply-audio-${Date.now()}`,
          sender: 'contact',
          text: 'Listened to your audio note! Sounds crystal clear 👍',
          timestamp: getFormattedTime(),
          status: 'read'
        };

        setContacts(prev => prev.map(c => {
          if (c.id === activeContactId) {
            return {
              ...c,
              statusText: c.online ? 'online' : 'last seen recently',
              messages: [
                ...c.messages.map(m => m.id === newMsgId ? { ...m, status: 'read' as const } : m),
                incomingMsg
              ]
            };
          }
          return c;
        }));
      }, 1800);
    }, 1000);
  };

  // Chat Actions
  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContacts(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c));
  };

  const handleToggleMute = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setContacts(prev => prev.map(c => c.id === id ? { ...c, muted: !c.muted } : c));
  };

  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContacts(prev => prev.filter(c => c.id !== id));
    if (activeContactId === id) {
      const remaining = contacts.filter(c => c.id !== id);
      setActiveContactId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleMarkUnread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, unreadCount: c.unreadCount > 0 ? 0 : 1 };
      }
      return c;
    }));
  };

  const handleClearChat = () => {
    if (!activeContactId) return;
    setContacts(prev => prev.map(c => c.id === activeContactId ? { ...c, messages: [] } : c));
    setIsContactInfoOpen(false);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!activeContactId) return;
    setContacts(prev => prev.map(c => {
      if (c.id === activeContactId) {
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id === messageId) {
              const current = m.reactions || [];
              const updated = current.includes(emoji)
                ? current.filter(r => r !== emoji)
                : [...current, emoji];
              return { ...m, reactions: updated };
            }
            return m;
          })
        };
      }
      return c;
    }));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[var(--wa-bg-desktop)]">
      {/* WhatsApp Desktop Top Teal Bar (Light Mode Signature Bar) */}
      <div 
        className="fixed top-0 left-0 right-0 h-32 bg-[#00a884] z-0 hidden lg:block transition-colors duration-200" 
        style={{
          backgroundColor: theme === 'dark' ? '#0c1317' : '#00a884'
        }}
      />

      {/* Main Desktop Container Frame */}
      <div 
        className="relative z-10 w-full h-full lg:w-[98vw] lg:max-w-[1600px] lg:h-[95vh] rounded-none lg:rounded-md overflow-hidden flex shadow-2xl border-0 lg:border transition-all duration-200"
        style={{
          borderColor: 'var(--wa-border)',
          backgroundColor: 'var(--wa-panel-bg)'
        }}
      >
        {/* Left Sidebar (30-35% desktop width) */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 h-full flex flex-col">
          <Sidebar
            contacts={contacts}
            activeContactId={activeContactId}
            onSelectContact={handleSelectContact}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            theme={theme}
            onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            onOpenStatus={() => setIsStatusViewerOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onTogglePin={handleTogglePin}
            onToggleMute={handleToggleMute}
            onDeleteChat={handleDeleteChat}
            onMarkUnread={handleMarkUnread}
          />
        </div>

        {/* Right Chat Area (~70% desktop width) */}
        <div className="hidden md:flex flex-1 h-full overflow-hidden relative">
          <ChatArea
            contact={activeContact}
            onSendMessage={handleSendMessage}
            onSendAudio={handleSendAudio}
            onStartVoiceCall={() => activeContact && setActiveCall({ contact: activeContact, type: 'voice' })}
            onStartVideoCall={() => activeContact && setActiveCall({ contact: activeContact, type: 'video' })}
            onToggleContactInfo={() => setIsContactInfoOpen(!isContactInfoOpen)}
            onClearChat={handleClearChat}
            onAddReaction={handleAddReaction}
          />

          {/* Right Contact Info Drawer (slide in) */}
          {isContactInfoOpen && activeContact && (
            <ContactInfoDrawer
              contact={activeContact}
              onClose={() => setIsContactInfoOpen(false)}
              onToggleMute={() => handleToggleMute(activeContact.id)}
              onClearChat={handleClearChat}
            />
          )}
        </div>
      </div>

      {/* WhatsApp Status Stories Fullscreen Viewer */}
      {isStatusViewerOpen && (
        <StatusViewer
          contacts={contacts}
          onClose={() => setIsStatusViewerOpen(false)}
        />
      )}

      {/* Simulated Voice / Video Call Modal */}
      {activeCall && (
        <CallModal
          contact={activeCall.contact}
          type={activeCall.type}
          onClose={() => setActiveCall(null)}
        />
      )}

      {/* User Profile Modal */}
      {isProfileOpen && (
        <ProfileModal
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* Standalone HTML Code Export Modal */}
      {isExportOpen && (
        <ExportModal
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
