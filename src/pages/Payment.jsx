// pages/Payment.jsx
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Lock, Shield, Check, 
  ArrowLeft, Clock, Users, Calendar,
  MapPin, Package, Tag
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { packages } from '../data/packages';
import { destinations } from '../data/destinations';

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Get package or destination details
  const pkg = packages.find(p => p.id === id);
  const destination = destinations.find(d => d.id === id);
  
  const bookingData = state || {
    packageId: pkg?.id,
    packageName: pkg?.name || destination?.name,
    basePrice: pkg?.price || destination?.price,
    travelers: 2,
    selectedDate: new Date().toISOString().split('T')[0],
    totalAmount: (pkg?.price || destination?.price || 0) * 2 * 1.18,
    image: pkg?.image || destination?.image,
    type: pkg ? 'package' : 'destination'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          bookingId: 'BOOK' + Date.now(),
          ...bookingData
        } 
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 30% KAM PADDING - pehle pt-28 ab pt-20 */}
      <div className="pt-20 sm:pt-22 lg:pt-24">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <button 
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 sm:mb-6 sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Back</span>
              </button>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Complete Your Booking</h1>
              <p className="text-sm text-gray-600 sm:text-base">Secure payment for {bookingData.packageName}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {/* Left Column - Payment Form */}
              <div className="lg:col-span-2">
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-xl sm:mb-8 sm:p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Personal Details</h2>
                  <form onSubmit={handlePayment}>
                    <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-6 sm:gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>

                    <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Payment Method</h2>
                    
                    <div className="mb-4 sm:mb-6">
                      <div className="mb-3 flex gap-2 sm:mb-4 sm:gap-4">
                        {['card', 'upi', 'netbanking'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`flex-1 rounded-lg border-2 p-3 text-center text-sm transition-all sm:p-4 sm:text-base ${
                              paymentMethod === method 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {method === 'card' ? 'Credit/Debit Card' : 
                             method === 'upi' ? 'UPI' : 'Net Banking'}
                          </button>
                        ))}
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:mb-2 sm:text-sm">
                                CVV
                              </label>
                              <input
                                type="password"
                                required
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:px-4 sm:py-3 sm:text-base"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg sm:py-4 sm:text-base"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Pay {formatPrice(bookingData.totalAmount)}</span>
                      </div>
                    </button>
                  </form>
                </div>

                {/* Security Info */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                    <Shield className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                    <h3 className="text-sm font-bold text-gray-900 sm:text-base">Secure Payment</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                    {['256-bit SSL', 'PCI DSS', '3D Secure', 'No Card Storage'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" />
                        <span className="text-xs text-gray-700 sm:text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24">
                  {/* Order Summary */}
                  <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                    <h2 className="mb-4 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">Booking Summary</h2>
                    
                    {/* Package/Destination Info */}
                    <div className="mb-4 flex items-center gap-3 sm:mb-6">
                      <img 
                        src={bookingData.image} 
                        alt={bookingData.packageName}
                        className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">{bookingData.packageName}</h3>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600 sm:text-sm">
                          {bookingData.type === 'package' ? (
                            <Package className="h-3.5 w-3.5" />
                          ) : (
                            <MapPin className="h-3.5 w-3.5" />
                          )}
                          <span>{bookingData.type === 'package' ? 'Package' : 'Destination'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="mb-3 space-y-2 sm:mb-4 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Date</span>
                        </div>
                        <span className="font-medium">{bookingData.selectedDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users className="h-3.5 w-3.5" />
                          <span>Travelers</span>
                        </div>
                        <span className="font-medium">{bookingData.travelers} persons</span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="mb-4 space-y-2 border-t border-gray-100 pt-3 sm:mb-6 sm:space-y-3 sm:pt-4">
                      <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
                        <span>Base Price</span>
                        <span>{formatPrice(bookingData.basePrice * bookingData.travelers)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
                        <span>Taxes & Fees (18%)</span>
                        <span>{formatPrice(bookingData.basePrice * bookingData.travelers * 0.18)}</span>
                      </div>
                      <div className="border-t pt-2 sm:pt-3">
                        <div className="flex justify-between text-base font-bold sm:text-lg">
                          <span>Total Amount</span>
                          <span>{formatPrice(bookingData.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Guarantee Badges */}
                    <div className="space-y-1.5 border-t border-gray-100 pt-3 sm:space-y-2 sm:pt-4">
                      {[
                        'Free cancellation up to 7 days',
                        '24/7 customer support',
                        'Best price guaranteed',
                        'Instant confirmation'
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500 sm:h-4 sm:w-4" />
                          <span className="text-xs text-gray-700 sm:text-sm">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6">
                    <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                      <Clock className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 sm:text-base">Need Help?</h4>
                        <p className="text-xs text-gray-600 sm:text-sm">24/7 customer support</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <a href="tel:+919876543210" className="text-sm font-medium text-blue-600 hover:text-blue-700 sm:text-base">
                        +91 7827716233
                      </a>
                      <p className="mt-0.5 text-xs text-gray-500 sm:mt-1 sm:text-sm">triptrek.india04@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;