import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import CarItem from './CarItem'
import FakeData from './constants/FakeData'
import { useEffect, useState } from "react"
import { db } from "./../config";
import { desc, eq } from "drizzle-orm";
import { CarImages, CarListing } from "./../config/schema";
import Service from "./../Service";
import { Separator } from "./components/ui/separator";


function FeaturedCars() {
const [carList,setCarList] = useState([]);

useEffect(()=>{
    FeaturedcarsList();
},[])

    const FeaturedcarsList = async () => {
        const result = await db.select().from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .orderBy(desc(CarListing.id))
            .limit(10)

        const resp = Service.FormatResult(result)
        // console.log(resp);
        setCarList(resp);
    }

    return (
        <div className=" mx-12 md:mx-24 mb-5">
            <Separator/>
            <h2 className='font-bold text-4xl text-center my-8'>Featured Cars</h2>

            <Carousel >
                <CarouselContent className=''>
                    {carList.map((car, index) => (

                        <CarouselItem  key={index} className='md:basis-1/4' >  <CarItem car={car} /></CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default FeaturedCars