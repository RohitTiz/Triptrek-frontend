// PackageDetail.jsx (FULLY FIXED VERSION)
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Check,
  Star,
  Clock,
  Users,
  Calendar,
  Shield,
  AlertCircle,
  ArrowRight,
  Tag,
  Share2,
  Heart,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CreditCard,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { packages } from "../data/packages";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const pkg = packages.find((p) => p.id === id);

  // Dynamic images from data file (gallery array)
  const images =
    pkg?.gallery && pkg.gallery.length > 0
      ? [pkg.image, ...pkg.gallery]
      : [pkg?.image];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleProceedToPayment = () => {
    navigate(`/package/${pkg.id}/payment`, {
      state: {
        packageId: pkg.id,
        packageName: pkg.name,
        basePrice: pkg.price,
        travelers,
        selectedDate: selectedDate || new Date().toISOString().split("T")[0],
        totalAmount: calculateTotalAmount(),
        image: pkg.image,
        type: "package",
      },
    });
  };

  const calculateTotalAmount = () => {
    let total = pkg.price * travelers;
    if (appliedCoupon) {
      total = total - (total * appliedCoupon.discount) / 100;
    }
    return total * 1.18;
  };

  const applyCoupon = () => {
    if (couponCode === "SUMMER15") {
      setAppliedCoupon({
        code: "SUMMER15",
        discount: 15,
      });
    } else {
      alert("Invalid coupon code");
    }
  };

  if (!pkg) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">
            Package not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:text-blue-700 sm:text-base"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6 sm:gap-3">
              {pkg.popular && (
                <span className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-1.5 sm:text-sm">
                  Most Popular
                </span>
              )}
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                {pkg.duration}
              </span>
            </div>
            <h1 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              {pkg.name}
            </h1>
            <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:mb-8 sm:text-base lg:text-lg">
              {pkg.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= Math.floor(pkg.rating) ? "text-amber-400 fill-current" : "text-gray-400"}`}
                  />
                ))}
                <span className="text-sm text-white sm:text-base">
                  {pkg.rating} ({pkg.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 sm:p-3">
                  <Share2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </button>
                <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 sm:p-3">
                  <Heart className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6 overflow-hidden rounded-2xl bg-white shadow-xl sm:mb-8">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/3] lg:aspect-[16/9]">
                <img
                  src={images[currentImageIndex]}
                  alt="Main"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-3 top-1/2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition-all hover:bg-white sm:p-2"
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev + 1) % images.length)
                  }
                  className="absolute right-3 top-1/2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition-all hover:bg-white sm:p-2"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-3 sm:gap-2 sm:p-4">
  {images.map((img, idx) => (
    <button
      key={idx}
      onClick={() => setCurrentImageIndex(idx)}
      className={`overflow-hidden rounded-lg aspect-square bg-gray-100 ${currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''}`}
    >
      <img
        src={img}
        alt={`Gallery ${idx + 1}`}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=400&fit=crop';
        }}
      />
    </button>
  ))}
</div>
            </div>

            {/* Features */}
            <div className="mb-6 rounded-2xl bg-white p-4 shadow-xl sm:mb-8 sm:p-6 lg:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                Package Highlights
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {pkg.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-all hover:bg-gray-100 sm:p-4"
                  >
                    <Check className="h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" />
                    <span className="text-sm font-medium text-gray-800 sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-8 sm:gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
                  What's Included
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {(pkg.inclusions || []).map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:h-6 sm:w-6">
                        <Check className="h-3 w-3 text-emerald-600 sm:h-3.5 sm:w-3.5" />
                      </div>
                      <span className="text-sm text-gray-700 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                <h3 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
                  What's Not Included
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {(pkg.exclusions || []).map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:h-6 sm:w-6">
                        <AlertCircle className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5" />
                      </div>
                      <span className="text-sm text-gray-700 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Price Card */}
            <div className="rounded-2xl bg-white p-4 shadow-2xl sm:p-6 lg:sticky lg:top-24">
              <div className="mb-4 text-center sm:mb-6">
                <div className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                  {formatPrice(pkg.price)}
                </div>
                <div className="text-xs text-gray-500 sm:text-sm">
                  per person
                </div>
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
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                />
              </div>

              {/* Travelers */}
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
                  <span className="text-sm font-semibold sm:text-base">
                    {travelers} persons
                  </span>
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
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
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
                  <span>{formatPrice(pkg.price * travelers)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-xs text-emerald-600 sm:text-sm">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>
                      -
                      {formatPrice(
                        (pkg.price * travelers * appliedCoupon.discount) / 100,
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
                  <span>Taxes & Fees (18%)</span>
                  <span>
                    {formatPrice(
                      pkg.price *
                        travelers *
                        (appliedCoupon
                          ? (100 - appliedCoupon.discount) / 100
                          : 1) *
                        0.18,
                    )}
                  </span>
                </div>
                <div className="border-t pt-2 sm:pt-3">
                  <div className="flex justify-between text-base font-bold sm:text-lg">
                    <span>Total Amount</span>
                    <span>{formatPrice(calculateTotalAmount())}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg sm:py-4 sm:text-base"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Proceed to Payment</span>
              </button>

              <div className="mt-3 text-center text-xs text-gray-500 sm:mt-4 sm:text-sm">
                Free cancellation • 24/7 support • Best price guarantee
              </div>
            </div>

            {/* Support Card */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                <Shield className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                  Book with Confidence
                </h4>
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
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;
