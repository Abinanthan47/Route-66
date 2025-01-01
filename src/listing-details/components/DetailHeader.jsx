/* eslint-disable react/prop-types */
import { Calendar, Fuel, GaugeCircle, Settings2Icon } from 'lucide-react'

function DetailHeader({ carDetail }) {
    return (
        <div>
            {carDetail?.listingTitle ?
                <div>
                    <h2 className='font-medium mt-5 text-3xl'>{carDetail?.listingTitle}</h2>
                    <p className='text-sm'>{carDetail?.tagline}</p>
                    <div className='flex gap-2 mt-3'>
                        <div className='flex gap-2 items-center bg-[#2F2F31] text-white p-2 px-3 rounded-full'>
                            <Calendar className='h-5 text-white ' />
                            <h2 className='text-sm'>{carDetail?.year}</h2>
                        </div>
                        <div className='flex gap-2 items-center bg-[#2F2F31]  p-2 px-3 rounded-full'>
                            <GaugeCircle className='h-5 text-white ' />
                            <h2 className='text-sm text-white'>{carDetail?.mileage}</h2>
                        </div>

                        <div className='flex gap-2 items-center bg-[#2F2F31] p-2 px-3 rounded-full'>
                            <Settings2Icon className='h-5 text-white ' />
                            <h2 className='text-sm text-white'>{carDetail?.transmission}</h2>
                        </div>

                        <div className='flex gap-2 items-center bg-[#2F2F31] p-2 px-3 rounded-full'>
                            <Fuel className='h-4 text-white' />
                            <h2 className='text-sm text-white'>{carDetail?.fuelType}</h2>
                        </div>
                    </div>
                </div> :
                <div className='w-[80%] rounded-xl h-[100px] m-5 flex items-center justify-center bg-slate-200 animate-pulse'>
<h2 className='text-md '>Loading Data....</h2>
                </div>}
        </div>

    )
}

export default DetailHeader