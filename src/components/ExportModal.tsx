import React, { useState } from 'react';
import { X, Copy, Check, Download, Code } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WhatsApp Web</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --wa-teal: #00a884;
      --wa-header-bg: #f0f2f5;
      --wa-panel-bg: #ffffff;
      --wa-panel-hover: #f5f6f6;
      --wa-panel-active: #f0f2f5;
      --wa-search-bg: #f0f2f5;
      --wa-text-primary: #111b21;
      --wa-text-secondary: #667781;
      --wa-text-muted: #8696a0;
      --wa-border: #e9edef;
      --wa-chat-bg: #efeae2;
      --wa-bubble-incoming: #ffffff;
      --wa-bubble-outgoing: #d9fdd3;
      --wa-footer-bg: #f0f2f5;
      --wa-input-bg: #ffffff;
      --wa-icon: #54656f;
      --wa-badge: #25d366;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #d1d7db;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    /* Green top bar on desktop */
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 127px;
      background: #00a884;
      z-index: 1;
    }

    /* Main Desktop Container */
    .app-container {
      position: relative;
      z-index: 2;
      width: 96vw;
      max-width: 1600px;
      height: 95vh;
      background: #fff;
      display: flex;
      box-shadow: 0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24);
      border-radius: 4px;
      overflow: hidden;
    }

    /* Left Sidebar */
    .sidebar {
      width: 35%;
      min-width: 320px;
      max-width: 480px;
      border-right: 1px solid var(--wa-border);
      display: flex;
      flex-direction: column;
      background: var(--wa-panel-bg);
    }

    .sidebar-header {
      height: 59px;
      background: var(--wa-header-bg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #00a884;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .header-icons {
      display: flex;
      gap: 16px;
      color: var(--wa-icon);
      font-size: 18px;
    }
    .header-icons i { cursor: pointer; }

    .search-box {
      padding: 8px 12px;
      border-bottom: 1px solid var(--wa-border);
      background: #fff;
    }

    .search-wrapper {
      background: var(--wa-search-bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 6px 12px;
      gap: 12px;
    }
    .search-wrapper input {
      border: none;
      background: transparent;
      outline: none;
      width: 100%;
      font-size: 14px;
    }

    .chat-list {
      flex: 1;
      overflow-y: auto;
    }

    .chat-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--wa-border);
      cursor: pointer;
      transition: background 0.15s;
    }
    .chat-item:hover { background: var(--wa-panel-hover); }
    .chat-item.active { background: var(--wa-panel-active); }

    .chat-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #334155;
      flex-shrink: 0;
    }

    .chat-details { flex: 1; min-width: 0; }
    .chat-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .chat-name { font-weight: 500; font-size: 15px; color: var(--wa-text-primary); }
    .chat-time { font-size: 12px; color: var(--wa-text-muted); }
    .chat-msg { font-size: 13px; color: var(--wa-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

    /* Right Main Chat Area */
    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--wa-chat-bg);
    }

    .chat-header {
      height: 59px;
      background: var(--wa-header-bg);
      border-bottom: 1px solid var(--wa-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
    }

    .contact-info { display: flex; align-items: center; gap: 12px; cursor: pointer; }
    .contact-title { font-weight: 500; font-size: 16px; }
    .contact-status { font-size: 12px; color: var(--wa-text-secondary); }

    .messages-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 40px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: #efeae2;
      background-image: radial-gradient(#d3cbbe 1px, transparent 1px);
      background-size: 20px 20px;
    }

    .message {
      max-width: 65%;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14.2px;
      line-height: 1.4;
      position: relative;
      box-shadow: 0 1px 0.5px rgba(11,20,26,.13);
      word-wrap: break-word;
    }

    .incoming {
      align-self: flex-start;
      background: var(--wa-bubble-incoming);
      border-top-left-radius: 0;
    }

    .outgoing {
      align-self: flex-end;
      background: var(--wa-bubble-outgoing);
      border-top-right-radius: 0;
    }

    .msg-meta {
      float: right;
      margin-left: 10px;
      margin-top: 4px;
      font-size: 11px;
      color: var(--wa-text-muted);
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .msg-meta i { color: #53bdeb; }

    /* Typing indicator */
    .typing-indicator {
      display: inline-flex;
      gap: 4px;
      padding: 8px 14px;
      background: #fff;
      border-radius: 8px;
      align-self: flex-start;
      border-top-left-radius: 0;
    }
    .typing-dot {
      width: 7px;
      height: 7px;
      background: #00a884;
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    /* Footer Input */
    .chat-footer {
      background: var(--wa-footer-bg);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--wa-border);
    }
    .footer-icons { display: flex; gap: 16px; color: var(--wa-icon); font-size: 20px; }
    .footer-icons i { cursor: pointer; }
    .input-wrapper {
      flex: 1;
      background: var(--wa-input-bg);
      border-radius: 8px;
      padding: 9px 14px;
    }
    .input-wrapper input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 14.5px;
    }
    .action-btn {
      color: var(--wa-icon);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
    }
    .action-btn.send-active {
      color: #fff;
      background: #00a884;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
  </style>
</head>
<body>
  <div class="top-bar"></div>

  <div class="app-container">
    <!-- Left Sidebar -->
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="user-avatar">ME</div>
        <div class="header-icons">
          <i class="fa-solid fa-circle-notch" title="Status"></i>
          <i class="fa-solid fa-message" title="New Chat"></i>
          <i class="fa-solid fa-ellipsis-vertical" title="Menu"></i>
        </div>
      </div>

      <div class="search-box">
        <div class="search-wrapper">
          <i class="fa-solid fa-magnifying-glass" style="color:#8696a0;"></i>
          <input type="text" id="searchInput" placeholder="Search or start new chat">
        </div>
      </div>

      <div class="chat-list" id="chatList"></div>
    </div>

    <!-- Right Chat Area -->
    <div class="chat-area">
      <div class="chat-header">
        <div class="contact-info">
          <div class="chat-avatar" id="headerAvatar">S</div>
          <div>
            <div class="contact-title" id="headerName">Sarah Jenkins</div>
            <div class="contact-status" id="headerStatus">online</div>
          </div>
        </div>
        <div class="header-icons">
          <i class="fa-solid fa-video" title="Video call"></i>
          <i class="fa-solid fa-phone" title="Voice call"></i>
          <i class="fa-solid fa-magnifying-glass" title="Search"></i>
          <i class="fa-solid fa-ellipsis-vertical" title="Menu"></i>
        </div>
      </div>

      <div class="messages-body" id="messagesBody"></div>

      <div class="chat-footer">
        <div class="footer-icons">
          <i class="fa-regular fa-face-smile" id="emojiBtn"></i>
          <i class="fa-solid fa-paperclip" id="clipBtn"></i>
        </div>
        <div class="input-wrapper">
          <input type="text" id="msgInput" placeholder="Type a message" autocomplete="off">
        </div>
        <button class="action-btn" id="actionBtn">
          <i class="fa-solid fa-microphone" id="actionIcon"></i>
        </button>
      </div>
    </div>
  </div>

  <script>
    // State & Sample Contacts Data
    const contacts = [
      {
        id: '1',
        name: 'Sarah Jenkins',
        avatarText: 'S',
        status: 'online',
        messages: [
          { text: 'Hey! Did you get a chance to check the new WhatsApp Web design?', sender: 'incoming', time: '10:30 AM' },
          { text: 'Yes, looking sharp! Double checks and layout are fully responsive.', sender: 'outgoing', time: '10:32 AM' }
        ],
        replies: [
          'Awesome! Let me know if you need any extra tweaks.',
          'Love the smooth auto-scroll on new messages!',
          'Sounds good, let us deploy it now.'
        ]
      },
      {
        id: '2',
        name: 'Alex Developer',
        avatarText: 'A',
        status: 'online',
        messages: [
          { text: 'Hey Alex, how is the latency on desktop?', sender: 'outgoing', time: 'Yesterday' },
          { text: 'Zero latency! All vanilla JS and CSS variables.', sender: 'incoming', time: 'Yesterday' }
        ],
        replies: [
          'All unit tests are passing!',
          'Performance runs at 60fps.',
          'Pushing the final commit now.'
        ]
      },
      {
        id: '3',
        name: 'Priya Sharma',
        avatarText: 'P',
        status: 'last seen today at 10:14 AM',
        messages: [
          { text: 'Presentation is ready for 3 PM.', sender: 'incoming', time: '9:00 AM' }
        ],
        replies: [
          'Great, see you in the meeting!',
          'The slides look very crisp.'
        ]
      }
    ];

    let activeContactId = '1';

    // DOM Elements
    const chatListEl = document.getElementById('chatList');
    const messagesBodyEl = document.getElementById('messagesBody');
    const headerAvatar = document.getElementById('headerAvatar');
    const headerName = document.getElementById('headerName');
    const headerStatus = document.getElementById('headerStatus');
    const msgInput = document.getElementById('msgInput');
    const actionBtn = document.getElementById('actionBtn');
    const actionIcon = document.getElementById('actionIcon');
    const searchInput = document.getElementById('searchInput');

    function renderChatList(filterQuery = '') {
      chatListEl.innerHTML = '';
      const filtered = contacts.filter(c => c.name.toLowerCase().includes(filterQuery.toLowerCase()));

      filtered.forEach(contact => {
        const item = document.createElement('div');
        item.className = 'chat-item' + (contact.id === activeContactId ? ' active' : '');
        const lastMsg = contact.messages[contact.messages.length - 1];

        item.innerHTML = \`
          <div class="chat-avatar">\${contact.avatarText}</div>
          <div class="chat-details">
            <div class="chat-row">
              <span class="chat-name">\${contact.name}</span>
              <span class="chat-time">\${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <div class="chat-msg">\${lastMsg ? lastMsg.text : 'No messages'}</div>
          </div>
        \`;

        item.addEventListener('click', () => switchChat(contact.id));
        chatListEl.appendChild(item);
      });
    }

    function switchChat(contactId) {
      activeContactId = contactId;
      const contact = contacts.find(c => c.id === contactId);
      if (!contact) return;

      headerAvatar.textContent = contact.avatarText;
      headerName.textContent = contact.name;
      headerStatus.textContent = contact.status;

      renderChatList(searchInput.value);
      renderMessages();
    }

    function renderMessages() {
      messagesBodyEl.innerHTML = '';
      const contact = contacts.find(c => c.id === activeContactId);
      if (!contact) return;

      contact.messages.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = 'message ' + msg.sender;
        bubble.innerHTML = \`
          \${msg.text}
          <div class="msg-meta">
            <span>\${msg.time}</span>
            \${msg.sender === 'outgoing' ? '<i class="fa-solid fa-check-double"></i>' : ''}
          </div>
        \`;
        messagesBodyEl.appendChild(bubble);
      });

      scrollToBottom();
    }

    function scrollToBottom() {
      messagesBodyEl.scrollTop = messagesBodyEl.scrollHeight;
    }

    function getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function sendMessage() {
      const text = msgInput.value.trim();
      if (!text) return;

      const contact = contacts.find(c => c.id === activeContactId);
      if (!contact) return;

      // Add outgoing message
      contact.messages.push({
        text: text,
        sender: 'outgoing',
        time: getCurrentTime()
      });

      msgInput.value = '';
      updateActionBtn();
      renderMessages();
      renderChatList(searchInput.value);

      // Simulate realistic auto-reply
      triggerAutoReply(contact);
    }

    function triggerAutoReply(contact) {
      setTimeout(() => {
        if (activeContactId === contact.id) {
          headerStatus.textContent = 'typing...';
          headerStatus.style.color = '#00a884';

          const typingEl = document.createElement('div');
          typingEl.className = 'typing-indicator';
          typingEl.id = 'activeTyping';
          typingEl.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
          messagesBodyEl.appendChild(typingEl);
          scrollToBottom();
        }

        setTimeout(() => {
          const typingEl = document.getElementById('activeTyping');
          if (typingEl) typingEl.remove();

          if (activeContactId === contact.id) {
            headerStatus.textContent = contact.status;
            headerStatus.style.color = 'var(--wa-text-secondary)';
          }

          const replyText = contact.replies[Math.floor(Math.random() * contact.replies.length)];
          contact.messages.push({
            text: replyText,
            sender: 'incoming',
            time: getCurrentTime()
          });

          renderMessages();
          renderChatList(searchInput.value);
        }, 1200);
      }, 800);
    }

    function updateActionBtn() {
      if (msgInput.value.trim()) {
        actionBtn.className = 'action-btn send-active';
        actionIcon.className = 'fa-solid fa-paper-plane';
      } else {
        actionBtn.className = 'action-btn';
        actionIcon.className = 'fa-solid fa-microphone';
      }
    }

    // Event Listeners
    msgInput.addEventListener('input', updateActionBtn);
    msgInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    actionBtn.addEventListener('click', () => {
      if (msgInput.value.trim()) {
        sendMessage();
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderChatList(e.target.value);
    });

    // Initial render
    renderChatList();
    renderMessages();
  </script>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'whatsapp-web-clone.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border flex flex-col max-h-[85vh]"
        style={{
          backgroundColor: 'var(--wa-panel-bg)',
          borderColor: 'var(--wa-border)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b shrink-0"
          style={{ 
            backgroundColor: 'var(--wa-header-bg)',
            borderColor: 'var(--wa-border)'
          }}
        >
          <div className="flex items-center gap-2 text-[#00a884]">
            <Code className="w-5 h-5" />
            <h3 className="font-semibold text-base" style={{ color: 'var(--wa-text-primary)' }}>
              Export Standalone WhatsApp Web HTML
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-[var(--wa-icon)] hover:text-[var(--wa-text-primary)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-4">
          <p className="text-[var(--wa-text-secondary)] leading-relaxed">
            This all-in-one standalone file contains the complete HTML5 structure, modern CSS3 (using Flexbox and WhatsApp CSS variables), and vanilla JavaScript. You can run it directly in any browser without Node or Vite.
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#00a884] text-white rounded-lg hover:bg-[#02906f] flex items-center gap-2 font-medium transition text-xs shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to clipboard!' : 'Copy complete HTML'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg flex items-center gap-2 font-medium transition text-xs border"
              style={{ borderColor: 'var(--wa-border)', color: 'var(--wa-text-primary)' }}
            >
              <Download className="w-4 h-4" />
              <span>Download whatsapp-web-clone.html</span>
            </button>
          </div>

          <div className="relative rounded-lg overflow-hidden border bg-zinc-950 text-zinc-300 p-4 font-mono text-xs max-h-64 overflow-y-auto">
            <pre><code>{standaloneHtml}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};
