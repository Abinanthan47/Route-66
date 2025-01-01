import Brands from './Brands'
import FeaturedCars from './FeaturedCars'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'
import Testimonials from './Testimonials'

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Brands />
            <FeaturedCars />
            <Testimonials/>
            <Footer />
        </div>
    )
}

export default Home