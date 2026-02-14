import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const initialCategories = [
    { name: "Men's Watches", brand: "Rolex", models: ["Submariner", "Daytona", "GMT-Master"], fallbackImage: "https://images.unsplash.com/photo-1623998021155-70eaf87d3a01?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Rolex" },
    { name: "Women's Watches", brand: "Cartier", models: ["Tank", "Panthere", "Ballon Bleu"], fallbackImage: "https://images.unsplash.com/photo-1590736969955-71cc7980653e?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Cartier" },
    { name: "Dress Watches", brand: "Patek Philippe", models: ["Calatrava", "Complications"], fallbackImage: "https://images.unsplash.com/photo-1595303649987-0b1a646c1417?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Patek Philippe" },
    { name: "Dive Watches", brand: "Omega", models: ["Seamaster", "Planet Ocean"], fallbackImage: "https://images.unsplash.com/photo-1547996668-cb06000051e5?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Omega" },
    { name: "Vintage Watches", brand: "Rolex", models: ["Datejust", "Day-Date"], fallbackImage: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Rolex" },
];

const Collections = () => {
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const fetchCategoryImages = async () => {
            const updatedCategories = await Promise.all(initialCategories.map(async (cat) => {
                // Try to find a watch from this brand, ideally matching one of the models
                let query = supabase
                    .from('watches')
                    .select('image_url')
                    .ilike('brand', `%${cat.brand}%`)
                    .limit(1);

                // If we want to be more specific, we could validly try to search for models, 
                // but a simple brand search is safer to guarantee *some* image.
                // Let's try to get a random one or the latest one.

                const { data, error } = await query;

                if (!error && data && data.length > 0 && data[0].image_url) {
                    return { ...cat, image: data[0].image_url };
                }
                return { ...cat, image: cat.fallbackImage };
            }));
            setCategories(updatedCategories);
        };

        fetchCategoryImages();
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-12 pl-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                        SHOP
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-serif text-luxury-black mb-12">
                        Collections
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.link} className="group block text-center">
                            <div className="aspect-square bg-gray-100 mb-6 overflow-hidden relative">
                                <img
                                    src={cat.image || cat.fallbackImage}
                                    alt={cat.name}
                                    className="w-full h-full object-contain p-8 md:p-12 transform group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                                />
                                {/* Optional: Add a subtle background overlay if images are transparent pngs */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/0 transition-colors"></div>
                            </div>
                            <h3 className="font-serif text-lg text-luxury-black group-hover:text-luxury-gold transition-colors">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;
