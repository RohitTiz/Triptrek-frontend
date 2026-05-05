import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Search, BookOpen, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import blogs from '../data/blogs';

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = [
    'All', 'Destinations', 'Travel Tips', 'Adventure', 
    'Food', 'Wellness', 'Wildlife', 'Culture'
  ];
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = blogs.filter(blog => blog.featured);
  const latestBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - IMPROVED TEXT VISIBILITY */}
      <div className="relative min-h-[85vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop)',
          }}
        >
          {/* Darker Overlay for Better Text Contrast */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          {/* Indian Flag Pattern Overlay - Very Subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-1/3 bg-saffron-500"></div>
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-green-500"></div>
          </div>
        </div>
        
        {/* Content - IMPROVED TEXT STYLES */}
        <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-5 py-2.5 border border-white/30">
              <Sparkles className="h-4 w-4 text-saffron-300" />
              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">DISCOVER • EXPLORE • INSPIRE</span>
            </div>
            
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              Stories from
              <span className="block bg-gradient-to-r from-saffron-300 via-white to-green-300 bg-clip-text text-transparent drop-shadow-lg">
                Incredible India
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-base text-white/90 drop-shadow-md sm:text-lg md:text-xl">
              Journey through India's diverse landscapes, rich culture, and unforgettable experiences
            </p>
            
            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="group relative overflow-hidden rounded-full bg-white shadow-2xl transition-all duration-300 hover:shadow-xl">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-saffron-500" />
                <input
                  type="text"
                  placeholder="Search stories, destinations, or experiences..."
                  className="w-full py-4 pl-14 pr-36 text-base text-gray-900 outline-none sm:py-5 sm:text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:from-saffron-600 hover:to-orange-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white/80 font-medium">Scroll to explore</span>
            <div className="h-10 w-5 rounded-full border-2 border-white/50">
              <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-white/80"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-saffron-500 to-orange-600 text-white shadow-md shadow-saffron-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-saffron-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        
        {/* Featured Stories */}
        {selectedCategory === 'All' && featuredBlogs.length > 0 && (
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                  <TrendingUp className="h-6 w-6 text-saffron-500" />
                  Featured Stories
                </h2>
                <p className="mt-1 text-gray-500">Handpicked articles just for you</p>
              </div>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Main Featured Card - IMPROVED OVERLAY */}
              <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
                  <img 
                    src={featuredBlogs[0]?.image} 
                    alt={featuredBlogs[0]?.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Darker Gradient for Better Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-3 py-1 text-xs font-medium shadow-lg">
                        {featuredBlogs[0]?.category}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold leading-tight text-white drop-shadow-md sm:text-2xl lg:text-3xl line-clamp-2">
                      {featuredBlogs[0]?.title}
                    </h3>
                    <p className="mb-3 text-sm text-white/90 drop-shadow sm:text-base line-clamp-2">
                      {featuredBlogs[0]?.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{featuredBlogs[0]?.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{featuredBlogs[0]?.date}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/blogs/${featuredBlogs[0]?.slug}`}
                        className="flex items-center gap-1 text-sm font-medium text-white transition-all hover:text-saffron-300 hover:gap-2"
                      >
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Side Featured Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {featuredBlogs.slice(1, 3).map(blog => (
                  <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group">
                    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-2 py-1 text-xs font-medium text-white shadow-md">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-saffron-600">
                          {blog.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{blog.readTime}</span>
                          </div>
                          <span className="text-saffron-600 font-medium group-hover:underline">Read more →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Latest Posts Section */}
        {selectedCategory === 'All' && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                <Sparkles className="h-6 w-6 text-green-500" />
                Latest Adventures
              </h2>
              <p className="mt-1 text-gray-500">Fresh stories from the road</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestBlogs.map((blog, index) => (
                <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-2 py-1 text-xs font-medium text-white shadow-md">
                          {blog.category}
                        </span>
                      </div>
                      {index === 0 && (
                        <div className="absolute right-3 top-3 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-saffron-600">
                        {blog.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <User className="h-3 w-3" />
                          <span>{blog.author.split(' ')[0]}</span>
                        </div>
                        <span className="text-sm font-medium text-saffron-600 group-hover:underline">
                          Read story →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory}`}
              </h2>
              <p className="mt-1 text-gray-500">
                Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>
          
          {filteredBlogs.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mb-4 text-gray-300">
                <Search className="mx-auto h-16 w-16" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">No articles found</h3>
              <p className="text-gray-500">Try different search terms or browse categories</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map(blog => (
                <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group">
                  <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-2 py-1 text-xs font-medium text-white shadow-md">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-saffron-600">
                        {blog.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-saffron-100 to-orange-100 flex items-center justify-center">
                            <User className="h-3 w-3 text-saffron-600" />
                          </div>
                          <span>{blog.author}</span>
                        </div>
                        <span className="text-sm font-medium text-saffron-600 group-hover:underline">
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Banner */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-saffron-600 to-orange-600 p-8 text-center shadow-xl sm:p-12">
          <div className="relative">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl"></div>
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2">
                <BookOpen className="h-4 w-4 text-white" />
                <span className="text-sm text-white font-medium">Never Miss a Story</span>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white drop-shadow sm:text-3xl">
                Join 10,000+ Travel Enthusiasts
              </h3>
              <p className="mx-auto mb-6 max-w-md text-white/90">
                Get weekly travel inspiration, tips, and exclusive offers delivered to your inbox
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-full bg-white px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="rounded-full bg-white px-6 py-3 font-medium text-saffron-600 transition-all hover:shadow-lg hover:bg-gray-100">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BlogsPage;