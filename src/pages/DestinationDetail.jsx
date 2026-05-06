// pages/DestinationDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Star,
  Users,
  Clock,
  Shield,
  Check,
  ArrowRight,
  Heart,
  Share2,
  Compass,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { destinations } from "../data/destinations";
import { packages } from "../data/packages";

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const destination = destinations.find((d) => d.id === id);
  const relatedPackages = packages.filter(
    (pkg) => pkg.destinations && pkg.destinations.includes(id),
  );

  // Dynamic images from data file (gallery array)
  const images =
    destination?.gallery && destination.gallery.length > 0
      ? [destination.image, ...destination.gallery]
      : [destination?.image];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBookPackage = (pkg) => {
    navigate(`/package/${pkg.id}/payment`, {
      state: {
        packageId: pkg.id,
        packageName: pkg.name,
        destinationId: id,
        destinationName: destination.name,
        basePrice: pkg.price,
        travelers: 2,
        selectedDate: new Date().toISOString().split("T")[0],
        totalAmount: pkg.price * 2 * 1.18,
        image: pkg.image,
      },
    });
  };

  if (!destination) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 sm:mb-6 sm:h-20 sm:w-20">
            <Compass className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10" />
          </div>
          <h1 className="mb-3 text-xl font-bold text-gray-800 sm:mb-4 sm:text-2xl">
            Destination not found
          </h1>
          <a
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:from-blue-700 hover:to-purple-700 sm:px-6 sm:py-3 sm:text-base"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
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
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 pt-28 sm:pt-32 lg:pt-36">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap gap-2 sm:mb-6 sm:gap-3">
              <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:py-1.5 sm:text-sm">
                {destination.difficulty} Level
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                {destination.season}
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                {destination.duration}
              </span>
            </div>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              {destination.name}
            </h1>
            <p className="mb-6 max-w-3xl text-sm text-blue-100 sm:mb-8 sm:text-base lg:text-lg">
              {destination.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= Math.floor(destination.rating) ? "text-amber-400 fill-current" : "text-gray-400"}`}
                  />
                ))}
                <span className="text-sm font-medium text-white sm:text-base">
                  {destination.rating}{" "}
                  <span className="text-blue-200">
                    ({destination.reviews} reviews)
                  </span>
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
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <button
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-105 sm:p-3"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) => (prev + 1) % images.length)
                  }
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

            {/* Experience Highlights */}
            <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
                Must-Experience Highlights
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {destination.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-white p-3 transition-all hover:shadow-md hover:-translate-y-1 sm:p-4 sm:gap-4"
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

            {/* Available Packages */}
            {relatedPackages.length > 0 && (
              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      Available Packages
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
                      Choose from curated experiences for{" "}
                      {destination.name.split(",")[0]}
                    </p>
                  </div>
                  <span className="mt-2 inline-block rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-2 py-1 text-xs font-semibold text-blue-700 sm:mt-0 sm:px-3 sm:text-sm">
                    {relatedPackages.length} packages
                  </span>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="rounded-xl border border-gray-200 p-3 transition-all hover:border-blue-300 hover:shadow-md sm:p-4 lg:p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3">
                            <h3 className="text-base font-bold text-gray-900 sm:text-lg lg:text-xl">
                              {pkg.name}
                            </h3>
                            {pkg.popular && (
                              <span className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-2 py-0.5 text-xs font-semibold text-white sm:px-3 sm:py-1">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
                            {pkg.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-gray-400 sm:h-4 sm:w-4" />
                              <span>{pkg.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 fill-current text-amber-500 sm:h-4 sm:w-4" />
                              <span>
                                {pkg.rating} ({pkg.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-left sm:mt-0 sm:text-right">
                          <div className="mb-1 text-lg font-bold text-gray-900 sm:mb-2 lg:text-xl">
                            {formatPrice(pkg.price)}
                          </div>
                          <button
                            onClick={() => handleBookPackage(pkg)}
                            className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg sm:px-4 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3"
                          >
                            <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                            <span>Book Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6">
              {/* Quick Info Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6">
                <h3 className="mb-4 border-b border-gray-100 pb-3 text-lg font-bold text-gray-900 sm:mb-6 sm:pb-4 sm:text-xl">
                  Destination Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2 sm:p-3">
                      <Calendar className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        Trip Duration
                      </div>
                      <div className="text-sm font-semibold text-gray-900 sm:text-base">
                        {destination.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-50 p-2 sm:p-3">
                      <Users className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        Difficulty Level
                      </div>
                      <div
                        className={`text-sm font-semibold px-2 py-0.5 rounded-full inline-block sm:px-3 sm:py-1 ${
                          destination.difficulty === "Easy"
                            ? "bg-emerald-100 text-emerald-800"
                            : destination.difficulty === "Moderate"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {destination.difficulty}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-rose-50 p-2 sm:p-3">
                      <Star className="h-5 w-5 fill-current text-rose-600 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        Traveler Rating
                      </div>
                      <div className="text-sm font-semibold text-gray-900 sm:text-base">
                        {destination.rating}/5 from {destination.reviews}{" "}
                        reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Starting Price */}
                <div className="mt-6 border-t border-gray-100 pt-4 sm:mt-8 sm:pt-6">
                  <div className="mb-4 text-center">
                    <div className="mb-0.5 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {formatPrice(destination.price)}
                    </div>
                    <div className="text-xs text-gray-500 sm:text-sm">
                      Starting price per person
                    </div>
                  </div>

                  {relatedPackages.length > 0 ? (
                    <button
                      onClick={() => handleBookPackage(relatedPackages[0])}
                      className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-center text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg sm:py-4 sm:text-base"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Book Starting Package</span>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/packages")}
                      className="w-full rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 py-3 text-center text-sm font-semibold text-white transition-all hover:from-gray-800 hover:to-gray-700 sm:py-4 sm:text-base"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>View All Packages</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Safety Info */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm sm:p-6">
                <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <div className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 p-1.5 sm:p-2">
                    <Shield className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 sm:text-base">
                    Travel With Confidence
                  </h4>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Certified local guides & expert hosts",
                    "24/7 emergency support during trip",
                    "All equipment quality checked",
                    "Medical & evacuation plans",
                    "Regular safety briefings",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500 sm:h-4 sm:w-4" />
                      <span className="text-xs text-gray-700 sm:text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
