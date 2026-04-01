// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import UnifiedDetail from './pages/UnifiedDetail';  // NEW - replaces both detail pages
import Payment from './pages/Payment';
import AuthCallback from './components/AuthCallback';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/destinations" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        {/* NEW - Unified detail route for both destinations and packages */}
        <Route path="/destination/:id" element={
          <Layout>
            <UnifiedDetail />
          </Layout>
        } />
        <Route path="/package/:id" element={
          <Layout>
            <UnifiedDetail />
          </Layout>
        } />
        <Route path="/package/:id/payment" element={
          <Layout>
            <Payment />
          </Layout>
        } />
        <Route path="/blogs" element={
          <Layout>
            <BlogsPage />
          </Layout>
        } />
        <Route path="/blogs/:slug" element={
          <Layout>
            <BlogPostPage />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <ProfilePage />
          </Layout>
        } />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;