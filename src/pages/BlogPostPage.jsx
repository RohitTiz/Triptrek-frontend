import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin } from 'lucide-react';
import blogs from '../data/blogs';
import { useState } from 'react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const [relatedBlogs] = useState(
    blogs.filter(b => b.slug !== slug && b.category === blog?.category).slice(0, 3)
  );

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Blog Not Found</h1>
          <p className="mb-6 text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-6 py-2 text-white transition-all hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section - IMPROVED VISIBILITY */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=600&fit=crop';
          }}
        />
        {/* Darker Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8 lg:p-12">
          <div className="mx-auto max-w-5xl">
            <Link 
              to="/blogs" 
              className="mb-4 inline-flex items-center text-sm text-white/80 hover:text-white transition-colors sm:mb-5"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
            
            {/* Category Badge */}
            <div className="mb-3">
              <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-3 py-1 text-xs font-medium text-white shadow-lg">
                {blog.category}
              </span>
            </div>
            
            <h1 className="mb-4 text-2xl font-bold leading-tight drop-shadow-lg sm:text-3xl lg:text-4xl xl:text-5xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 sm:text-base">
              <div className="flex items-center gap-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <User className="h-3 w-3" />
                </div>
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          
          {/* Left Column - Article Content */}
          <article className="lg:w-2/3">
            <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8 lg:p-10">
              
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-100 pb-6">
                <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                {blog.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content - IMPROVED TYPOGRAPHY */}
              <div className="prose prose-base max-w-none lg:prose-lg">
                {blog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="mt-8 text-xl font-bold text-gray-900 first:mt-0 sm:text-2xl">
                        {paragraph.substring(3)}
                      </h2>
                    );
                  } else if (paragraph.match(/^[0-9]+\./)) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="my-4 list-decimal space-y-2 pl-5">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item.replace(/^[0-9]+\.\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="my-4 list-disc space-y-2 pl-5">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">
                            {item.replace(/^-\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  } else if (paragraph.startsWith('**')) {
                    return (
                      <p key={index} className="my-4 font-semibold text-gray-800">
                        {paragraph}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="my-4 leading-relaxed text-gray-700">
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>

              {/* Share & Save Actions */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Share this article:</span>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-gray-100 p-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button className="rounded-full bg-gray-100 p-2 text-sky-500 transition-all hover:bg-sky-500 hover:text-white">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="rounded-full bg-gray-100 p-2 text-blue-700 transition-all hover:bg-blue-700 hover:text-white">
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all hover:bg-saffron-500 hover:text-white">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-saffron-600">
                    <Bookmark className="h-4 w-4" />
                    Save for later
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-saffron-50 to-orange-50 p-6 shadow-md sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="mb-1 text-xl font-bold text-gray-900">{blog.author}</h3>
                  <p className="mb-2 text-sm text-gray-600">
                    Travel writer and photographer with over 10 years of experience exploring India. 
                    Passionate about sharing authentic travel experiences and cultural insights.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 sm:justify-start">
                    <span className="rounded-full bg-white px-2 py-0.5 font-medium text-saffron-600">
                      {blog.category} Specialist
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 font-medium text-saffron-600">
                      50+ Articles Published
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Right Column - Sidebar */}
          <aside className="lg:w-1/3">
            
            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="mb-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-1 w-6 rounded-full bg-gradient-to-r from-saffron-500 to-orange-600"></span>
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedBlogs.map(relatedBlog => (
                    <Link 
                      key={relatedBlog.id}
                      to={`/blogs/${relatedBlog.slug}`}
                      className="group block"
                    >
                      <div className="flex gap-3 rounded-xl transition-all group-hover:bg-gray-50">
                        <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <img 
                            src={relatedBlog.image} 
                            alt={relatedBlog.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-saffron-600">
                            {relatedBlog.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{relatedBlog.readTime}</span>
                            <span>•</span>
                            <span>{relatedBlog.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="mb-6 rounded-2xl bg-white p-5 shadow-lg sm:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <span className="h-1 w-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></span>
                Categories
              </h3>
              <div className="space-y-2">
                {['Destinations', 'Travel Tips', 'Adventure', 'Culture', 'Food', 'Wellness', 'Wildlife'].map(category => (
                  <Link 
                    key={category}
                    to={`/blogs?category=${category.toLowerCase()}`}
                    className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-gray-700 transition-all hover:bg-gray-50 hover:text-saffron-600"
                  >
                    <span>{category}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {blogs.filter(b => b.category === category).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter - IMPROVED */}
            <div className="rounded-2xl bg-gradient-to-r from-saffron-500 to-orange-600 p-5 shadow-lg sm:p-6">
              <div className="text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span className="text-lg">📧</span>
                  <span className="text-xs font-medium text-white">Newsletter</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">Get Travel Updates</h3>
                <p className="mb-4 text-sm text-white/90">
                  Subscribe to receive exclusive travel guides and offers
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-full border-0 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-saffron-600 transition-all hover:shadow-lg hover:bg-gray-100">
                    Subscribe Now
                  </button>
                </div>
                <p className="mt-3 text-xs text-white/70">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;