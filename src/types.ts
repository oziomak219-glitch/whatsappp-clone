export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  sender: 'user' | 'contact';
  text: string;
  timestamp: string;
  status: MessageStatus;
  type?: 'text' | 'audio' | 'image';
  audioDuration?: string;
  mediaUrl?: string;
  reactions?: string[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  statusText: string;
  online: boolean;
  about: string;
  phone: string;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  messages: Message[];
  autoReplies: string[];
  statusStories?: {
    id: string;
    imageUrl: string;
    caption: string;
    time: string;
  }[];
}

export type FilterType = 'all' | 'unread' | 'favorites' | 'groups';
export type ThemeMode = 'light' | 'dark';
