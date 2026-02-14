import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a loading spinner

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Optional: Add admin check if prop is passed
    // For now, we trust the routing structure, but we could add:
    // if (adminOnly && user.email !== 'herreraflorezm@yahoo.com.co') return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
