import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Destinations from '../components/Destinations'
import Packages from '../components/Packages'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const HomePage = () => {
  const location = useLocation()

  useEffect(() => {
    // Handle hash navigation on homepage
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
          })
        }, 100)
      }
    }
  }, [location])

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <section id="destinations">
        <Destinations />
      </section>
      <section id="packages">
        <Packages />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      {/* Add missing sections for other hash links */}
      <section id="about" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl lg:text-4xl">About Incredible India</h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 sm:text-base lg:text-lg">
            India is a land of ancient traditions, vibrant culture, and breathtaking landscapes. 
            From the snow-capped Himalayas to the sun-kissed beaches of Goa, experience the diversity 
            that makes India truly incredible.
          </p>
        </div>
      </section>
      <section id="contact" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl lg:text-4xl">Contact Us</h2>
          <p className="mx-auto max-w-3xl text-center text-sm text-gray-600 sm:text-base lg:text-lg">
            Have questions? We're here to help you plan your perfect Indian adventure.
          </p>
        </div>
      </section>
      
    </div>
  )
}

export default HomePage