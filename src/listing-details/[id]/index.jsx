import Header from '@/Header';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DescriptionDetail from '../components/DescriptionDetail';
import DetailHeader from '../components/DetailHeader';
import FeaturesDesc from '../components/FeaturesDesc';
import ImageGalley from '../components/ImageGalley';
import Pricing from '../components/Pricing';
import { db } from './../../../config';
import { CarImages, CarListing } from './../../../config/schema';
import Service from './../../../Service';
import Specs from '../components/Specs';
import OwnerDetails from '../components/OwnerDetails';
import FinancialCalculator from '../components/FinancialCalculator';
import FeaturedCars from '@/FeaturedCars';

function ListingDetail() {

    const { id } = useParams();
    const [carDetail, setCarDetail] = useState();

    useEffect(() => {
        GetCarDetails();
    }, [])

    const GetCarDetails = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, id));

        const resp = Service.FormatResult(result);
        setCarDetail(resp[0]);
    }


    return (
        
        <div className='p-10 md:px-20'>
            <Header />
            <DetailHeader carDetail={carDetail} />

            <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                <div className='md:col-span-2 '>
                    {/* left side */}
                    <ImageGalley carDetail={carDetail} />

                    <DescriptionDetail carDetail={carDetail} />

                    <FeaturesDesc features={carDetail?.features} />

                    <FinancialCalculator carDetail={carDetail}/>

                </div>

                <div >
                    {/* right side */}
                    <Pricing carDetail={carDetail}/>

                    <Specs carDetail={carDetail}/>

                    <OwnerDetails carDetail={carDetail}/>
                </div>
            </div>
            
        </div>
    )
}

export default ListingDetail