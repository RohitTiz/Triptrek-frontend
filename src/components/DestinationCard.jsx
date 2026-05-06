// components/DestinationCard.jsx
import { MapPin, Calendar, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'from-emerald-500 to-emerald-600';
      case 'Moderate': return 'from-amber-500 to-amber-600';
      case 'Challenging': return 'from-rose-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <Link to={`/destination/${destination.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Image Section - FIXED HEIGHT ADDED */}
        <div className="relative h-56 overflow-hidden bg-gray-100">
  <img 
    src={destination.image} 
    alt={destination.name}
    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
    onError={(e) => {
      e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop';
    }}
  />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Price Tag */}
          <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
            <div className="rounded-full bg-white/95 px-3 py-1.5 backdrop-blur-sm shadow-lg sm:px-4 sm:py-2">
              <span className="text-sm font-bold text-gray-900 sm:text-base">{formatPrice(destination.price)}</span>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-bold text-white sm:text-2xl">{destination.name}</h3>
              <div className={`self-start rounded-full bg-gradient-to-r ${getDifficultyColor(destination.difficulty)} px-3 py-1 text-xs font-semibold text-white sm:self-auto`}>
                {destination.difficulty}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          {/* Description */}
          <p className="mb-4 line-clamp-2 text-gray-600 sm:mb-6">{destination.description}</p>

          {/* Stats Row */}
          <div className="mb-4 grid grid-cols-3 gap-3 border-b border-gray-100 pb-4 sm:mb-6 sm:gap-4 sm:pb-6">
            <div className="flex flex-col items-center">
              <div className="mb-1.5 rounded-full bg-blue-50 p-2 sm:mb-2">
                <Calendar className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs font-semibold text-gray-900 sm:text-sm">{destination.duration}</span>
              <span className="text-xs text-gray-500">Duration</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-1.5 rounded-full bg-amber-50 p-2 sm:mb-2">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-current sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs font-semibold text-gray-900 sm:text-sm">{destination.rating}/5</span>
              <span className="text-xs text-gray-500">Rating</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="mb-1.5 rounded-full bg-purple-50 p-2 sm:mb-2">
                <Users className="h-3.5 w-3.5 text-purple-600 sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs font-semibold text-gray-900 sm:text-sm">{destination.reviews}</span>
              <span className="text-xs text-gray-500">Reviews</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4 sm:mb-6">
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <span className="text-xs font-semibold text-gray-700 sm:text-sm">Highlights</span>
              {destination.highlights.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{destination.highlights.length - 2} more
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {destination.highlights.slice(0, 2).map((highlight, index) => (
                <span 
                  key={index}
                  className="rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 sm:px-3 sm:py-1.5"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Season & CTA */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 px-3 py-1.5">
                <span className="text-sm font-semibold text-emerald-700">{destination.season}</span>
              </div>
            </div>
            <button className="group/btn flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2.5 text-white transition-all duration-300 hover:from-gray-800 hover:to-gray-700 sm:px-5">
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;