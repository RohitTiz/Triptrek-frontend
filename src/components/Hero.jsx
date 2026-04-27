import { Play, Shield, Star, Users, Globe, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
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
  )
}

export default Hero