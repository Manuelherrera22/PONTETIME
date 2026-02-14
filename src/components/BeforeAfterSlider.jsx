import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleTouchMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] overflow-hidden cursor-ew-resize select-none group"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After Repair"
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
            />
            <div className="absolute bottom-4 right-4 bg-white/90 text-luxury-black px-4 py-2 text-xs font-serif font-bold pointer-events-none shadow-sm">
                After Sotheby's
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <img
                    src={beforeImage}
                    alt="Before Repair"
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 text-luxury-black px-4 py-2 text-xs font-serif font-bold pointer-events-none shadow-sm">
                    Before Sotheby's
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-luxury-black">
                    <ArrowLeftRight size={20} />
                </div>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;
