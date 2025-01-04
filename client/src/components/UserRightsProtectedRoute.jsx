import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UserRightsProtectedRoute = ({ children, resourceId }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [hasRights, setHasRights] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get(`/api/users/${resourceId}/check-rights`, { headers: { Authorization: `Bearer ${user.token}` } })
            .then(response => {
                setHasRights(response.data.hasRights);
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Accès refusé',
                    text: "Vous n'avez pas les droits nécessaires.",
                    showConfirmButton: true,
                });
                navigate('/');
            });
    }, [user, resourceId, navigate]);

    if (!hasRights) {
        return null;
    }

    return children;
};

export default UserRightsProtectedRoute;
