
import Data from './constants/Data'

function Brands() {
    return (
        <div className='mt-10 md:flex justify-center' >

            <h2 className='font-medium text-5xl text-center mb-14 md:w-[20%] leading-10 '>Unlock Your Brands</h2>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 '>
                {Data.Brands.map((brand, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <div key={index} className=' items-center '>
                        <img src={brand.image} className='h-14 mb-2 hover:scale-110 cursor-pointer' />
                        <h2 className='font-medium'>{brand.name}</h2>
                    </div>
                ))}
                
            </div>
          
        </div>
    )
}

export default Brands