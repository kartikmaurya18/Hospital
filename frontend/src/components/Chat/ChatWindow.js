import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import './ChatWindow.css';

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

const ChatWindow = ({ receiverId, receiverName, receiverRole }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const connectWebSocket = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/api/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
                setError(null);
                setReconnectAttempts(0);
                
                // Subscribe to user's topic
                client.subscribe(`/topic/user.${user.id}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });

                // Subscribe to error topic
                client.subscribe(`/topic/user.${user.id}/errors`, (message) => {
                    const error = JSON.parse(message.body);
                    setError(error.error);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setIsConnected(false);
                
                // Attempt to reconnect
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    setTimeout(() => {
                        setReconnectAttempts(prev => prev + 1);
                        connectWebSocket();
                    }, RECONNECT_DELAY);
                } else {
                    setError('Unable to connect to chat server. Please refresh the page.');
                }
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
                setError('Connection error. Please try again.');
            }
        });

        client.activate();
        setStompClient(client);
    }, [user.id, reconnectAttempts]);

    useEffect(() => {
        // Load chat history
        const loadChatHistory = async () => {
            try {
                const response = await api.get(`/chat/history?userId1=${user.id}&userId2=${receiverId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error loading chat history:', error);
                setError('Failed to load chat history. Please try again.');
            }
        };

        loadChatHistory();
        connectWebSocket();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [user.id, receiverId, connectWebSocket]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !isConnected) return;

        const message = {
            senderId: user.id,
            receiverId: receiverId,
            content: newMessage,
            senderName: user.name,
            senderRole: user.role
        };

        try {
            stompClient.publish({
                destination: '/app/chat.send',
                body: JSON.stringify(message)
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>{receiverName} ({receiverRole})</h3>
                {!isConnected && (
                    <div className="connection-status">
                        Reconnecting... ({reconnectAttempts}/{MAX_RECONNECT_ATTEMPTS})
                    </div>
                )}
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
                    placeholder={isConnected ? "Type a message..." : "Connecting..."}
                    disabled={!isConnected}
                />
                <button type="submit" disabled={!isConnected || !newMessage.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow; 