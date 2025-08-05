import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `http://localhost:8000/api/v1/users`
});

export const AuthProvider = ({ children }) => {

    // This state holds the token and initializes its value from localStorage.
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const router = useNavigate();

    // This effect runs whenever the 'token' state changes.
    // This is the most reliable way to handle auth headers.
    useEffect(() => {
        if (token) {
            // When token exists, set it as a default header for all future axios requests.
            client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
        } else {
            // When token is null (on logout), remove the default header.
            delete client.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]); // The effect depends on the token state.

    const handleRegister = async (username, email, password) => {
        try {
            let request = await client.post("/register", {
                username,
                email,
                password
            });
            return request.data.message;
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (email, password) => {
        try {
            let request = await client.post("/login", {
                email,
                password
            });
            if (request.status === httpStatus.OK) {
                // Update the token state, which triggers the useEffect to set the header
                setToken(request.data.token);
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    }
    
    const handleLogout = () => {
        // Setting token to null triggers the useEffect to clear headers
        setToken(null);
        router("/auth");
    }

    const getHistoryOfUser = async () => {
        try {
            // No need to pass headers manually anymore. The effect handles it.
            let request = await client.get("/get_all_history");
            return request.data;
        } catch (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            // No need to pass headers manually anymore. The effect handles it.
            let request = await client.post("/add_to_history", { meetingCode });
            return request;
        } catch (e) {
            throw e;
        }
    }

    // The functions and state made available to the rest of the app
    const data = {
        token, // Exposing the token so components can know if a user is logged in.
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
