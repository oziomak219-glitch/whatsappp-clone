import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Video, 
  Search, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic, 
  Send, 
  Check, 
  CheckCheck, 
  Lock, 
  Play, 
  Pause, 
  Image as ImageIcon, 
  Camera, 
  FileText, 
  User as UserIcon, 
  BarChart2, 
  X, 
  Trash2, 
  Square,
  Users
} from 'lucide-react';
import { Contact, Message } from '../types';

interface ChatAreaProps {
  contact: Contact | null;
  onSendMessage: (text: string) => void;
  onSendAudio: (duration: string) => void;
  onStartVoiceCall: () => void;
  onStartVideoCall: () => void;
  onToggleContactInfo: () => void;
  onClearChat: () => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const EMOJI_CATEGORIES = {
  Recent: ['😀', '😂', '😍', '🔥', '👍', '🙏', '🎉', '❤️', '🙌', '✨', '😎', '💯'],
  Smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
  Gestures: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  Symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊']
};

export const ChatArea: React.FC<ChatAreaProps> = ({
  contact,
  onSendMessage,
  onSendAudio,
  onStartVoiceCall,
  onStartVideoCall,
  onToggleContactInfo,
  onClearChat,
  onAddReaction
}) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [inChatSearchQuery, setInChatSearchQuery] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  // Audio recording simulation state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio message playback simulation
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on message list change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [contact?.messages, contact?.statusText]);

  // Audio recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
    setShowAttachmentMenu(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFinishRecording = () => {
    const minutes = Math.floor(recordingSeconds / 60);
    const secs = recordingSeconds % 60;
    const durationStr = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    setIsRecording(false);
    onSendAudio(durationStr || '0:05');
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const toggleAudioPlayback = (messageId: string) => {
    if (playingAudioId === messageId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(messageId);
      setTimeout(() => {
        setPlayingAudioId(null);
      }, 4000);
    }
  };

  if (!contact) {
    return (
      <main 
        className="flex-1 flex flex-col items-center justify-center border-b-[6px] border-[#25d366] text-center p-8 select-none"
        style={{
          backgroundColor: 'var(--wa-panel-hover)',
          color: 'var(--wa-text-primary)'
        }}
      >
        <div className="max-w-md flex flex-col items-center">
          <div className="w-64 h-64 mb-6 relative flex items-center justify-center">
            {/* Minimalist vector phone/laptop display */}
            <div className="w-56 h-36 border-4 border-[var(--wa-text-muted)] rounded-xl relative flex items-center justify-center bg-black/5 dark:bg-white/5 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg">
                <Lock className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 w-64 h-3 bg-[var(--wa-text-muted)] rounded-full opacity-40" />
            </div>
          </div>

          <h2 className="text-3xl font-light tracking-tight mb-3">
            WhatsApp Web
          </h2>
          <p className="text-sm text-[var(--wa-text-secondary)] leading-relaxed mb-8">
            Send and receive messages seamlessly without keeping your phone online. Use WhatsApp on up to 4 linked devices at the same time.
          </p>

          <div className="flex items-center gap-2 text-xs text-[var(--wa-text-muted)]">
            <Lock className="w-3.5 h-3.5" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
      </main>
    );
  }

  // Filter messages if search is active
  const displayedMessages = inChatSearchQuery
    ? contact.messages.filter(m => m.text.toLowerCase().includes(inChatSearchQuery.toLowerCase()))
    : contact.messages;

  return (
    <main 
      className="flex-1 flex flex-col h-full overflow-hidden relative"
      style={{ backgroundColor: 'var(--wa-chat-bg)' }}
      aria-label="Active chat panel"
    >
      {/* Chat Top Header */}
      <header 
        className="flex items-center justify-between px-4 py-2 h-[59px] shrink-0 border-b select-none z-10"
        style={{ 
          backgroundColor: 'var(--wa-header-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        {/* Contact Info button */}
        <button 
          onClick={onToggleContactInfo}
          className="flex items-center gap-3 text-left focus:outline-none hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-300">
            {contact.avatar === 'group' ? (
              <div className="w-full h-full bg-[#00a884]/20 flex items-center justify-center text-[#00a884]">
                <Users className="w-5 h-5" />
              </div>
            ) : contact.avatar === 'official' ? (
              <div className="w-full h-full bg-[#00a884] flex items-center justify-center text-white font-bold text-sm">
                WA
              </div>
            ) : (
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          <div>
            <h3 
              className="text-base font-medium leading-tight truncate max-w-[240px] md:max-w-md"
              style={{ color: 'var(--wa-text-primary)' }}
            >
              {contact.name}
            </h3>
            <p className="text-xs truncate max-w-[240px] md:max-w-md">
              {contact.statusText === 'typing...' ? (
                <span className="text-[#00a884] font-medium animate-pulse">typing...</span>
              ) : contact.online ? (
                <span className="text-[#00a884] font-medium">online</span>
              ) : (
                <span className="text-[var(--wa-text-muted)]">{contact.statusText}</span>
              )}
            </p>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 text-[var(--wa-icon)]">
          <button 
            onClick={onStartVideoCall}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Video call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button 
            onClick={onStartVoiceCall}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Voice call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowInChatSearch(!showInChatSearch)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Search in conversation"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* More menu dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowChatMenu(!showChatMenu)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showChatMenu && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowChatMenu(false)} 
                />
                <div 
                  className="absolute right-0 top-11 w-48 py-2 rounded-md shadow-xl z-40 text-sm animate-in fade-in"
                  style={{
                    backgroundColor: 'var(--wa-header-bg)',
                    color: 'var(--wa-text-primary)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    border: '1px solid var(--wa-border)'
                  }}
                >
                  <button 
                    onClick={() => { setShowChatMenu(false); onToggleContactInfo(); }}
                    className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Contact info
                  </button>
                  <button 
                    onClick={() => { setShowChatMenu(false); setShowInChatSearch(true); }}
                    className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Search messages
                  </button>
                  <button 
                    onClick={() => { setShowChatMenu(false); onClearChat(); }}
                    className="w-full text-left px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10 text-red-500"
                  >
                    Clear messages
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* In-chat search bar */}
      {showInChatSearch && (
        <div 
          className="flex items-center gap-3 px-4 py-2 border-b z-10 shrink-0"
          style={{ 
            backgroundColor: 'var(--wa-header-bg)',
            borderColor: 'var(--wa-border)'
          }}
        >
          <Search className="w-4 h-4 text-[var(--wa-text-muted)]" />
          <input 
            type="text"
            value={inChatSearchQuery}
            onChange={(e) => setInChatSearchQuery(e.target.value)}
            placeholder="Search messages in chat..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--wa-text-primary)' }}
            autoFocus
          />
          <button 
            onClick={() => { setShowInChatSearch(false); setInChatSearchQuery(''); }}
            className="text-[var(--wa-text-muted)] hover:text-[var(--wa-text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Messages Body with Iconic WhatsApp Wallpaper */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-4 whatsapp-chat-bg space-y-2">
        {/* End-to-End Encryption Banner */}
        <div className="flex justify-center my-3">
          <div 
            className="px-4 py-2 rounded-lg text-xs flex items-center gap-2 max-w-lg text-center shadow-sm"
            style={{
              backgroundColor: 'var(--wa-system-banner)',
              color: 'var(--wa-system-banner-text)'
            }}
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.</span>
          </div>
        </div>

        {/* Date Badge */}
        <div className="flex justify-center my-2">
          <span 
            className="px-3 py-1 rounded-md text-xs uppercase font-medium tracking-wide shadow-xs"
            style={{
              backgroundColor: 'var(--wa-header-bg)',
              color: 'var(--wa-text-secondary)',
              border: '1px solid var(--wa-border)'
            }}
          >
            TODAY
          </span>
        </div>

        {/* Message Bubbles */}
        {displayedMessages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          const isFirstInCluster = index === 0 || displayedMessages[index - 1].sender !== msg.sender;
          const isHovered = hoveredMessageId === msg.id;

          return (
            <div 
              key={msg.id}
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
              className={`flex flex-col relative group ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Message Bubble Container */}
              <div 
                className={`relative max-w-[85%] md:max-w-[65%] rounded-lg px-3 py-1.5 shadow-sm text-sm break-words select-text ${
                  isUser 
                    ? 'rounded-tr-none' 
                    : 'rounded-tl-none'
                }`}
                style={{
                  backgroundColor: isUser ? 'var(--wa-bubble-outgoing)' : 'var(--wa-bubble-incoming)',
                  color: 'var(--wa-text-primary)'
                }}
              >
                {/* SVG Bubble Tail on first in cluster */}
                {isFirstInCluster && (
                  isUser ? (
                    <svg className="bubble-tail-out" viewBox="0 0 8 13">
                      <path opacity="0.13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                      <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z" />
                    </svg>
                  ) : (
                    <svg className="bubble-tail-in" viewBox="0 0 8 13">
                      <path opacity="0.13" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z" />
                      <path fill="currentColor" d="M1.533 1.568L8 10.193V0H2.812C1.042 0 .474 0 1.533 1.568z" />
                    </svg>
                  )
                )}

                {/* Audio message presentation */}
                {msg.type === 'audio' ? (
                  <div className="flex items-center gap-3 py-1 min-w-[220px]">
                    <button 
                      onClick={() => toggleAudioPlayback(msg.id)}
                      className="w-10 h-10 rounded-full bg-[#00a884] text-white flex items-center justify-center hover:opacity-90 transition transform active:scale-95 shrink-0"
                    >
                      {playingAudioId === msg.id ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      {/* Animated audio wave bars */}
                      <div className="flex items-center gap-1 h-6">
                        {[12, 18, 10, 22, 16, 26, 14, 20, 8, 24, 16, 12, 18].map((h, i) => (
                          <div 
                            key={i} 
                            className={`w-1 rounded-full transition-all ${
                              playingAudioId === msg.id 
                                ? 'bg-[#00a884] animate-pulse' 
                                : 'bg-[var(--wa-text-muted)]'
                            }`}
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-[11px] text-[var(--wa-text-secondary)] mt-0.5 tabular-nums">
                        <span>{msg.audioDuration || '0:14'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard text message */
                  <div className="leading-relaxed">
                    {msg.text}
                  </div>
                )}

                {/* Timestamp & Status Checkmarks */}
                <div className="flex items-center justify-end gap-1 text-[11px] text-[var(--wa-text-muted)] mt-1 float-right ml-2 -mb-0.5 select-none">
                  <span className="tabular-nums">{msg.timestamp}</span>
                  {isUser && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      ) : msg.status === 'delivered' ? (
                        <CheckCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </div>

                {/* Displayed reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div 
                    className="absolute -bottom-3 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs shadow-sm border"
                    style={{
                      backgroundColor: 'var(--wa-bubble-incoming)',
                      borderColor: 'var(--wa-border)'
                    }}
                  >
                    {msg.reactions.map((r, i) => (
                      <span key={i}>{r}</span>
                    ))}
                  </div>
                )}

                {/* Quick Reaction popup on hover */}
                {isHovered && (
                  <div 
                    className="absolute -top-8 flex items-center gap-1 px-2 py-1 rounded-full shadow-lg border z-20 animate-in fade-in"
                    style={{
                      backgroundColor: 'var(--wa-header-bg)',
                      borderColor: 'var(--wa-border)',
                      [isUser ? 'right' : 'left']: '0px'
                    }}
                  >
                    {['👍', '❤️', '😂', '😮', '😢', '🙏'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => onAddReaction(msg.id, emoji)}
                        className="hover:scale-125 transition transform px-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Animated Typing Indicator Bubble */}
        {contact.statusText === 'typing...' && (
          <div className="flex items-start">
            <div 
              className="relative rounded-lg px-4 py-3 shadow-sm rounded-tl-none flex items-center gap-1.5"
              style={{
                backgroundColor: 'var(--wa-bubble-incoming)',
                color: 'var(--wa-text-primary)'
              }}
            >
              <svg className="bubble-tail-in" viewBox="0 0 8 13">
                <path fill="currentColor" d="M1.533 1.568L8 10.193V0H2.812C1.042 0 .474 0 1.533 1.568z" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-[#00a884] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker Drawer */}
      {showEmojiPicker && (
        <div 
          className="border-t h-56 overflow-y-auto p-4 z-20 shadow-lg animate-in slide-in-from-bottom-2 duration-150"
          style={{
            backgroundColor: 'var(--wa-header-bg)',
            borderColor: 'var(--wa-border)'
          }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: 'var(--wa-border)' }}>
            <span className="text-xs font-semibold text-[var(--wa-text-secondary)]">EMOJIS</span>
            <button 
              onClick={() => setShowEmojiPicker(false)}
              className="text-[var(--wa-text-muted)] hover:text-[var(--wa-text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
            <div key={category} className="mb-3">
              <h4 className="text-[11px] font-bold text-[var(--wa-text-muted)] uppercase mb-1.5">
                {category}
              </h4>
              <div className="grid grid-cols-10 sm:grid-cols-12 gap-1 text-2xl">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setInputText(prev => prev + emoji);
                    }}
                    className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition text-center"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attachment popup menu */}
      {showAttachmentMenu && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setShowAttachmentMenu(false)} 
          />
          <div 
            className="absolute left-14 bottom-16 flex flex-col gap-2 p-3 rounded-2xl shadow-2xl z-30 animate-in slide-in-from-bottom-4 duration-150"
            style={{
              backgroundColor: 'var(--wa-header-bg)',
              border: '1px solid var(--wa-border)'
            }}
          >
            {[
              { icon: ImageIcon, label: 'Photos & videos', color: 'bg-purple-600' },
              { icon: Camera, label: 'Camera', color: 'bg-rose-500' },
              { icon: FileText, label: 'Document', color: 'bg-indigo-600' },
              { icon: UserIcon, label: 'Contact', color: 'bg-blue-500' },
              { icon: BarChart2, label: 'Poll', color: 'bg-amber-500' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setShowAttachmentMenu(false);
                    onSendMessage(`[Attached: ${item.label}]`);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition text-left"
                >
                  <div className={`w-9 h-9 rounded-full ${item.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--wa-text-primary)' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Bottom Message Input Footer */}
      <footer 
        className="px-4 py-2 flex items-center gap-2 shrink-0 border-t z-10"
        style={{ 
          backgroundColor: 'var(--wa-footer-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        {isRecording ? (
          /* Live Voice Recording UI */
          <div className="flex-1 flex items-center justify-between px-4 py-2 bg-red-500/10 rounded-lg">
            <div className="flex items-center gap-3 text-red-500">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-sm font-semibold tabular-nums">
                {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-[var(--wa-text-secondary)]">Recording voice note...</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleCancelRecording}
                className="p-2 text-red-500 hover:bg-red-500/20 rounded-full transition"
                title="Cancel recording"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button 
                onClick={handleFinishRecording}
                className="p-2 bg-[#00a884] text-white rounded-full hover:bg-[#02906f] transition shadow-md"
                title="Send voice note"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Standard Input Bar */
          <>
            <div className="flex items-center gap-1 text-[var(--wa-icon)]">
              <button 
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                  setShowAttachmentMenu(false);
                }}
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                  showEmojiPicker ? 'text-[#00a884]' : ''
                }`}
                title="Emojis"
              >
                <Smile className="w-6 h-6" />
              </button>
              <button 
                onClick={() => {
                  setShowAttachmentMenu(!showAttachmentMenu);
                  setShowEmojiPicker(false);
                }}
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                  showAttachmentMenu ? 'text-[#00a884]' : ''
                }`}
                title="Attach"
              >
                <Paperclip className="w-6 h-6" />
              </button>
            </div>

            {/* Message input field */}
            <div 
              className="flex-1 rounded-lg px-3 py-2 flex items-center transition-colors"
              style={{ backgroundColor: 'var(--wa-input-bg)' }}
            >
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                rows={1}
                className="w-full bg-transparent border-none outline-none text-sm resize-none max-h-24 leading-snug placeholder-[var(--wa-text-muted)]"
                style={{ color: 'var(--wa-text-primary)' }}
              />
            </div>

            {/* Dynamic Send / Mic button */}
            {inputText.trim() ? (
              <button 
                onClick={handleSend}
                className="p-2.5 rounded-full bg-[#00a884] text-white hover:bg-[#02906f] transition-all transform active:scale-95 shadow-md shrink-0"
                title="Send message"
              >
                <Send className="w-5 h-5 fill-current" />
              </button>
            ) : (
              <button 
                onClick={() => setIsRecording(true)}
                className="p-2.5 rounded-full text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
                title="Voice message"
              >
                <Mic className="w-6 h-6" />
              </button>
            )}
          </>
        )}
      </footer>
    </main>
  );
};
