import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, updateUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Mon Profil</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="name" className="block">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">Mettre à jour</button>
            </form>

            <h1 className="mt-8 text-xl font-semibold">Mes Commandes</h1>
            <ul className="mt-4">
                <li>Commande 1</li>
                <li>Commande 2</li>
            </ul>
        </div>
    );
};

export default Profile;