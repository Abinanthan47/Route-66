import { ArrowRightCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import Search from './Search';

function Hero() {
  return (
    <div className="md:px-5">
      <div
        className="w-full h-screen flex flex-col bg-[url('/bgy.jpg')] md:justify-center items-center border-black border md:rounded-2xl"
        style={{
         
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="hidden md:block absolute bg-[url('/bgy1.jpg')] inset-0"
          style={{
         
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="flex flex-col mt-48 md:mt-20 text-center md:mix-blend-exclusion md:text-white">
          <h3 className="text-2xl font-medium md:text-3xl">Find your Dream</h3>
          <h2 className="text-5xl font-bold md:text-7xl">Vintage Cars</h2>
          <Link to={'/collection'}>
            <Button className="mt-8 px-3 border border-black rounded-full text-md md:hidden">
              Collections <ArrowRightCircleIcon />
            </Button>
          </Link>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default Hero;
