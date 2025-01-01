import { useEffect, useState } from 'react';
import { db } from './../config'; // Adjust the import based on your project structure
import CarItem from './CarItem'; // Import CarItem to display individual car details
import { CarImages, CarListing } from './../config/schema'; // Adjust the import based on your project structure
import Service from './../Service'; // Adjust the import based on your project structure
import { eq } from 'drizzle-orm';
import Header from './Header';
import { Separator } from './components/ui/separator';

function Collection() {
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        const fetchCarList = async () => {
            const result = await db.select().from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId));
            const resp = Service.FormatResult(result);
            setCarList(resp);
        };

        fetchCarList();
    }, []);

    return (
        <div>
            <Header/>
            <Separator className='my-3'/>
            <h1 className="text-4xl font-bold text-center my-8">Cars Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-12">
                {carList.map((car) => (
                    <CarItem key={car.id} car={car} />
                ))}
            </div>
        </div>
    );
}

export default Collection;