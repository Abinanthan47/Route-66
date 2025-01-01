/* eslint-disable react/prop-types */

import { Calendar, Fuel, Gauge, LucideSquareArrowOutUpRight, Settings2 } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
function CarItem({ car }) {
    if (!car) {
        return <div className="text-gray-500">No car data available</div>;
    }

    return (
        <div className="relative border-2 border-black/50 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-4 max-w-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">{car.listingTitle?.slice(0, 15) || "Car Title"}</h3>
                    <p className="text-gray-500">{car.model || "Car Model"}</p>
                </div>
                <span className="bg-amber-400 border border-black text-black px-3 py-1 rounded-full text-sm font-medium">
                    {car.status || "Available"}
                </span>
            </div>

            {car?.images && car.images.length > 0 ? (
                <img
                    src={car.images[0]}

                    alt="car img"
                    className="rounded-md object-cover w-full h-48  "
                />
            ) : (
                <div className="rounded-md bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500">
                    No Image Available
                </div>
            )}

            <div className="flex items-center text-center justify-between">
                <div className=" items-center gap-2">
                    <Fuel className="text-gray-700 ml-2" />
                    <span className="text-gray-700 text-sm">{car?.fuelType || "N/A"}</span>
                </div>
                <div className=" items-center gap-2">
                    <Gauge className="ml-1 text-gray-700" />
                    <span className="text-gray-700 text-sm">{car?.mileage || "N/A"}</span>
                </div>
                <div className=" items-center gap-2">
                    <Settings2 className="ml-3 text-gray-700" />
                    <span className="text-gray-700 text-sm">{car?.transmission || "N/A"}</span>
                </div>
                <div className="items-center gap-2">
                    <Calendar className="text-gray-700" />
                    <span className="text-gray-700 text-sm">{car?.year || "N/A"}</span>
                </div>
            </div>
            <Separator className='bg-black/50' />
            <div className="flex items-center justify-between mt-2">
                <div>
                    <p className="text-gray-700 text-sm">Listed by</p>
                    <p className="font-medium flex text-gray-900">{car.createdBy?.slice(0, 5) || "Seller"} <MdVerified className="text-sm m-1 text-blue-600" /></p>
                </div>
                <p className="text-3xl font-semibold text-gray-900">${car.sellingPrice || "N/A"}</p>
            </div>
            <Link to={`/listing-details/${car.id}`}>
                <Button className="w-full">
                    View Details <LucideSquareArrowOutUpRight className="ml-2" />
                </Button>
            </Link>
        </div>
    );
}

export default CarItem;
