// src/components/BlogCard.jsx
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ blog, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="group relative h-full min-h-[500px] overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl lg:min-h-[600px]">
        <div className="relative h-full w-full">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-3 py-1 text-xs font-medium shadow-lg">
                {blog.category}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl lg:text-3xl line-clamp-2">
              {blog.title}
            </h3>
            <p className="mb-3 text-sm text-gray-200 sm:text-base line-clamp-2">
              {blog.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
              <Link 
                to={`/blogs/${blog.slug}`}
                className="flex items-center gap-1 text-sm font-medium text-white transition-all hover:text-saffron-400 hover:gap-2"
              >
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default card (used in grids)
  return (
    <Link to={`/blogs/${blog.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-gradient-to-r from-saffron-500 to-orange-600 px-2 py-1 text-xs font-medium text-white shadow-sm">
              {blog.category}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
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
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-saffron-50">
                <User className="h-3 w-3 text-saffron-600" />
              </div>
              <span>{blog.author.split(' ')[0]}</span>
            </div>
            <span className="text-sm font-medium text-saffron-600 transition-all group-hover:translate-x-1">
              Read →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;