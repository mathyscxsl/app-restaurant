import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                axios.get(`http://localhost:4000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((response) => {
                    setUser(response.data);
                    setLoading(false);
                    console.log("Utilisateur récupéré avec succès :", response.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
                    setLoading(false);
                });
            } catch (error) {
                console.error("Erreur lors du décodage du token:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        const token = userData.accessToken;
        localStorage.setItem("token", token);
        setUser(userData);
        console.log("Utilisateur connecté :", userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        console.log("Utilisateur déconnecté");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};