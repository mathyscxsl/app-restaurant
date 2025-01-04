import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/restaurants');
            setRestaurants(response.data.restaurants);
        } catch (error) {
            console.error('Erreur lors de la récupération des restaurants:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return <div className="text-center text-lg">Chargement des restaurants...</div>;
    }

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Liste des Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
            <div
                key={restaurant.id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
                <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.address}</p>
                <p className="text-gray-500">
                {restaurant.postalCode}, {restaurant.city}
                </p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Home;