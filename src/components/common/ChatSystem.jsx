import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import './CommonComponents.css';

export const ChatSystem = () => {
  const { 
    chats, 
    unreadMessagesCount, 
    activeChat, 
    sendMessage, 
    startNewChat, 
    setActiveChatAndMarkRead 
  } = useAppContext();
  
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showChatList, setShowChatList] = useState(true);
  
  const chatPanelRef = useRef(null);
  const messageEndRef = useRef(null);

  // Close chat panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatPanelRef.current && !chatPanelRef.current.contains(event.target)) {
        setShowChatPanel(false);
      }
    };

    if (showChatPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatPanel]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat]);

  // Format timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatChatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!messageText.trim() || !activeChat) return;
    
    sendMessage(activeChat.id, {
      sender: 'self',
      content: messageText
    });
    
    setMessageText('');
  };

  // Open chat with specific user
  const handleOpenChat = (chatId) => {
    setActiveChatAndMarkRead(chatId);
    setShowChatList(false);
  };

  // Back to chat list
  const handleBackToList = () => {
    setShowChatList(true);
  };

  return (
    <div className="chat-system" ref={chatPanelRef}>
      <button 
        className="chat-button"
        onClick={() => setShowChatPanel(!showChatPanel)}
      >
        💬
        {unreadMessagesCount > 0 && (
          <span className="chat-badge">{unreadMessagesCount}</span>
        )}
      </button>
      
      {showChatPanel && (
        <div className="chat-panel">
          <div className="chat-header">
            {!showChatList && activeChat ? (
              <>
                <button className="back-to-list" onClick={handleBackToList}>
                  &#8592;
                </button>
                <div className="active-chat-info">
                  <img 
                    src={activeChat.participant.avatar} 
                    alt={activeChat.participant.name} 
                    className="chat-avatar"
                  />
                  <div>
                    <h4>{activeChat.participant.name}</h4>
                    <span className="participant-role">{activeChat.participant.role}</span>
                  </div>
                </div>
              </>
            ) : (
              <h3>Messages</h3>
            )}
            <button 
              className="close-chat"
              onClick={() => setShowChatPanel(false)}
            >
              ✕
            </button>
          </div>
          
          {showChatList ? (
            <div className="chats-list">
              {chats.length > 0 ? (
                chats.map(chat => (
                  <div 
                    key={chat.id}
                    className={`chat-item ${chat.unreadCount > 0 ? 'unread' : ''}`}
                    onClick={() => handleOpenChat(chat.id)}
                  >
                    <img 
                      src={chat.participant.avatar} 
                      alt={chat.participant.name} 
                      className="chat-avatar"
                    />
                    <div className="chat-info">
                      <div className="chat-name-time">
                        <h4>{chat.participant.name}</h4>
                        {chat.lastMessage && (
                          <span className="chat-time">
                            {formatChatTime(chat.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      {chat.lastMessage && (
                        <p className="last-message">
                          {chat.lastMessage.sender === 'self' ? 'You: ' : ''}
                          {chat.lastMessage.content.length > 35
                            ? `${chat.lastMessage.content.substring(0, 35)}...`
                            : chat.lastMessage.content
                          }
                        </p>
                      )}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="unread-chat-badge">{chat.unreadCount}</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-chats">
                  <p>No conversations yet</p>
                </div>
              )}
            </div>
          ) : (
            activeChat && (
              <>
                <div className="chat-messages">
                  {activeChat.messages.length > 0 ? (
                    activeChat.messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`message ${message.sender === 'self' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                          {message.content}
                          <span className="message-time">
                            {formatMessageTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-messages">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  )}
                  <div ref={messageEndRef} />
                </div>
                
                <form className="message-form" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button type="submit" disabled={!messageText.trim()}>
                    Send
                  </button>
                </form>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
};
