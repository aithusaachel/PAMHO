import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import InstituteLayout from './layouts/InstituteLayout'
import Home from './pages/Home'
import Institute from './pages/Institute'
import About from './pages/About'
import Programs from './pages/Programs'
import Ambassadors from './pages/Ambassadors'
import Membership from './pages/Membership'
import Resources from './pages/Resources'
import ResourceDetail from './pages/ResourceDetail'
import Donate from './pages/Donate'
import Contact from './pages/Contact'
import RegisterConversation from './pages/RegisterConversation'
import LiveZoomPage from './pages/LiveZoomPage'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CourseDetail from './pages/CourseDetail'
import CourseLearning from './pages/CourseLearning'
import Catalog from './pages/Catalog'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminCourses from './pages/admin/AdminCourses'
import AdminPrograms from './pages/admin/AdminPrograms'
import AdminResources from './pages/admin/AdminResources'
import AdminEnrollments from './pages/admin/AdminEnrollments'
import AdminUsers from './pages/admin/AdminUsers'
import AdminEnquiries from './pages/admin/AdminEnquiries'
import AdminCourseDetail from './pages/admin/AdminCourseDetail'
import AdminLegacyForms from './pages/admin/AdminLegacyForms'

// All routes implemented

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Full-screen routes outside of Layouts */}
        <Route path="/programs/live" element={<LiveZoomPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Learning Experience Routes (Protected) - No Navbar/Footer for focused learning */}
        <Route 
          path="/institute/learn/:slug" 
          element={
            <ProtectedRoute>
              <CourseLearning />
            </ProtectedRoute>
          } 
        />

        {/* Admin Portal */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['content_manager', 'administrator', 'superadmin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/:slug" element={<AdminCourseDetail />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="resources" element={<AdminResources />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="legacy-forms" element={<AdminLegacyForms />} />
        </Route>
        
        {/* Public Website Routes (No Auth UI) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/ambassadors" element={<Ambassadors />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceDetail />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register-conversation" element={<RegisterConversation />} />
        </Route>

        {/* Institute Platform Routes (Auth UI) */}
        <Route element={<InstituteLayout />}>
          <Route path="/institute" element={<Institute />} />
          <Route path="/institute/catalog" element={<Catalog />} />
          <Route path="/institute/courses/:slug" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/institute/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
