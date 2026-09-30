import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  CircleDashed, 
  MessageSquare, 
  Users, 
  Filter, 
  X, 
  Pin, 
  VolumeX, 
  Check, 
  CheckCheck, 
  Moon, 
  Sun, 
  Download, 
  Mic, 
  ChevronDown,
  Trash2,
  BellOff
} from 'lucide-react';
import { Contact, FilterType, ThemeMode } from '../types';

interface SidebarProps {
  contacts: Contact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenStatus: () => void;
  onOpenProfile: () => void;
  onOpenExport: () => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onToggleMute: (id: string, e: React.MouseEvent) => void;
  onDeleteChat: (id: string, e: React.MouseEvent) => void;
  onMarkUnread: (id: string, e: React.MouseEvent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  contacts,
  activeContactId,
  onSelectContact,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  theme,
  onToggleTheme,
  onOpenStatus,
  onOpenProfile,
  onOpenExport,
  onTogglePin,
  onToggleMute,
  onDeleteChat,
  onMarkUnread
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredContactId, setHoveredContactId] = useState<string | null>(null);
  const [contextMenuContactId, setContextMenuContactId] = useState<string | null>(null);

  // Filter contacts by search query & filter pill
  const filteredContacts = contacts.filter(contact => {
    // Search filter
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Category filter
    if (activeFilter === 'unread') return contact.unreadCount > 0;
    if (activeFilter === 'favorites') return contact.pinned;
    if (activeFilter === 'groups') return contact.avatar === 'group';
    return true;
  });

  // Sort pinned first
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const hasUnreadStatus = contacts.some(c => c.statusStories && c.statusStories.length > 0);

  return (
    <aside 
      className="flex flex-col h-full border-r select-none transition-colors duration-200"
      style={{
        backgroundColor: 'var(--wa-panel-bg)',
        borderColor: 'var(--wa-border)',
        width: '100%'
      }}
      aria-label="Sidebar contacts list"
    >
      {/* Top Header */}
      <header 
        className="flex items-center justify-between px-4 py-2.5 h-[59px] shrink-0"
        style={{ backgroundColor: 'var(--wa-header-bg)' }}
      >
        {/* User profile avatar */}
        <button 
          onClick={onOpenProfile}
          className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#00a884] transition transform active:scale-95 cursor-pointer"
          title="Profile settings"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-300 border border-black/10 flex items-center justify-center">
            <img 
              src="/src/assets/images/avatar_alex_developer_1790769690262.jpg" 
              alt="My Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // styled fallback container
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="text-slate-600 font-bold text-sm">ME</div>
          </div>
        </button>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 text-[var(--wa-icon)]">
          {/* Communities icon */}
          <button 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Communities"
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Status icon with unread indicator */}
          <button 
            onClick={onOpenStatus}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative"
            title="Status updates"
          >
            <CircleDashed className={`w-5 h-5 ${hasUnreadStatus ? 'text-[#00a884]' : ''}`} />
            {hasUnreadStatus && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00a884]" />
            )}
          </button>

          {/* New Chat icon */}
          <button 
            onClick={() => onSelectContact(contacts[0]?.id || '')}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="New chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* More menu */}
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {menuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setMenuOpen(false)} 
                />
                <div 
                  className="absolute right-0 top-11 w-56 py-2 rounded-md shadow-xl z-40 text-sm animate-in fade-in zoom-in-95 duration-100"
                  style={{
                    backgroundColor: 'var(--wa-header-bg)',
                    color: 'var(--wa-text-primary)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    border: '1px solid var(--wa-border)'
                  }}
                >
                  <button 
                    onClick={() => { setMenuOpen(false); onToggleTheme(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between"
                  >
                    <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); onOpenExport(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-between text-[#00a884] font-medium"
                  >
                    <span>Export Standalone HTML</span>
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); onOpenProfile(); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Profile & Settings
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Starred messages
                  </button>
                  <div className="h-px my-1" style={{ backgroundColor: 'var(--wa-border)' }} />
                  <button 
                    onClick={() => { setMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/10 text-red-500"
                  >
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Search Bar Area */}
      <div 
        className="px-3 pt-2 pb-1.5 flex flex-col gap-2 shrink-0 border-b"
        style={{ 
          backgroundColor: 'var(--wa-panel-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="flex-1 flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{ backgroundColor: 'var(--wa-search-bg)' }}
          >
            <Search className="w-4 h-4 text-[var(--wa-text-muted)] shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search or start new chat"
              className="w-full bg-transparent border-none outline-none text-sm placeholder-[var(--wa-text-muted)]"
              style={{ color: 'var(--wa-text-primary)' }}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-[var(--wa-text-muted)] hover:text-[var(--wa-text-primary)]"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button 
            onClick={() => onFilterChange(activeFilter === 'unread' ? 'all' : 'unread')}
            className={`p-2 rounded-lg transition-colors ${
              activeFilter === 'unread' 
                ? 'bg-[#00a884] text-white' 
                : 'text-[var(--wa-icon)] hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Filter unread chats"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {(['all', 'unread', 'favorites', 'groups'] as FilterType[]).map((filter) => {
            const isActive = activeFilter === filter;
            const labels = {
              all: 'All',
              unread: 'Unread',
              favorites: 'Favorites',
              groups: 'Groups'
            };
            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#00a884]/20 text-[#00a884] dark:bg-[#00a884]/30' 
                    : 'bg-black/5 dark:bg-white/5 text-[var(--wa-text-secondary)] hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Chat Preview List */}
      <div className="flex-1 overflow-y-auto">
        {sortedContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-[var(--wa-text-secondary)]">
            <Search className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm font-medium">No chats found</p>
            <p className="text-xs opacity-75 mt-1">Try searching for a different name or message</p>
          </div>
        ) : (
          sortedContacts.map((contact) => {
            const isActive = contact.id === activeContactId;
            const lastMsg = contact.messages[contact.messages.length - 1];
            const isHovered = hoveredContactId === contact.id;

            return (
              <div 
                key={contact.id}
                onMouseEnter={() => setHoveredContactId(contact.id)}
                onMouseLeave={() => {
                  setHoveredContactId(null);
                  if (contextMenuContactId === contact.id) {
                    setContextMenuContactId(null);
                  }
                }}
                onClick={() => onSelectContact(contact.id)}
                className={`relative flex items-center gap-3 px-3 py-3 cursor-pointer border-b transition-colors ${
                  isActive 
                    ? 'bg-[var(--wa-panel-active)]' 
                    : 'hover:bg-[var(--wa-panel-hover)]'
                }`}
                style={{ borderColor: 'var(--wa-border)' }}
              >
                {/* Contact Avatar */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${
                    contact.statusStories && contact.statusStories.length > 0
                      ? 'ring-2 ring-[#00a884] ring-offset-2 dark:ring-offset-[#111b21]'
                      : ''
                  }`}>
                    {contact.avatar === 'group' ? (
                      <div className="w-full h-full bg-[#00a884]/20 flex items-center justify-center text-[#00a884]">
                        <Users className="w-6 h-6" />
                      </div>
                    ) : contact.avatar === 'official' ? (
                      <div className="w-full h-full bg-[#00a884] flex items-center justify-center text-white font-bold">
                        WA
                      </div>
                    ) : (
                      <img 
                        src={contact.avatar} 
                        alt={contact.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  {/* Online green indicator badge */}
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25d366] border-2 border-[var(--wa-panel-bg)]" />
                  )}
                </div>

                {/* Contact Info & Last Message Snippet */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-medium text-[15px] truncate"
                      style={{ color: 'var(--wa-text-primary)' }}
                    >
                      {contact.name}
                    </span>
                    <span 
                      className={`text-xs tabular-nums ml-2 shrink-0 ${
                        contact.unreadCount > 0 ? 'text-[#00a884] font-semibold' : 'text-[var(--wa-text-muted)]'
                      }`}
                    >
                      {lastMsg?.timestamp || '12:00 PM'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-[13px] text-[var(--wa-text-secondary)] truncate pr-2">
                      {lastMsg?.sender === 'user' && (
                        <span className="shrink-0 inline-flex items-center">
                          {lastMsg.status === 'read' ? (
                            <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                          ) : lastMsg.status === 'delivered' ? (
                            <CheckCheck className="w-4 h-4 text-[var(--wa-text-muted)]" />
                          ) : (
                            <Check className="w-4 h-4 text-[var(--wa-text-muted)]" />
                          )}
                        </span>
                      )}

                      {lastMsg?.type === 'audio' && (
                        <Mic className="w-3.5 h-3.5 text-[#00a884] shrink-0" />
                      )}

                      <span className="truncate">
                        {contact.statusText === 'typing...' ? (
                          <span className="text-[#00a884] font-medium animate-pulse">typing...</span>
                        ) : (
                          lastMsg?.text || 'No messages yet'
                        )}
                      </span>
                    </div>

                    {/* Status Icons & Badges */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {contact.muted && (
                        <VolumeX className="w-3.5 h-3.5 text-[var(--wa-text-muted)]" />
                      )}
                      {contact.pinned && (
                        <Pin className="w-3.5 h-3.5 text-[var(--wa-text-muted)] rotate-45" />
                      )}
                      {contact.unreadCount > 0 && (
                        <span 
                          className="min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold flex items-center justify-center text-white"
                          style={{ backgroundColor: 'var(--wa-unread-badge)' }}
                        >
                          {contact.unreadCount}
                        </span>
                      )}

                      {/* Dropdown Chevron on hover */}
                      {isHovered && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContextMenuContactId(
                                contextMenuContactId === contact.id ? null : contact.id
                              );
                            }}
                            className="p-1 rounded-full text-[var(--wa-icon)] hover:text-[var(--wa-text-primary)] hover:bg-black/10 dark:hover:bg-white/10"
                            title="Chat options"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>

                          {contextMenuContactId === contact.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-30" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setContextMenuContactId(null);
                                }} 
                              />
                              <div 
                                className="absolute right-0 top-6 w-44 py-1.5 rounded shadow-lg z-40 text-xs animate-in fade-in"
                                style={{
                                  backgroundColor: 'var(--wa-header-bg)',
                                  color: 'var(--wa-text-primary)',
                                  border: '1px solid var(--wa-border)'
                                }}
                              >
                                <button
                                  onClick={(e) => {
                                    onTogglePin(contact.id, e);
                                    setContextMenuContactId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
                                >
                                  <Pin className="w-3.5 h-3.5" />
                                  <span>{contact.pinned ? 'Unpin chat' : 'Pin chat'}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    onToggleMute(contact.id, e);
                                    setContextMenuContactId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
                                >
                                  <BellOff className="w-3.5 h-3.5" />
                                  <span>{contact.muted ? 'Unmute notifications' : 'Mute notifications'}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    onMarkUnread(contact.id, e);
                                    setContextMenuContactId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>{contact.unreadCount > 0 ? 'Mark as read' : 'Mark as unread'}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    onDeleteChat(contact.id, e);
                                    setContextMenuContactId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10 text-red-500 flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete chat</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
