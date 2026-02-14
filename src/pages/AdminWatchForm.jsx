import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AdminWatchForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        brand: '',
        name: '',
        model: '',
        price: '',
        image_url: '',
        description: '',
        product_link: '' // Optional, for reference
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);

    useEffect(() => {
        if (isEditing) {
            fetchWatch();
        }
    }, [id]);

    const fetchWatch = async () => {
        try {
            const { data, error } = await supabase
                .from('watches')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) setFormData(data);
        } catch (error) {
            console.error('Error fetching watch:', error);
            alert('Error loading watch data');
            navigate('/admin');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('watches')
                    .update(formData)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('watches')
                    .insert([formData]);
                if (error) throw error;
            }
            navigate('/admin');
        } catch (error) {
            console.error('Error saving watch:', error);
            alert('Error saving watch: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center pt-24">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 md:pt-40 pb-12 px-6">
            <SEO title={`${isEditing ? 'Edit' : 'Add'} Watch | Admin`} />

            <div className="container mx-auto max-w-2xl">
                <Link to="/admin" className="inline-flex items-center text-gray-500 hover:text-luxury-black mb-6">
                    <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
                </Link>

                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h1 className="text-2xl font-serif text-luxury-black mb-6">
                        {isEditing ? 'Edit Watch' : 'Add New Watch'}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                <select
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                                >
                                    <option value="">Select Brand</option>
                                    <option value="Rolex">Rolex</option>
                                    <option value="Omega">Omega</option>
                                    <option value="Patek Philippe">Patek Philippe</option>
                                    <option value="Audemars Piguet">Audemars Piguet</option>
                                    <option value="Cartier">Cartier</option>
                                    <option value="Tudor">Tudor</option>
                                    <option value="Panerai">Panerai</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Model / Reference</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    placeholder="e.g. 116610LN"
                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Watch Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Submariner Date"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 15000"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                            />
                            {formData.image_url && (
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                    <img src={formData.image_url} alt="Preview" className="h-32 rounded-md border border-gray-200 object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-luxury-gold"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-luxury-black text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center disabled:opacity-50"
                            >
                                <Save size={18} className="mr-2" />
                                {loading ? 'Saving...' : 'Save Watch'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminWatchForm;
