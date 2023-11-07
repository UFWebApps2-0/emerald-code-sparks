import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './NotificationCenter.less';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Assignment #3 is due tomorrow!', read: false },
    { id: 2, text: 'New lecture material is available.', read: false },
    { id: 3, text: 'Classroom will meet in room 202 today.', read: false },
  ]);
  const [activeTab, setActiveTab] = useState('unread');

  const markAsRead = (id) => {
    setNotifications(notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    }));
  };

  return (
    <div className="container nav-padding"> {}
      <NavBar /> {}
      <div className="notification-box">
        <div className="notification-title">Notification Center</div>
        <div className="tabs">
          <button className={`tab ${activeTab === 'unread' ? 'active' : ''}`} onClick={() => setActiveTab('unread')}>Unread</button>
          <button className={`tab ${activeTab === 'read' ? 'active' : ''}`} onClick={() => setActiveTab('read')}>Read</button>
        </div>
        
        <div id="unread" className={`tab-content ${activeTab === 'unread' ? 'active' : ''}`}>
          {notifications.filter((n) => !n.read).map((notification) => (
            <div key={notification.id} className="notification-message">
              {notification.text}
              <button className="notification-button" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            </div>
          ))}
        </div>

        <div id="read" className={`tab-content ${activeTab === 'read' ? 'active' : ''}`}>
          {notifications.filter((n) => n.read).map((notification) => (
            <div key={notification.id} className="notification-message">
              {notification.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
