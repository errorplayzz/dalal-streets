import { createContext, useState, useContext, useEffect } from 'react';

// Create context
export const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  
  // Chat state
  const [chats, setChats] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [activeChat, setActiveChat] = useState(null);
  
  // User preferences
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadNotificationsCount(prev => prev + 1);
    
    // If browser notifications are supported and enabled
    if (window.Notification && Notification.permission === "granted" && preferences.pushNotifications) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/notification-icon.png'
      });
    }
  };

  // Mark a notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    
    // Update unread count
    const unreadCount = notifications.filter(n => !n.read && n.id !== notificationId).length;
    setUnreadNotificationsCount(unreadCount);
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadNotificationsCount(0);
  };

  // Add a new message to chat
  const sendMessage = (chatId, message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      ...message
    };
    
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage
            }
          : chat
      )
    );
    
    // If this isn't the active chat, increment unread count
    if (!activeChat || activeChat.id !== chatId) {
      setUnreadMessagesCount(prev => prev + 1);
    }
    
    return newMessage;
  };

  // Start a new chat
  const startNewChat = (participant) => {
    const newChat = {
      id: Date.now(),
      participant,
      messages: [],
      createdAt: new Date(),
      unreadCount: 0
    };
    
    setChats(prev => [newChat, ...prev]);
    return newChat;
  };

  // Set active chat and mark its messages as read
  const setActiveChatAndMarkRead = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setActiveChat(chat);
      
      // Mark chat messages as read
      setChats(prev =>
        prev.map(c =>
          c.id === chatId ? { ...c, unreadCount: 0 } : c
        )
      );
      
      // Update total unread count
      const totalUnread = chats.reduce((acc, c) => 
        c.id === chatId ? acc : acc + c.unreadCount, 0);
      setUnreadMessagesCount(totalUnread);
    }
  };

  // Update user preferences
  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (window.Notification && Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission();
        return permission === "granted";
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        return false;
      }
    }
    return false;
  };

  // Mock notifications for testing (remove in production)
  useEffect(() => {
    // Demo notifications
    const demoNotifications = [
      {
        id: 1,
        title: 'New Booking Request',
        message: 'You have received a new booking request for Comfort PG',
        type: 'booking',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Payment of ₹12,000 has been received for Room 101',
        type: 'payment',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: 3,
        title: 'New Message',
        message: 'You have a new message from John Doe',
        type: 'message',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
      }
    ];
    
    setNotifications(demoNotifications);
    setUnreadNotificationsCount(demoNotifications.filter(n => !n.read).length);
    
    // Demo chats
    const demoChats = [
      {
        id: 101,
        participant: {
          id: 201,
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'client'
        },
        messages: [
          {
            id: 1001,
            sender: 201,
            content: 'Hi, I\'m interested in your PG accommodation',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
          },
          {
            id: 1002,
            sender: 'self',
            content: 'Hello John, sure! What would you like to know?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23) // 23 hours ago
          },
          {
            id: 1003,
            sender: 201,
            content: 'Is the room still available?',
            timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
          }
        ],
        unreadCount: 1,
        lastMessage: {
          sender: 201,
          content: 'Is the room still available?',
          timestamp: new Date(Date.now() - 1000 * 60 * 30)
        }
      },
      {
        id: 102,
        participant: {
          id: 202,
          name: 'Jane Smith',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          role: 'vendor'
        },
        messages: [
          {
            id: 2001,
            sender: 'self',
            content: 'Hi Jane, do you provide cleaning services?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
          },
          {
            id: 2002,
            sender: 202,
            content: 'Yes, we offer weekly and monthly cleaning packages',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47) // 47 hours ago
          }
        ],
        unreadCount: 0,
        lastMessage: {
          sender: 202,
          content: 'Yes, we offer weekly and monthly cleaning packages',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47)
        }
      }
    ];
    
    setChats(demoChats);
    setUnreadMessagesCount(demoChats.reduce((acc, chat) => acc + chat.unreadCount, 0));
  }, []);

  const contextValue = {
    // Notifications
    notifications,
    unreadNotificationsCount,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    
    // Chat
    chats,
    unreadMessagesCount,
    activeChat,
    sendMessage,
    startNewChat,
    setActiveChatAndMarkRead,
    
    // Preferences
    preferences,
    updatePreferences,
    requestNotificationPermission
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
