import { CgCheckO } from "react-icons/cg";

function FeaturesDesc({ features }) {
    // Check if features is a valid object
    if (!features || typeof features !== 'object') {
        return <div>No features available</div>; // Fallback UI
    }

    console.log(features);
    return (
        <div className='mt-6 '>
            <div className='p-5 border border-black bg-white rounded-xl shadow-md '>
                <h2 className='font-medium text-2xl'>Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-4">
                    {Object.entries(features).map(([feature, value]) => (
                        <div key={feature} className="flex gap-2 items-center">
                            <CgCheckO className="text-lg text-gray-800" />
                            <h2 className="capitalize">{feature}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeaturesDesc