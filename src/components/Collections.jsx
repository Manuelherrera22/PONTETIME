import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const initialCategories = [
    { name: "Rolex", brand: "Rolex", models: ["Submariner", "Daytona", "GMT-Master"], fallbackImage: "https://images.unsplash.com/photo-1623998021155-70eaf87d3a01?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Rolex" },
    { name: "Patek Philippe", brand: "Patek Philippe", models: ["Calatrava", "Complications"], fallbackImage: "https://images.unsplash.com/photo-1595303649987-0b1a646c1417?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Patek Philippe" },
    { name: "Audemars Piguet", brand: "Audemars Piguet", models: ["Royal Oak"], fallbackImage: "https://images.unsplash.com/photo-1590736969955-71cc7980653e?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Audemars Piguet" }, // Replaced generic Women's with top tier brand
    { name: "Omega", brand: "Omega", models: ["Seamaster", "Planet Ocean"], fallbackImage: "https://images.unsplash.com/photo-1547996668-cb06000051e5?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Omega" },
    { name: "Cartier", brand: "Cartier", models: ["Tank", "Santos"], fallbackImage: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?q=80&w=800&auto=format&fit=crop", link: "/shop?brand=Cartier" },
];

const Collections = () => {
    const [categories, setCategories] = useState(initialCategories);

    useEffect(() => {
        const fetchCategoryImages = async () => {
            const updatedCategories = await Promise.all(initialCategories.map(async (cat) => {
                let query = supabase
                    .from('watches')
                    .select('image_url')
                    .ilike('brand', `%${cat.brand}%`)
                    .limit(1);

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
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                        Curated
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-serif text-luxury-black">
                        Browse by Brand
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.link} className="group block text-center">
                            <div className="aspect-square bg-gray-50 mb-4 md:mb-6 overflow-hidden relative rounded-sm">
                                <img
                                    src={cat.image || cat.fallbackImage}
                                    alt={cat.name}
                                    className="w-full h-full object-contain p-6 md:p-8 transform group-hover:scale-110 transition-transform duration-700 mix-blend-multiply opacity-90 group-hover:opacity-100"
                                />
                            </div>
                            <h3 className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-luxury-black group-hover:text-luxury-gold transition-colors">
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
