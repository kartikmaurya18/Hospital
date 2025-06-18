import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import './ChatWindow.css';

const ChatWindow = ({ receiverId, receiverName, receiverRole }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    useEffect(() => {
        // Load chat history
        const loadChatHistory = async () => {
            if (!user?.id || !receiverId) return;

            try {
                const response = await api.get(`/chat/history?userId1=${user.id}&userId2=${receiverId}`);
                if (response.data) {
                    setMessages(response.data);
                }
            } catch (error) {
                console.error('Error loading chat history:', error);
                setError('Failed to load chat history. Please try again.');
            }
        };

        loadChatHistory();
        // Set up polling for new messages
        const pollInterval = setInterval(loadChatHistory, 5000); // Poll every 5 seconds

        return () => clearInterval(pollInterval);
    }, [user?.id, receiverId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !user?.id) return;

        const message = {
            senderId: user.id,
            receiverId: receiverId,
            content: newMessage,
            senderName: user.name,
            senderRole: user.role,
            timestamp: new Date().toISOString()
        };

        try {
            await api.post('/chat/send', message);
            setMessages(prevMessages => [...prevMessages, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
        }
    };

    if (!user?.id || !receiverId) {
        return <div className="chat-window">Loading...</div>;
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{receiverName} ({receiverRole})</h3>
            </div>
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => setError(null)}>Dismiss</button>
                </div>
            )}
            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.senderId === user.id ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <div className="message-sender">{message.senderName}</div>
                            <div className="message-text">{message.content}</div>
                            <div className="message-time">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit" disabled={!newMessage.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow; 