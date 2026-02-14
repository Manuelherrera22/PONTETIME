import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const ADMIN_EMAIL = 'herreraflorezm@yahoo.com.co';

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.email !== ADMIN_EMAIL) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
