// components/PackageCard.jsx
import { Check, Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link to={`/package/${pkg.id}`} className="group block">
      <div className={`relative overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        pkg.popular ? 'border-blue-500/20 ring-1 ring-blue-500/10' : 'border-gray-200'
      }`}>
        {pkg.popular && (
          <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
            <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-lg sm:px-3 sm:py-1.5">
              Most Popular
            </span>
          </div>
        )}

        {/* Image Section - FIXED HEIGHT ADDED */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={pkg.image} 
            alt={pkg.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-xl line-clamp-1">{pkg.name}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">{pkg.description}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl font-bold text-gray-900 sm:text-2xl">{formatPrice(pkg.price)}</div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm sm:gap-4 sm:mb-5">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4" />
              <span className="text-xs text-gray-600 sm:text-sm">{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4" />
              <span className="text-xs text-gray-600 sm:text-sm">12-15</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-current sm:h-4 sm:w-4" />
              <span className="text-xs text-gray-600 sm:text-sm">{pkg.rating} ({pkg.reviews})</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4 grid grid-cols-2 gap-1.5 sm:mb-6 sm:gap-2">
            {pkg.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <Check className="h-3 w-3 flex-shrink-0 text-emerald-500 sm:h-3.5 sm:w-3.5" />
                <span className="truncate text-xs text-gray-700 sm:text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="group/btn flex w-full items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 px-3 py-2.5 text-white transition-all duration-300 hover:from-gray-800 hover:to-gray-700 sm:px-4 sm:py-3">
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;