import { CarIcon, EarthIcon, List, Shield } from 'lucide-react';
import { Separator } from './components/ui/separator';

const features = [
    {
        title: "Easy Listing",
        description: "List your car in just a few clicks and reach potential buyers quickly.",
        icon: <List />
    },
    {
        title: "Secure Transactions",
        description: "We ensure secure payment methods for a safe buying experience.",
        icon: <Shield />
    },
    {
        title: "Wide Selection",
        description: "Browse through a diverse range of vintage cars from various brands.",
        icon: <CarIcon />
    },
    {
        title: "User-Friendly Interface",
        description: "Our platform is designed for ease of use, making it simple to navigate.",
        icon: <EarthIcon />
    }
];

function Testimonials() {
    return (
        <div className="py-16 bg-white">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Why Choose Us?
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg text-center 
                        transition-all duration-300 ease-in-out
                        hover:shadow-2xl hover:-translate-y-1 
                        border border-gray-800 hover:border-gray-200
                        group"
                    >
                        <div className="text-5xl mb-4 text-gray-700 group-hover:text-amber-400 transition-colors duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-amber-400 transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
            <Separator className="mt-16" />
        </div>
    );
}

export default Testimonials;
