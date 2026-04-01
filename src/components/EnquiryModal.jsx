import { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import api from '../services/api';

const EnquiryModal = ({ isOpen, onClose, itemName, itemType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await api.submitEnquiry({
        ...formData,
        itemName,
        itemType
      });

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
          setFormData({ name: '', email: '', phone: '', address: '', message: '' });
          setFieldErrors({});
        }, 2000);
      } else {
        setError(response.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      console.error('Enquiry error:', err);
      setError(err.message || 'Network error. Make sure backend is running on port 8080');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">Request Enquiry</h2>
            <p className="text-xs text-gray-500 sm:text-sm">
              For: <span className="font-medium text-blue-600">{itemName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
            disabled={loading}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="you@example.com"
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                    fieldErrors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  placeholder="9876543210"
                  disabled={loading}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">10-digit Indian mobile number</p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your full address (optional)"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Any special requirements? (optional)"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-3.5 w-3.5 text-green-600" />
                <span>Need help? Call us: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-green-600" />
                <span>support@triptrek.com</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Enquiry</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Enquiry Submitted!</h3>
            <p className="text-sm text-gray-600">
              We'll get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;