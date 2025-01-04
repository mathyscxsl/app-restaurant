import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RestaurantProtectedRoute = ({ children, restaurantId }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get(`/api/restaurants/${restaurantId}/check-user`, { headers: { Authorization: `Bearer ${user.token}` } })
            .then(response => {
                setIsOwner(response.data.isOwner);
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Accès refusé',
                    showConfirmButton: true,
                });
                navigate('/');
            });
    }, [user, restaurantId, navigate]);

    if (!isOwner) {
        return null;
    }

    return children;
};

export default RestaurantProtectedRoute;