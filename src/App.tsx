import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Performance from "./pages/parent/Performance";
import Attendance from "./pages/parent/Attendance";
import ReportCards from "./pages/parent/ReportCards";
import Notifications from "./pages/parent/Notifications";
import StudentProfile from "./pages/parent/StudentProfile";
import Settings from "./pages/parent/Settings";
import FeesManagement from '@/pages/admin/FeesManagement';
import StudentFees from '@/pages/parent/StudentFees';
import AcademicRecords from '@/pages/admin/AcademicRecords';
import AttendanceRecords from '@/pages/admin/AttendanceRecords';
import AnalyticsReports from '@/pages/admin/AnalyticsReports';
import SystemSettings from '@/pages/admin/SystemSettings';

// Teacher pages
import ClassManagement from "./pages/teacher/ClassManagement";
import GradeEntry from "./pages/teacher/GradeEntry";

// Admin pages
import ManageTeachers from "./pages/admin/ManageTeachers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageParents from "./pages/admin/ManageParents";
import ManageClasses from "./pages/admin/ManageClasses";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Index Route */}
                <Route path="/" element={<Index />} />
                
                {/* Auth Route */}
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Parent Dashboard Routes */}
                <Route path="/performance" element={
                  <ProtectedRoute allowedRoles={['parent', 'admin']}>
                    <MainLayout>
                      <Performance />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/attendance" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <Attendance />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/report-cards" element={
                  <ProtectedRoute allowedRoles={['parent', 'admin']}>
                    <MainLayout>
                      <ReportCards />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/notifications" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <Notifications />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/student-profile" element={
                  <ProtectedRoute allowedRoles={['parent', 'admin']}>
                    <MainLayout>
                      <StudentProfile />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <Settings />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/student-fees" element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <StudentFees />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Teacher Dashboard Routes */}
                <Route path="/class-management" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <MainLayout>
                      <ClassManagement />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/grade-entry" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <MainLayout>
                      <GradeEntry />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Admin Dashboard Routes */}
                <Route path="/manage-teachers" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ManageTeachers />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin-dashboard" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AdminDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-students" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ManageStudents />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-parents" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ManageParents />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/manage-classes" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ManageClasses />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/fees-management" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <FeesManagement />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/academic-records" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AcademicRecords />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/attendance-records" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AttendanceRecords />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/analytics" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AnalyticsReports />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/system-settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <SystemSettings />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/activity-logs" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Activity Logs (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/account-settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Account Settings (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Placeholder routes - will be implemented later */}
                <Route path="/students" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Students Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/teachers" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Teachers Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/parents" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Parents Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/classes" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Classes Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/subjects" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Subjects Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/terms" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Terms Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/grades" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <div className="p-4">Grades Management (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/reports" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <div className="p-4">Reports (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/performance-analytics" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <MainLayout>
                      <div className="p-4">Performance Analytics (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/student-profiles" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <MainLayout>
                      <div className="p-4">Student Profiles (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/messages" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin', 'parent']}>
                    <MainLayout>
                      <div className="p-4">Messages & Announcements (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/my-children" element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <div className="p-4">My Children (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
