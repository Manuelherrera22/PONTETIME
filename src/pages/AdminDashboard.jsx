import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Search, LogOut, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AdminDashboard = () => {
    const { signOut, user } = useAuth();
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchWatches();
    }, []);

    const fetchWatches = async () => {
        try {
            const { data, error } = await supabase
                .from('watches')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setWatches(data || []);
        } catch (error) {
            console.error('Error fetching watches:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this watch?')) return;

        try {
            const { error } = await supabase.from('watches').delete().eq('id', id);
            if (error) throw error;
            setWatches(watches.filter(w => w.id !== id));
        } catch (error) {
            alert('Error deleting watch: ' + error.message);
        }
    };

    const filteredWatches = watches.filter(watch =>
        watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        watch.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (watch.model && watch.model.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-32 md:pt-40 pb-12 px-6">
            <SEO title="Admin Dashboard | PonteTIME" />

            <div className="container mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif text-luxury-black">Dashboard</h1>
                        <p className="text-gray-500">Welcome, {user?.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/admin/repairs"
                            className="bg-luxury-black text-white px-6 py-2 rounded-full flex items-center hover:bg-gray-800 transition-colors"
                        >
                            <Wrench size={18} className="mr-2" /> Service Requests
                        </Link>
                        <Link
                            to="/admin/new"
                            className="bg-luxury-gold text-white px-6 py-2 rounded-full flex items-center hover:bg-yellow-600 transition-colors"
                        >
                            <Plus size={18} className="mr-2" /> Add Watch
                        </Link>
                        <button
                            onClick={signOut}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center hover:bg-gray-100 transition-colors"
                        >
                            <LogOut size={18} className="mr-2" /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Stats Cards (Optional for now) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm uppercase tracking-wider">Total Inventory</h3>
                        <p className="text-3xl font-bold text-luxury-black">{watches.length}</p>
                    </div>
                    {/* Add more stats later */}
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex items-center">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search by brand, name, or reference..."
                        className="flex-1 outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Watch List Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Brand & Name</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Reference</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center py-10">Loading inventory...</td></tr>
                                ) : filteredWatches.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-10 text-gray-500">No watches found.</td></tr>
                                ) : (
                                    filteredWatches.map(watch => (
                                        <tr key={watch.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={watch.image_url}
                                                    alt={watch.name}
                                                    className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-luxury-black">{watch.brand}</div>
                                                <div className="text-gray-500 text-sm">{watch.name}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-sm">
                                                {watch.price ? `$${parseFloat(watch.price).toLocaleString()}` : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {watch.model || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link to={`/admin/edit/${watch.id}`} className="text-blue-500 hover:text-blue-700 p-1 inline-block">
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(watch.id)}
                                                    className="text-red-400 hover:text-red-600 p-1"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
