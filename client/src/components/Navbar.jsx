import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaUtensils } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <ul className="flex space-x-4 items-center justify-between">
                <li>
                    <Link to="/" className="text-white hover:text-gray-300 flex items-center">
                        <FaUtensils className="mr-2" /> Restaurants
                    </Link>
                </li>

                <div className="flex space-x-4 items-center">
                    {loading ? (
                        <span className="text-white">Chargement...</span>
                    ) : user ? (
                        <>
                            <li className="flex items-center space-x-2 cursor-pointer">
                                <span className="text-white hover:text-gray-300">
                                    👤 {user.name || "Utilisateur"}
                                </span>
                            </li>

                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="text-white hover:text-gray-300 flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> Déconnexion
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-white hover:text-gray-300">Connexion</Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-white hover:text-gray-300">Inscription</Link>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;