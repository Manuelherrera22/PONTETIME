import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Truck, Watch, FileText, ChevronRight, ChevronLeft, AlertCircle, X, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const steps = [
    { id: 1, title: 'Watch Details', icon: Watch },
    { id: 2, title: 'Service Needed', icon: FileText },
    { id: 3, title: 'Shipping Kit', icon: Truck },
];

const RepairRequest = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        reference_number: '',
        serial_number: '',
        issue_description: '',
        service_type: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'US',
        photo_urls: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const newUrls = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { data, error } = await supabase.storage
                    .from('repair-photos')
                    .upload(filePath, file);

                if (error) {
                    console.error('Upload error:', error);
                    continue;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('repair-photos')
                    .getPublicUrl(filePath);

                newUrls.push(publicUrl);
            }

            setFormData(prev => ({
                ...prev,
                photo_urls: [...(prev.photo_urls || []), ...newUrls]
            }));

        } catch (error) {
            console.error('Error uploading photos:', error);
            setError('Failed to upload some photos.');
        } finally {
            setUploading(false);
        }
    };

    const removePhoto = (index) => {
        setFormData(prev => ({
            ...prev,
            photo_urls: prev.photo_urls.filter((_, i) => i !== index)
        }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);

        try {
            const { error: insertError } = await supabase
                .from('repair_requests')
                .insert([
                    {
                        brand: formData.brand,
                        model: formData.model,
                        reference_number: formData.reference_number,
                        serial_number: formData.serial_number,
                        issue_description: formData.issue_description,
                        photo_urls: formData.photo_urls,
                        service_type: formData.service_type,
                        contact_email: formData.contact_email,
                        contact_phone: formData.contact_phone,
                        shipping_address: {
                            name: formData.contact_name,
                            line1: formData.address_line1,
                            line2: formData.address_line2,
                            city: formData.city,
                            state: formData.state,
                            zip: formData.zip_code,
                            country: formData.country
                        }
                    }
                ]);

            if (insertError) throw insertError;
            setSuccess(true);
        } catch (err) {
            console.error('Error submitting repair request:', err);
            setError('Failed to submit request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-luxury-white flex items-center justify-center">
                <div className="max-w-2xl w-full mx-6 bg-white p-12 shadow-2xl text-center rounded-sm border border-gray-100">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="text-green-600" size={48} />
                    </div>
                    <h2 className="text-4xl font-serif text-luxury-black mb-4">Request Received</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Thank you, {formData.contact_name}. We have received your service request for your {formData.brand}.
                        <br /><br />
                        Your insured Shipping Kit is being prepared and will be shipped to the address provided within 24 hours.
                        You will receive a tracking number via email shortly.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/" className="inline-block bg-luxury-black text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-luxury-gold transition-colors">
                            Return Home
                        </Link>

                        <a href="sms:+13055550123" className="inline-flex items-center justify-center gap-2 border border-luxury-black text-luxury-black px-8 py-4 uppercase tracking-widest font-bold hover:bg-gray-50 transition-colors">
                            <Phone size={20} /> Text Concierge
                        </a>

                        <a href="https://wa.me/13055550123" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 uppercase tracking-widest font-bold hover:bg-[#128C7E] transition-colors">
                            <MessageCircle size={20} /> WhatsApp
                        </a>
                    </div>
                    <p className="mt-6 text-xs text-gray-400">
                        Available Mon-Fri, 9am - 6pm EST
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-luxury-white">
            <SEO
                title="Service Request | PonteTIME"
                description="Start your luxury watch repair. Request an insured shipping kit for your Rolex, Patek Philippe, or other fine timepiece."
            />

            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif text-luxury-black text-center mb-12">Start Your Repair</h1>

                {/* Progress Indicators */}
                <div className="flex justify-between items-center mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>
                    {steps.map((step) => (
                        <div key={step.id} className={`relative z-10 flex flex-col items-center bg-luxury-white px-4`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${currentStep >= step.id
                                ? 'bg-luxury-gold border-luxury-gold text-white'
                                : 'bg-white border-gray-300 text-gray-400'
                                }`}>
                                <step.icon size={20} />
                            </div>
                            <span className={`text-sm font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-luxury-black' : 'text-gray-400'}`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Steps */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 rounded-sm"
                >
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-center gap-3">
                            <AlertCircle className="text-red-500" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif mb-6">Tell us about your timepiece</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        placeholder="e.g. Rolex"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Model</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        placeholder="e.g. Submariner"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Reference Number (Optional)</label>
                                    <input
                                        type="text"
                                        name="reference_number"
                                        value={formData.reference_number}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        placeholder="e.g. 16610"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Serial Number (Optional)</label>
                                    <input
                                        type="text"
                                        name="serial_number"
                                        value={formData.serial_number}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        placeholder="For security verification"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif mb-6">Service Required</h3>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Service Type</label>
                                <select
                                    name="service_type"
                                    value={formData.service_type}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold bg-white"
                                >
                                    <option value="">Select a Service...</option>
                                    <option value="Complete Overhaul">Complete Movement Overhaul</option>
                                    <option value="Polishing & Refinishing">Polishing & Refinishing</option>
                                    <option value="Battery & Reseal">Battery Replacement & Reseal</option>
                                    <option value="Crystal Replacement">Crystal Replacement</option>
                                    <option value="Strap/Bracelet Repair">Strap/Bracelet Repair</option>
                                    <option value="Other">Other / Diagnostic</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description of Issue</label>
                                <textarea
                                    name="issue_description"
                                    value={formData.issue_description}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    placeholder="Please describe any specific issues (e.g. losing time, moisture inside, broken clasp)..."
                                />
                            </div>

                            {/* Photo Upload Section */}
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Upload Photos (Optional)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-sm p-6 text-center hover:border-luxury-gold transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        id="photo-upload"
                                        disabled={uploading}
                                    />
                                    <label htmlFor="photo-upload" className="cursor-pointer">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                                <FileText size={20} />
                                            </div>
                                            <span className="text-sm font-bold text-luxury-black">Click to Upload Photos</span>
                                            <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
                                        </div>
                                    </label>
                                </div>

                                {uploading && (
                                    <div className="mt-2 text-xs text-luxury-gold font-bold">Uploading...</div>
                                )}

                                {/* Preview Grid */}
                                {formData.photo_urls && formData.photo_urls.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                        {formData.photo_urls.map((url, index) => (
                                            <div key={index} className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden">
                                                <img src={url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    onClick={() => removePhoto(index)}
                                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif mb-6">Where should we send the Kit?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="contact_name"
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="contact_email"
                                        value={formData.contact_email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="contact_phone"
                                        value={formData.contact_phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="address_line1"
                                        value={formData.address_line1}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Zip Code</label>
                                        <input
                                            type="text"
                                            name="zip_code"
                                            value={formData.zip_code}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 p-3 focus:outline-none focus:border-luxury-gold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                        {currentStep > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-gray-500 hover:text-luxury-black font-medium"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {currentStep < 3 ? (
                            <button
                                onClick={nextStep}
                                className="bg-luxury-black text-white px-8 py-3 uppercase tracking-widest font-bold hover:bg-luxury-gold transition-colors flex items-center gap-2"
                            >
                                Next Step <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="bg-luxury-gold text-white px-8 py-3 uppercase tracking-widest font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submitting ? 'Processing...' : 'Request Shipping Kit'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RepairRequest;
