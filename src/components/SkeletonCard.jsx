const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden border border-gray-100 animate-pulse shadow-sm">
            {/* Image Placeholder */}
            <div className="h-80 bg-gray-200" />

            {/* Content Placeholder */}
            <div className="p-6 space-y-4">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
