import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import BrandBar from '../components/BrandBar';
import ProductGridSection from '../components/ProductGridSection';
import Collections from '../components/Collections';
import SellSection from '../components/SellSection';
import RepairSection from '../components/RepairSection';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <main className="bg-white">
            <SEO
                title="Luxury Watches | Rolex, Omega, Patek Philippe"
                description="Discover our curated collection of certified pre-owned luxury watches. Authentic Rolex, Omega, Patek Philippe, and more. Expertly serviced and guaranteed."
            />
            <Hero />
            <BrandBar />

            {/* Rolex Section (Existing Data) */}
            <ProductGridSection
                title="Rolex Watches"
                brandFilter="Rolex"
                limit={6}
            />

            {/* Repair Services Section */}
            <RepairSection />

            {/* Sell Banner */}
            <SellSection />

            {/* New Arrivals (All Brands) */}
            <ProductGridSection
                title="New Arrivals"
                limit={6}
                bgColor="bg-gray-50"
            />

            {/* Categories */}
            <Collections />
        </main>
    );
};

export default Home;
