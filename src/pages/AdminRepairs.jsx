import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle, Truck, Clock, AlertCircle, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const STATUS_COLORS = {
    'pending_kit': 'bg-yellow-100 text-yellow-800',
    'kit_sent': 'bg-blue-100 text-blue-800',
    'received': 'bg-purple-100 text-purple-800',
    'in_progress': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
    'shipped_back': 'bg-gray-100 text-gray-800'
};

const AdminRepairs = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('repair_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching repair requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('repair_requests')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };

    const filteredRequests = requests.filter(req =>
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.contact_name && req.contact_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-32 md:pt-40 pb-12 px-6">
            <SEO title="Admin Repairs | PonteTIME" />

            <div className="container mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <Link to="/admin" className="text-gray-500 hover:text-luxury-black">
                                <ArrowLeft size={24} />
                            </Link>
                            <h1 className="text-3xl font-serif text-luxury-black">Repair Requests</h1>
                        </div>
                        <p className="text-gray-500 ml-10">Manage service intakes and shipping kits.</p>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex items-center">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search by ID, Brand, Email..."
                        className="flex-1 outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* List Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Client / Watch</th>
                                            <th className="px-6 py-4">Service</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loading ? (
                                            <tr><td colSpan="5" className="text-center py-10">Loading requests...</td></tr>
                                        ) : filteredRequests.length === 0 ? (
                                            <tr><td colSpan="5" className="text-center py-10 text-gray-500">No requests found.</td></tr>
                                        ) : (
                                            filteredRequests.map(req => (
                                                <tr
                                                    key={req.id}
                                                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedRequest?.id === req.id ? 'bg-blue-50' : ''}`}
                                                    onClick={() => setSelectedRequest(req)}
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {new Date(req.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-luxury-black">{req.brand} {req.model}</div>
                                                        <div className="text-gray-500 text-xs">{req.contact_email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        {req.service_type || 'General'}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${STATUS_COLORS[req.status] || 'bg-gray-100'}`}>
                                                            {req.status?.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            className="text-luxury-gold hover:text-luxury-black text-sm font-bold"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedRequest(req);
                                                            }}
                                                        >
                                                            View
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

                    {/* Detail Panel */}
                    <div className="lg:col-span-1">
                        {selectedRequest ? (
                            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 sticky top-32">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-xl font-serif text-luxury-black">Request Details</h2>
                                    <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                                </div>

                                <div className="space-y-6">
                                    {/* Status Control */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Current Status</label>
                                        <select
                                            value={selectedRequest.status}
                                            onChange={(e) => updateStatus(selectedRequest.id, e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-luxury-gold"
                                        >
                                            <option value="pending_kit">Pending Shipping Kit</option>
                                            <option value="kit_sent">Kit Sent to Client</option>
                                            <option value="received">Watch Received</option>
                                            <option value="in_progress">Service In Progress</option>
                                            <option value="completed">Service Completed</option>
                                            <option value="shipped_back">Shipped Back to Client</option>
                                        </select>
                                    </div>

                                    {/* Watch Info */}
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h3 className="font-bold text-luxury-black mb-2 flex items-center gap-2"><Clock size={16} /> Timepiece</h3>
                                        <p className="text-sm"><span className="font-semibold">Brand:</span> {selectedRequest.brand}</p>
                                        <p className="text-sm"><span className="font-semibold">Model:</span> {selectedRequest.model}</p>
                                        <p className="text-sm"><span className="font-semibold">Ref:</span> {selectedRequest.reference_number || 'N/A'}</p>
                                        <p className="text-sm"><span className="font-semibold">Serial:</span> {selectedRequest.serial_number || 'N/A'}</p>
                                        <div className="mt-2 text-xs text-gray-600 border-t border-gray-200 pt-2">
                                            <span className="font-semibold">Issue:</span>
                                            <p className="italic">{selectedRequest.issue_description}</p>
                                        </div>
                                    </div>

                                    {/* Shipping Info */}
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h3 className="font-bold text-luxury-black mb-2 flex items-center gap-2"><MapPin size={16} /> Shipping Address</h3>
                                        {selectedRequest.shipping_address ? (
                                            <div className="text-sm text-gray-700">
                                                <p className="font-semibold">{selectedRequest.shipping_address.name}</p>
                                                <p>{selectedRequest.shipping_address.line1}</p>
                                                {selectedRequest.shipping_address.line2 && <p>{selectedRequest.shipping_address.line2}</p>}
                                                <p>
                                                    {selectedRequest.shipping_address.city}, {selectedRequest.shipping_address.state} {selectedRequest.shipping_address.zip}
                                                </p>
                                                <p>{selectedRequest.shipping_address.country}</p>
                                                <div className="mt-2 text-xs text-gray-500">
                                                    <p>Phone: {selectedRequest.contact_phone}</p>
                                                    <p>Email: {selectedRequest.contact_email}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-red-500">No address data provided.</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                            <Truck size={16} /> Print Shipping Label
                                        </button>
                                        <p className="text-xs text-center text-gray-400 mt-2">Integration coming soon</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center py-12">
                                <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Select a request to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRepairs;
