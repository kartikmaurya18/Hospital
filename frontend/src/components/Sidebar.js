import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(`/api/sidebar/menu-items?role=${user.role}`);
                setMenuItems(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to load menu items');
                console.error('Error fetching menu items:', error);
            }
        };

        if (user?.role) {
            fetchMenuItems();
        }
    }, [user?.role]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (error) {
        return (
            <div className="bg-red-100 text-red-700 p-4">
                {error}
            </div>
        );
    }

    return (
        <div className={`bg-gray-800 text-white h-screen ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
            <div className="p-4 flex justify-between items-center">
                {!isCollapsed && <h1 className="text-xl font-bold">Hospital</h1>}
                <button 
                    onClick={toggleSidebar} 
                    className="p-2 rounded hover:bg-gray-700"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="mt-8">
                {menuItems.map((item, index) => (
                    item.title === 'Logout' ? (
                        <button
                            key={index}
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 hover:bg-gray-700"
                        >
                            <span className="material-icons mr-3">{item.icon}</span>
                            {!isCollapsed && <span>{item.title}</span>}
                        </button>
                    ) : (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center px-4 py-3 ${
                                location.pathname === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <span className="material-icons mr-3">{item.icon}</span>
                            {!isCollapsed && <span>{item.title}</span>}
                        </Link>
                    )
                ))}
            </nav>
        </div>
    );
};

export default Sidebar; 