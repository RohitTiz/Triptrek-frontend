import { Link } from 'react-router-dom'
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, IndianRupee, Award, Shield } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Indian Destinations', href: '/#destinations' },
    { label: 'Tour Packages', href: '/#packages' },
    { label: 'About India', href: '#about' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Travel Blog', href: '#blog' }
  ]

  const indianDestinations = [
    { label: 'Kakani Lake', href: '/destination/kakani-lake' },
    { label: 'Chakrata', href: '/destination/chakrata' },
    { label: 'Chau Dam', href: '/destination/chau-dam' },
    { label: 'Kedarnath', href: '/destination/kedarnath' },
    { label: 'Tungnath', href: '/destination/tungnath' }
  ]

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/TripTrekIndia', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/TripTrekIndia', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/TripTrekIndia', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/TripTrekIndia', label: 'YouTube' }
  ]

  // Indian certification badges
  const certifications = [
    { label: 'Ministry of Tourism Approved', icon: Award },
    { label: 'IATO Member', icon: Shield },
    { label: 'ISO Certified', icon: Shield },
    { label: 'Make in India', icon: Award }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Indian Flag Inspired Pattern */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-1/3 bg-saffron-500"></div>
          <div className="h-1/3 bg-white"></div>
          <div className="h-1/3 bg-green-500"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Certifications Banner */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h3 className="mb-4 text-center text-lg font-bold sm:mb-6 sm:text-xl lg:text-2xl">
              <span className="bg-gradient-to-r from-saffron-400 via-white to-green-400 bg-clip-text text-transparent">
                Proudly Indian, Serving Globally
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-800/50 p-3 backdrop-blur-sm sm:p-4">
                  <cert.icon className="h-4 w-4 text-saffron-400 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  <span className="text-xs font-medium sm:text-sm">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {/* Company Info */}
            <div>
              <Link to="/" className="mb-4 flex items-center gap-2 sm:mb-6">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-green-500 sm:h-10 sm:w-10">
                    <Globe className="h-4 w-4 text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </div>
                  <IndianRupee className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-600 p-0.5 text-white sm:h-4 sm:w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold sm:text-xl lg:text-2xl">
                    TripTrek India
                  </span>
                  <span className="text-xs text-gray-400 sm:text-sm">Made in India 🇮🇳</span>
                </div>
              </Link>
              <p className="mb-4 text-sm text-gray-400 sm:mb-6 sm:text-base">
                <span className="font-bold text-saffron-300">100% Indian Owned & Operated.</span> We're passionate about showcasing India's incredible diversity to the world from our Delhi headquarters.
              </p>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="h-4 w-4 text-saffron-400 sm:h-5 sm:w-5" />
                  <span className="text-sm text-gray-300 sm:text-base">TripTrek.India04@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="h-4 w-4 text-saffron-400 sm:h-5 sm:w-5" />
                  <span className="text-sm text-gray-300 sm:text-base">7827716233</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Instagram className="h-4 w-4 text-saffron-400 sm:h-5 sm:w-5" />
                  <span className="text-sm text-gray-300 sm:text-base">@TripTrekIndia</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="h-4 w-4 text-saffron-400 sm:h-5 sm:w-5" />
                  <div>
                    <span className="block text-sm text-gray-300 sm:text-base">Connaught Place</span>
                    <span className="text-xs text-gray-500 sm:text-sm">New Delhi, India 110001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 flex items-center text-base font-bold sm:mb-6 sm:text-lg lg:text-xl">
                <span className="text-saffron-400">Quick Links</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-saffron-300 sm:text-base"
                    >
                      <span className="h-1 w-1 rounded-full bg-saffron-400 transition-transform group-hover:scale-150"></span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indian Destinations */}
            <div>
              <h3 className="mb-4 flex items-center text-base font-bold sm:mb-6 sm:text-lg lg:text-xl">
                <span className="text-green-400">Our Destinations</span>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {indianDestinations.map((destination, index) => (
                  <li key={index}>
                    <Link 
                      to={destination.href}
                      className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-green-300 sm:text-base"
                    >
                      <span className="text-green-500 text-base">•</span>
                      <span>{destination.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Indian Identity */}
            <div>
              <h3 className="mb-4 text-base font-bold sm:mb-6 sm:text-lg lg:text-xl">
                <span className="bg-gradient-to-r from-saffron-400 to-green-400 bg-clip-text text-transparent">
                  Support Indian Tourism
                </span>
              </h3>
              <p className="mb-3 text-sm text-gray-400 sm:mb-4 sm:text-base">
                Join <span className="font-bold text-saffron-300">50,000+</span> travelers supporting local Indian communities through sustainable tourism.
              </p>
              <form className="space-y-3 sm:space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 sm:px-4 sm:py-3 sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-saffron-600 hover:to-saffron-700 hover:shadow-saffron-500/25 sm:py-3 sm:text-base"
                >
                  Subscribe for Indian Travel Deals
                </button>
              </form>
              
              {/* 100% Indian Assurance */}
              <div className="mt-4 border-t border-gray-800 pt-4 sm:mt-6 sm:pt-6">
                <div className="flex items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-saffron-500/10 to-green-500/10 p-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl">🇮🇳</div>
                    <p className="mt-1 text-xs text-gray-300">100% Indian Company</p>
                  </div>
                  <div className="h-6 w-px bg-gray-700 sm:h-8"></div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl">💼</div>
                    <p className="mt-1 text-xs text-gray-300">Local Guides</p>
                  </div>
                  <div className="h-6 w-px bg-gray-700 sm:h-8"></div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl">🤝</div>
                    <p className="mt-1 text-xs text-gray-300">Community First</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="mt-8 border-t border-gray-800 pt-6 sm:mt-12 sm:pt-8">
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform rounded-full bg-gray-800 p-1.5 text-gray-400 transition-colors duration-300 hover:scale-110 hover:text-saffron-300 sm:p-2"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-400 sm:text-base">
                  © {new Date().getFullYear()} TripTrek India. 🇮🇳 Made in India with Pride.
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:mt-1 sm:text-sm">Supporting Indian tourism and local communities</p>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-400 sm:gap-4 sm:text-sm">
                <a href="#" className="hover:text-saffron-300">Privacy Policy</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-saffron-300">Terms of Service</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="hover:text-saffron-300">Refund Policy</a>
              </div>
            </div>
            
            {/* Indian Pride Section */}
            <div className="mt-6 border-t border-gray-800 pt-4 sm:mt-8 sm:pt-6">
              <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-500 sm:text-sm">
                    <span className="font-bold text-saffron-400">Proud Member:</span> Indian Association of Tour Operators • Ministry of Tourism, India • Delhi Tourism
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-5 rounded-sm bg-saffron-500 sm:h-3 sm:w-6"></div>
                    <div className="h-2.5 w-5 rounded-sm bg-white sm:h-3 sm:w-6"></div>
                    <div className="h-2.5 w-5 rounded-sm bg-green-500 sm:h-3 sm:w-6"></div>
                    <span className="ml-1.5 text-xs text-gray-400 sm:ml-2 sm:text-sm">Indian Flag Colors</span>
                  </div>
                </div>
              </div>
              
              {/* Final Indian Pride Message */}
              <div className="mt-4 text-center sm:mt-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-saffron-500/10 via-white/5 to-green-500/10 px-4 py-2 sm:gap-3 sm:px-6 sm:py-3">
                  <span className="text-xl sm:text-2xl">🇮🇳</span>
                  <span className="text-sm font-medium text-gray-300 sm:text-base">Atithi Devo Bhava - The Guest is God</span>
                  <span className="text-xl sm:text-2xl">🇮🇳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer