import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // When the app starts, check if a user is already "Logged In"
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};