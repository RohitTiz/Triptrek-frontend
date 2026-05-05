import { X, Mail, User as UserIcon, Lock, Globe, Facebook, Instagram, Twitter, Github } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', password: '' })
      setError('')
      setSuccess('')
    }
  }, [isOpen])

  if (!isOpen) return null

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error on input change
    setSuccess('') // Clear success on input change
  }

  // Handle Google Login
  const handleGoogleLogin = () => {
    // Hardcode backend URL for now
    const API_URL = 'https://triptrek-xpgq.onrender.com'
    window.location.href = `${API_URL}/api/auth/google`;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password }

      // Hardcode backend URL - FIX FOR NOW
      const API_URL = 'https://triptrek-xpgq.onrender.com'
      
      console.log('Sending request to:', `${API_URL}${endpoint}`)
      console.log('Payload:', payload)

      const response = await axios.post(`${API_URL}${endpoint}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      })

      console.log('Response received:', response.data)

      if (response.data.success) {
        const message = isLogin ? 'Login successful!' : 'Registration successful!'
        setSuccess(message)
        
        // Save token to localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        console.log('User data saved to localStorage')
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          window.location.reload() // Refresh to update auth state
        }, 2000)
      }
    } catch (error) {
      console.error('Full error:', error)
      console.error('Error response:', error.response)
      
      let errorMessage = ''
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || 
          (isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.')
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'Server is not responding. Please check your internet connection.'
      } else {
        // Something else happened
        errorMessage = 'An error occurred. Please try again.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl sm:max-w-md">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Globe className="h-6 w-6 text-saffron-500 sm:h-7 sm:w-7" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 sm:h-4 sm:w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 sm:text-base">
                {isLogin ? 'Welcome Back' : 'Join Trip Trek India'}
              </h2>
              <p className="text-xs text-gray-500">
                {isLogin ? 'Sign in to continue' : 'Create your account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="px-4 py-4 sm:px-6 sm:py-5">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 sm:mb-4 sm:p-3 sm:text-sm animate-fade-in">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-3 rounded-lg border border-green-200 bg-green-50 p-2.5 text-xs text-green-600 sm:mb-4 sm:p-3 sm:text-sm animate-fade-in">
              {success}
            </div>
          )}

          {/* Google Button - Primary */}
          <button 
            onClick={handleGoogleLogin}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 sm:mb-4 sm:gap-3 sm:px-4 sm:py-3 sm:text-base"
            disabled={loading}
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Social Grid - Compact */}
          <div className="mb-3 grid grid-cols-4 gap-1.5 sm:mb-4 sm:gap-2">
            <button 
              className="flex items-center justify-center rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100 sm:p-2.5"
              aria-label="Login with Facebook"
            >
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
              className="flex items-center justify-center rounded-lg bg-pink-50 p-2 text-pink-600 transition-colors hover:bg-pink-100 sm:p-2.5"
              aria-label="Login with Instagram"
            >
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
              className="flex items-center justify-center rounded-lg bg-sky-50 p-2 text-sky-600 transition-colors hover:bg-sky-100 sm:p-2.5"
              aria-label="Login with Twitter"
            >
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
              className="flex items-center justify-center rounded-lg bg-gray-800 p-2 text-white transition-colors hover:bg-gray-900 sm:p-2.5"
              aria-label="Login with GitHub"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-3 sm:my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-xs text-gray-500 sm:px-3 sm:text-sm">Or use email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700 sm:text-sm">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-saffron-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:py-2.5 sm:pl-10 sm:pr-4"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 sm:text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-saffron-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:py-2.5 sm:pl-10 sm:pr-4"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 sm:text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-saffron-500 disabled:bg-gray-100 disabled:cursor-not-allowed sm:py-2.5 sm:pl-10 sm:pr-4"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center gap-1.5">
                  <input 
                    type="checkbox" 
                    className="h-3.5 w-3.5 rounded border-gray-300 text-saffron-600 focus:ring-saffron-500 sm:h-4 sm:w-4" 
                    disabled={loading}
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="font-medium text-saffron-600 hover:text-saffron-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-saffron-600 hover:to-saffron-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-saffron-500 disabled:hover:to-saffron-600 disabled:hover:shadow-lg sm:py-3 sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-4 text-center text-xs sm:mt-5 sm:text-sm">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setSuccess('')
                setFormData({ name: '', email: '', password: '' })
              }}
              className="ml-1 font-medium text-saffron-600 hover:text-saffron-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-center text-xs text-gray-500">
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal