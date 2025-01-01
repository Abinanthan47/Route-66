import { ArrowRightCircleIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './components/ui/button'
import Search from './Search'

function Hero() {
  return (
    <div className='md:px-5 '>
      <div className='bg-heromob border-black border md:bg-hero  md:rounded-2xl w-full h-screen flex flex-col md:justify-center items-center'>
        <div className='flex flex-col  mt-48 md:mt-20 md:mix-blend-exclusion md:text-white text-center'>
          <h3 className='text-2xl font-medium md:text-3xl'>Find your Dream</h3>
          <h2 className='text-5xl font-bold md:text-7xl'>Vintage Cars</h2>
          <Link to={'/collection'} className=''>
            <Button  className=' mt-8 px-3 border border-black rounded-full text-md md:hidden'>Collections <ArrowRightCircleIcon /> </Button>
          </Link>
        </div>
        <Search />
      </div>
    </div>
  )
}

export default Hero
