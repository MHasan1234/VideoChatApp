import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    // --- FIX: Add a loading state to track auth setup ---
    const [isLoading, setIsLoading] = useState(true);
    const router = useNavigate();

    useEffect(() => {
        // This effect runs once on initial app load
        const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            // If a token is found, set it as the default header
            client.defaults.headers.common['Authorization'] = 'Bearer ' + tokenFromStorage;
            setToken(tokenFromStorage);
        }
        // --- FIX: Signal that authentication setup is complete ---
        setIsLoading(false);
    }, []); // Empty array ensures this runs only once

    const handleLogin = async (email, password) => {
        try {
            const request = await client.post("/login", { email, password });
            if (request.status === httpStatus.OK) {
                const newToken = request.data.token;
                localStorage.setItem('token', newToken);
                client.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                setToken(newToken);
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        delete client.defaults.headers.common['Authorization'];
        setToken(null);
        router("/auth");
    };

      const handleRegister = async (username, email, password) => {
        try {
            // First, register the new user
            await client.post("/register", { username, email, password });
            
            // If registration is successful, automatically log them in
            await handleLogin(email, password);
            // The handleLogin function will redirect to the "/home" page
        } catch (err) {
            // Re-throw the error to be caught by the UI component
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_history");
            return request.data;
        } catch (err) {
            throw err;
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_history", { meetingCode });
            return request;
        } catch (e) {
            throw e;
        }
    };

    const data = {
        token,
        isLoading, // --- FIX: Expose the loading state to other components ---
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin,
        handleLogout
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}
