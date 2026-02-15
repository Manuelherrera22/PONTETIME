import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Search, Package, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const TrackRepair = () => {
    const [repairId, setRepairId] = useState('');
    const [repairData, setRepairData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!repairId) return;

        setLoading(true);
        setError(null);
        setRepairData(null);

        try {
            // Search by ID or Email? Let's assume ID for now, maybe add Email later.
            // Using ID might be tricky if it's a UUID. Maybe we need a short code?
            // For now, let's assume the user enters the UUID or we search by Email + Brand?
            // Let's search by ID first.
            const { data, error } = await supabase
                .from('repair_requests')
                .select('*')
                .eq('id', repairId)
                .single();

            if (error) throw error;
            setRepairData(data);
        } catch (err) {
            console.error('Error fetching repair:', err);
            setError('Repair request not found. Please check your ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStep = (status) => {
        switch (status) {
            case 'pending': return 1;
            case 'kit_shipped': return 2;
            case 'received': return 3;
            case 'assessing': return 4;
            case 'approved': return 5;
            case 'in_progress': return 6;
            case 'completed': return 7;
            case 'shipped_back': return 8;
            default: return 1;
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-luxury-white">
            <SEO title="Track Your Repair | PonteTIME" description="Check the status of your watch repair." />

            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-luxury-black mb-4">Track Your Repair</h1>
                    <p className="text-gray-500">Enter your Repair ID to see the status of your service.</p>
                </div>

                <div className="bg-white p-8 shadow-lg rounded-sm border border-gray-100 mb-12">
                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="e.g. 123e4567-e89b..."
                            value={repairId}
                            onChange={(e) => setRepairId(e.target.value)}
                            className="flex-1 border border-gray-300 p-4 focus:outline-none focus:border-luxury-gold font-mono text-sm"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-luxury-black text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-luxury-gold transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Track'}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 flex items-center gap-2 text-sm">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>

                {repairData && (
                    <div className="bg-white p-8 shadow-xl rounded-sm border-t-4 border-luxury-gold">
                        <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h2 className="text-2xl font-serif text-luxury-black mb-1">{repairData.brand} {repairData.model}</h2>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">ID: {repairData.id}</p>
                            </div>
                            <span className="bg-luxury-gold/10 text-luxury-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {repairData.status.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="space-y-8 relative">
                            {/* Simple timeline */}
                            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                            {/* Status Steps Visualization could go here, for now just details */}

                            <div className="relative pl-12">
                                <div className="absolute left-2 top-1.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm z-10"></div>
                                <h3 className="font-bold text-luxury-black">Service Requested</h3>
                                <p className="text-sm text-gray-500">Received on {new Date(repairData.created_at).toLocaleDateString()}</p>
                            </div>

                            <div className="relative pl-12">
                                <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${['kit_shipped', 'received', 'in_progress', 'completed'].includes(repairData.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <h3 className={`font-bold ${['kit_shipped', 'received', 'in_progress', 'completed'].includes(repairData.status) ? 'text-luxury-black' : 'text-gray-400'}`}>Shipping Kit Sent</h3>
                                <p className="text-sm text-gray-400">We send you a secure box for your watch.</p>
                            </div>

                            <div className="relative pl-12">
                                <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${['received', 'in_progress', 'completed'].includes(repairData.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <h3 className={`font-bold ${['received', 'in_progress', 'completed'].includes(repairData.status) ? 'text-luxury-black' : 'text-gray-400'}`}>Received at Workshop</h3>
                                <p className="text-sm text-gray-400">Your timepiece has arrived safely.</p>
                            </div>

                            <div className="relative pl-12">
                                <div className={`absolute left-2 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${['completed'].includes(repairData.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <h3 className={`font-bold ${['completed'].includes(repairData.status) ? 'text-luxury-black' : 'text-gray-400'}`}>Repair Completed</h3>
                                <p className="text-sm text-gray-400">Ready to be returned to you.</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                            <p>Need help?</p>
                            <a href="mailto:service@pontetime.com" className="text-luxury-gold hover:underline">Contact Support</a>
                        </div>
                    </div>
                )}

                {!repairData && (
                    <div className="text-center">
                        <p className="text-gray-400 text-sm mb-4">Don't have a repair ID?</p>
                        <Link to="/repair-request" className="text-luxury-gold font-bold hover:underline flex items-center justify-center gap-2">
                            Start a New Repair <ArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackRepair;
