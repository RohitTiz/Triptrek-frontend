// src/pages/UnifiedDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin, Calendar, Star, Users, Clock, Shield,
  Check, ArrowRight, Heart, Share2, Compass,
  ChevronLeft, ChevronRight, CreditCard, Tag,
  AlertCircle, Phone, Mail, MessageCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnquiryModal from '../components/EnquiryModal';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';

const UnifiedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Detect if it's a destination or package based on URL path
  const isDestination = location.pathname.includes('/destination/');
  const item = isDestination
    ? destinations.find(d => d.id === id)
    : packages.find(p => p.id === id);

  const images = [
    item?.image,
    'https://images.unsplash.com/photo-1593693399741-6e8ac64b8a3d?w=1200&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleProceedToPayment = () => {
    if (isDestination) {
      // For destinations, find a related package or just navigate to packages
      const relatedPackage = packages.find(p => p.destinations?.includes(id));
      if (relatedPackage) {
        navigate(`/package/${relatedPackage.id}/payment`, {
          state: {
            packageId: relatedPackage.id,
            packageName: relatedPackage.name,
            basePrice: relatedPackage.price,
            travelers,
            selectedDate: selectedDate || new Date().toISOString().split('T')[0],
            totalAmount: calculateTotalAmount(relatedPackage.price),
            image: item.image,
            type: 'package'
          }
        });
      } else {
        navigate('/packages');
      }
    } else {
      navigate(`/package/${item.id}/payment`, {
        state: {
          packageId: item.id,
          packageName: item.name,
          basePrice: item.price,
          travelers,
          selectedDate: selectedDate || new Date().toISOString().split('T')[0],
          totalAmount: calculateTotalAmount(item.price),
          image: item.image,
          type: 'package'
        }
      });
    }
  };

  const calculateTotalAmount = (price) => {
    let total = price * travelers;
    if (appliedCoupon) {
      total = total - (total * appliedCoupon.discount / 100);
    }
    return total * 1.18;
  };

  const applyCoupon = () => {
    if (couponCode === 'SUMMER15') {
      setAppliedCoupon({
        code: 'SUMMER15',
        discount: 15
      });
    } else if (couponCode === 'WELCOME10') {
      setAppliedCoupon({
        code: 'WELCOME10',
        discount: 10
      });
    } else {
      alert('Invalid coupon code. Try SUMMER15 or WELCOME10');
    }
  };

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 sm:mb-6 sm:h-20 sm:w-20">
            <Compass className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10" />
          </div>
          <h1 className="mb-3 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl">Item not found</h1>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 sm:px-6 sm:py-3 sm:text-base"
          >
            <span>Go to Home</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-6 sm:gap-3">
              {item.popular && (
                <span className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-1.5 sm:text-sm">
                  Most Popular
                </span>
              )}
              {item.difficulty && (
                <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-1.5 sm:text-sm ${
                  item.difficulty === 'Easy' ? 'bg-emerald-500' :
                  item.difficulty === 'Moderate' ? 'bg-amber-500' : 'bg-rose-500'
                }`}>
                  {item.difficulty} Level
                </span>
              )}
              {item.season && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                  {item.season}
                </span>
              )}
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                {item.duration}
              </span>
            </div>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              {item.name}
            </h1>
            <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:mb-8 sm:text-base lg:text-lg">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= Math.floor(item.rating) ? 'text-amber-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
                <span className="text-sm font-medium text-white sm:text-base">
                  {item.rating} <span className="text-blue-200">({item.reviews} reviews)</span>
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 sm:p-3">
                  <Share2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </button>
                <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 sm:p-3">
                  <Heart className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2 sm:space-y-8">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/3] lg:aspect-[16/9]">
                <img
                  src={images[currentImageIndex]}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-105 sm:p-3"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-105 sm:p-3"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-3 sm:gap-2 sm:p-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`overflow-hidden rounded-lg ${currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="h-16 w-full object-cover transition-transform hover:scale-105 sm:h-20"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights / Features Section */}
            {(item.highlights || item.features) && (
              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                  {isDestination ? 'Must-Experience Highlights' : 'Package Highlights'}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  {(item.highlights || item.features || []).map((highlight, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-white p-3 transition-all hover:shadow-md hover:-translate-y-1 sm:p-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 sm:h-12 sm:w-12">
                        <Compass className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 sm:text-base">
                          {highlight}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions (for packages) */}
            {(item.inclusions || item.exclusions) && (
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                {item.inclusions && (
                  <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                    <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">What's Included</h3>
                    <ul className="space-y-3 sm:space-y-4">
                      {item.inclusions.map((inc, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-6 sm:w-6">
                            <Check className="h-3 w-3 text-emerald-600 sm:h-3.5 sm:w-3.5" />
                          </div>
                          <span className="text-sm text-gray-700 sm:text-base">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.exclusions && (
                  <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                    <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">What's Not Included</h3>
                    <ul className="space-y-3 sm:space-y-4">
                      {item.exclusions.map((exc, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:h-6 sm:w-6">
                            <AlertCircle className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5" />
                          </div>
                          <span className="text-sm text-gray-700 sm:text-base">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6">
              {/* Price & Booking Card */}
              <div className="rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
                <div className="mb-4 text-center sm:mb-6">
                  <div className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                    {formatPrice(item.price)}
                  </div>
                  <div className="text-xs text-gray-500 sm:text-sm">per person</div>
                </div>

                {/* Date Selection */}
                <div className="mb-3 sm:mb-4">
                  <label className="mb-1.5 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <Calendar className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3"
                  />
                </div>

                {/* Travelers Counter */}
                <div className="mb-3 sm:mb-4">
                  <label className="mb-1.5 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <Users className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                    Travelers
                  </label>
                  <div className="flex items-center justify-between rounded-lg border border-gray-300 p-1">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 sm:h-10 sm:w-10"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold sm:text-base">{travelers} persons</span>
                    <button
                      onClick={() => setTravelers(Math.min(15, travelers + 1))}
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 sm:h-10 sm:w-10"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-4 sm:mb-6">
                  <label className="mb-1.5 flex items-center text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                    <Tag className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                    Coupon Code
                  </label>
                  <div className="flex gap-1.5 sm:gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="SUMMER15"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3"
                    />
                    <button
                      onClick={applyCoupon}
                      className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 sm:px-4 sm:py-3 sm:text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-1 text-xs text-emerald-600 sm:mt-2 sm:text-sm">
                      {appliedCoupon.discount}% discount applied!
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="mb-4 space-y-2 sm:mb-6 sm:space-y-3">
                  <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
                    <span>Base Price ({travelers} persons)</span>
                    <span>{formatPrice(item.price * travelers)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-emerald-600 sm:text-sm">
                      <span>Discount ({appliedCoupon.discount}%)</span>
                      <span>-{formatPrice((item.price * travelers * appliedCoupon.discount) / 100)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
                    <span>Taxes & Fees (18%)</span>
                    <span>{formatPrice((item.price * travelers * (appliedCoupon ? (100 - appliedCoupon.discount) / 100 : 1)) * 0.18)}</span>
                  </div>
                  <div className="border-t pt-2 sm:pt-3">
                    <div className="flex justify-between text-base font-bold sm:text-lg">
                      <span>Total Amount</span>
                      <span>{formatPrice(calculateTotalAmount(item.price))}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleProceedToPayment}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg sm:py-4 sm:text-base"
                  >
                    <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Proceed to Payment</span>
                  </button>

                  {/* Enquiry Button */}
                  <button
                    onClick={() => setIsEnquiryOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-blue-600 bg-white py-3 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 sm:py-4 sm:text-base"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Make an Enquiry</span>
                  </button>
                </div>

                <div className="mt-3 text-center text-xs text-gray-500 sm:mt-4 sm:text-sm">
                  Free cancellation • 24/7 support • Best price guarantee
                </div>
              </div>

              {/* Support Card */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <Shield className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                  <h4 className="text-sm font-bold text-gray-900 sm:text-base">Book with Confidence</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                    <span>Best Price Guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                    <span>24/7 Customer Support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                    <span>Flexible Cancellation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                    <span>Certified Local Guides</span>
                  </li>
                </ul>

                <div className="mt-4 border-t border-blue-200 pt-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                    <Phone className="h-3.5 w-3.5 text-blue-600" />
                    <span>Need help? Call us: +91 98765 43210</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                    <Mail className="h-3.5 w-3.5 text-blue-600" />
                    <span>support@triptrek.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        itemName={item.name}
        itemType={isDestination ? 'Destination' : 'Package'}
      />

      <Footer />
    </div>
  );
};

export default UnifiedDetail;