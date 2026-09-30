import { Contact } from '../types';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah Jenkins',
    avatar: '/src/assets/images/avatar_sarah_designer_1790769678134.jpg',
    statusText: 'online',
    online: true,
    about: 'Design is intelligence made visible ✨ UI/UX Lead',
    phone: '+1 (555) 234-8901',
    unreadCount: 2,
    pinned: true,
    muted: false,
    messages: [
      {
        id: 'm1-1',
        sender: 'contact',
        text: 'Hey! Did you get a chance to review the new WhatsApp Web desktop design mocks?',
        timestamp: '10:30 AM',
        status: 'read'
      },
      {
        id: 'm1-2',
        sender: 'user',
        text: 'Yes! The pixel-perfect layout and bubble tails look spot on. Love the attention to the doodle wallpaper too!',
        timestamp: '10:32 AM',
        status: 'read'
      },
      {
        id: 'm1-3',
        sender: 'contact',
        text: 'Awesome! We are finalizing the dark mode contrast tokens today.',
        timestamp: '10:35 AM',
        status: 'read'
      },
      {
        id: 'm1-4',
        sender: 'contact',
        text: 'Can you verify if the dynamic send/mic button animation is smooth on your screen?',
        timestamp: '10:41 AM',
        status: 'delivered'
      }
    ],
    autoReplies: [
      "That's fantastic! The responsiveness feels super smooth.",
      "Just tested the voice note waveform preview — looks really authentic!",
      "I shared the Figma design system updates with the rest of the product team.",
      "Let's sync up on the video call after lunch if you're free!",
      "Sounds like a plan! Let me know if you need any more vector icons."
    ],
    statusStories: [
      {
        id: 'st-1',
        imageUrl: '/src/assets/images/avatar_sarah_designer_1790769678134.jpg',
        caption: 'Working on new design systems today! 🎨☕',
        time: 'Today, 9:15 AM'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Alex Chen',
    avatar: '/src/assets/images/avatar_alex_developer_1790769690262.jpg',
    statusText: 'online',
    online: true,
    about: 'Building reliable distributed systems | Coffee enthusiast ☕',
    phone: '+1 (555) 345-6789',
    unreadCount: 0,
    pinned: true,
    muted: false,
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        text: 'Hey Alex, how is the latency on the message socket looking?',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'm2-2',
        sender: 'contact',
        text: 'Down to sub-15ms roundtrip! We also added Web Audio synthesizers for instant sound effects.',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'm2-3',
        sender: 'contact',
        text: 'Check this out:',
        timestamp: 'Yesterday',
        status: 'read'
      },
      {
        id: 'm2-4',
        sender: 'contact',
        type: 'audio',
        text: 'Voice note (0:14)',
        audioDuration: '0:14',
        timestamp: 'Yesterday',
        status: 'read'
      }
    ],
    autoReplies: [
      "All automated unit tests passed with 100% green status!",
      "Just pushed the latest branch with offline caching support.",
      "Great work! The UI feels snappy and faithful to the desktop client.",
      "Let me profile the memory footprint real quick, looks very lightweight.",
      "Definitely, let's deploy the build now."
    ],
    statusStories: [
      {
        id: 'st-2',
        imageUrl: '/src/assets/images/avatar_alex_developer_1790769690262.jpg',
        caption: 'Late night coding session running smoothly 💻🚀',
        time: 'Yesterday, 11:40 PM'
      }
    ]
  },
  {
    id: 'c3',
    name: 'Priya Sharma',
    avatar: '/src/assets/images/avatar_priya_manager_1790769699328.jpg',
    statusText: 'last seen today at 10:14 AM',
    online: false,
    about: 'Product Operations & Strategy @ WhatsApp ecosystem',
    phone: '+1 (555) 456-7890',
    unreadCount: 1,
    pinned: false,
    muted: false,
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        text: 'Hi Priya, the client presentation is scheduled for 3 PM.',
        timestamp: '9:00 AM',
        status: 'read'
      },
      {
        id: 'm3-2',
        sender: 'contact',
        text: 'Got it! I prepared the slide deck highlighting key UX fidelity metrics.',
        timestamp: '10:14 AM',
        status: 'read'
      }
    ],
    autoReplies: [
      "Thanks for the update! I will be ready for the walkthrough.",
      "The stakeholders will be thrilled with this prototype quality.",
      "Let me know if you need me to adjust any numbers in the report.",
      "See you in the conference room shortly!"
    ]
  },
  {
    id: 'c4',
    name: 'Marcus Vance',
    avatar: '/src/assets/images/avatar_marcus_friend_1790769709457.jpg',
    statusText: 'online',
    online: true,
    about: 'Living life one weekend at a time 🏄‍♂️',
    phone: '+1 (555) 567-8901',
    unreadCount: 0,
    pinned: false,
    muted: true,
    messages: [
      {
        id: 'm4-1',
        sender: 'contact',
        text: 'Yo! Are we still playing tennis this Saturday morning?',
        timestamp: 'Oct 28',
        status: 'read'
      },
      {
        id: 'm4-2',
        sender: 'user',
        text: 'Count me in! 8:30 AM at the central court?',
        timestamp: 'Oct 28',
        status: 'read'
      },
      {
        id: 'm4-3',
        sender: 'contact',
        text: 'Perfect! Bringing fresh tennis balls 🎾',
        timestamp: 'Oct 28',
        status: 'read'
      }
    ],
    autoReplies: [
      "Haha yeah totally! Looking forward to it.",
      "Bro that match was intense last time!",
      "See you on the court bright and early!",
      "Sounds great, text me when you are on the way."
    ]
  },
  {
    id: 'c5',
    name: 'Frontend Architects Group',
    avatar: 'group',
    statusText: 'Sarah, Alex, Marcus, You',
    online: true,
    about: 'Group chat for desktop app architecture & UI components',
    phone: 'Group · 8 members',
    unreadCount: 4,
    pinned: false,
    muted: false,
    messages: [
      {
        id: 'm5-1',
        sender: 'contact',
        text: 'Alex: Did everyone see the new CSS variables setup? We have clean light/dark mode separation.',
        timestamp: '8:45 AM',
        status: 'read'
      },
      {
        id: 'm5-2',
        sender: 'contact',
        text: 'Sarah: Checked it, the contrast ratio conforms strictly to WCAG AA guidelines.',
        timestamp: '8:50 AM',
        status: 'read'
      },
      {
        id: 'm5-3',
        sender: 'user',
        text: 'Terrific, the desktop container shadow matches the official WhatsApp Web frame.',
        timestamp: '9:00 AM',
        status: 'read'
      },
      {
        id: 'm5-4',
        sender: 'contact',
        text: 'Alex: Pushed the auto-scroll handler to ensure effortless message tracking.',
        timestamp: '9:12 AM',
        status: 'delivered'
      }
    ],
    autoReplies: [
      "Group member: Great progress team! The demo looks clean.",
      "Alex: Performance is solid at 60fps scrolling.",
      "Sarah: The emoji picker feels super responsive!",
      "Marcus: Solid release candidate right here."
    ]
  },
  {
    id: 'c6',
    name: 'WhatsApp Community',
    avatar: 'official',
    statusText: 'Official Business Account',
    online: true,
    about: 'Official announcements and feature updates from WhatsApp',
    phone: 'Verified Business',
    unreadCount: 0,
    pinned: false,
    muted: false,
    messages: [
      {
        id: 'm6-1',
        sender: 'contact',
        text: 'Welcome to WhatsApp Web! Your personal messages and calls are protected by end-to-end encryption.',
        timestamp: 'Oct 15',
        status: 'read'
      },
      {
        id: 'm6-2',
        sender: 'contact',
        text: 'Tip: You can press Shift + Enter for a new line, or search your chats anytime using the filter bar.',
        timestamp: 'Oct 15',
        status: 'read'
      }
    ],
    autoReplies: [
      "Thanks for reaching out! Learn more about WhatsApp Web tips at whatsapp.com/help.",
      "Stay connected seamlessly across all your devices with multi-device sync."
    ]
  }
];
