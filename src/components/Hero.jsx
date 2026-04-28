import { Play, Shield, Star, Users, Globe, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917827716233?text=I%20want%20to%20travel%20wooo%20hooo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Floating Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-pulse"></div>
          
          {/* Button */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl sm:h-16 sm:w-16">
            {/* WhatsApp Icon */}
            <svg 
              className="h-7 w-7 text-white sm:h-8 sm:w-8" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.086 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.55 4.128 1.513 5.874L0 24l6.336-1.657C8.057 23.193 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.8 0-3.525-.49-5.01-1.342l-.358-.207-3.766.986.998-3.66-.217-.36C3.423 15.635 2.8 13.874 2.8 12c0-5.07 4.13-9.2 9.2-9.2s9.2 4.13 9.2 9.2-4.13 9.2-9.2 9.2z"/>
            </svg>
            
            {/* Notification Badge */}
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md">
              !
            </span>
          </div>
          
          {/* Tooltip Text */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      </a>

      <section className="relative flex min-h-screen items-center justify-center pt-28 sm:pt-32 lg:pt-36">
        {/* Background Image - Changed to India-themed */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center text-white sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm sm:gap-3 sm:px-6 sm:py-3">
              <Globe className="h-4 w-4 text-saffron-300 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              <MapPin className="h-3 w-3 text-green-300 sm:h-4 sm:w-4" />
              <span className="text-base font-bold sm:text-lg">trip.trekindia</span>
              <span className="text-xs text-gray-300 sm:text-sm">• Delhi Based</span>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl sm:mb-5 lg:text-6xl xl:text-7xl">
            Discover
            <span className="block bg-gradient-to-r from-saffron-400 via-white to-green-400 bg-clip-text text-transparent">
              Incredible India
            </span>
          </h1>
          
          <p className="mx-auto mb-6 max-w-2xl text-base text-gray-200 sm:mb-8 sm:text-lg lg:max-w-3xl lg:text-xl xl:text-2xl">
            Your gateway to India's majestic wonders. From Delhi's historic streets to Goa's golden beaches, 
            experience the vibrant colors, rich culture, and unforgettable adventures.
          </p>

          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:gap-4">
            <Link to="/#destinations" className="inline-block w-full sm:w-auto">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-saffron-600 hover:to-saffron-700 sm:px-8 sm:py-4 sm:text-lg">
                <span>Explore Indian Destinations</span>
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
            <Link to="/#packages" className="inline-block w-full sm:w-auto">
              <button className="w-full rounded-full border border-white/30 bg-white/20 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30 sm:px-8 sm:py-4 sm:text-lg">
                View India Tour Packages
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-3 sm:mb-10 sm:gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-1.5 sm:mb-2">
                <Users className="h-4 w-4 text-saffron-300 sm:h-5 sm:w-5" />
                <span className="text-xl font-bold sm:text-2xl lg:text-3xl">50K+</span>
              </div>
              <p className="text-xs text-gray-300 sm:text-sm">Happy Travelers</p>
            </div>
            
            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-1.5 sm:mb-2">
                <Globe className="h-4 w-4 text-green-300 sm:h-5 sm:w-5" />
                <span className="text-xl font-bold sm:text-2xl lg:text-3xl">29+</span>
              </div>
              <p className="text-xs text-gray-300 sm:text-sm">Indian States</p>
            </div>
            
            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-1.5 sm:mb-2">
                <Star className="h-4 w-4 text-yellow-300 sm:h-5 sm:w-5" />
                <span className="text-xl font-bold sm:text-2xl lg:text-3xl">4.9</span>
              </div>
              <p className="text-xs text-gray-300 sm:text-sm">Average Rating</p>
            </div>
            
            <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 flex items-center justify-center gap-1.5 sm:mb-2">
                <Shield className="h-4 w-4 text-blue-300 sm:h-5 sm:w-5" />
                <span className="text-xl font-bold sm:text-2xl lg:text-3xl">24/7</span>
              </div>
              <p className="text-xs text-gray-300 sm:text-sm">Local Support</p>
            </div>
          </div>

          {/* Popular Indian Destinations Quick View */}
          <div className="mx-auto mb-8 max-w-5xl sm:mb-10 lg:mt-12">
            <h3 className="mb-4 text-lg font-semibold text-gray-200 sm:mb-5 sm:text-xl">Start Your Journey From Delhi</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <Link 
                to="/destination/delhi" 
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-saffron-500 to-red-600 p-0.5">
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gray-900 p-3 transition-colors group-hover:bg-gray-800 sm:p-4">
                    <MapPin className="mb-1 h-5 w-5 text-saffron-400 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    <span className="text-base font-bold text-white sm:text-lg">Delhi</span>
                    <span className="text-xs text-gray-300 sm:text-sm">Capital City</span>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/destination/agra" 
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gray-900 p-3 transition-colors group-hover:bg-gray-800 sm:p-4">
                    <span className="text-base font-bold text-white sm:text-lg">Agra</span>
                    <span className="text-xs text-gray-300 sm:text-sm">Taj Mahal</span>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/destination/jaipur" 
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-600 to-orange-500 p-0.5">
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gray-900 p-3 transition-colors group-hover:bg-gray-800 sm:p-4">
                    <span className="text-base font-bold text-white sm:text-lg">Jaipur</span>
                    <span className="text-xs text-gray-300 sm:text-sm">Pink City</span>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/destination/goa" 
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 p-0.5">
                  <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gray-900 p-3 transition-colors group-hover:bg-gray-800 sm:p-4">
                    <span className="text-base font-bold text-white sm:text-lg">Goa</span>
                    <span className="text-xs text-gray-300 sm:text-sm">Beach Paradise</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 border-t border-white/20 pt-6 sm:mt-10 sm:pt-8">
            <p className="mb-3 text-sm text-gray-300 sm:mb-4">Trusted by travelers across India</p>
            <div className="flex flex-wrap items-center justify-center gap-3 opacity-80 sm:gap-4 lg:gap-6">
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Delhi NCR</span>
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Mumbai</span>
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Bangalore</span>
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Kolkata</span>
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Chennai</span>
              <span className="text-xs font-medium text-gray-300 sm:text-sm">Hyderabad</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 lg:bottom-8">
          <div className="animate-bounce">
            <div className="mx-auto h-6 w-0.5 bg-gradient-to-b from-saffron-400 to-green-400 sm:h-8"></div>
            <div className="mx-auto mt-1.5 h-6 w-0.5 bg-gradient-to-b from-saffron-400/50 to-green-400/50 sm:mt-2 sm:h-8"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero