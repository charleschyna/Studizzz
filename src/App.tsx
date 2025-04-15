
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
                
                <Route path="/attendance" element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent']}>
                    <MainLayout>
                      <div className="p-4">Attendance Management (Coming Soon)</div>
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
                
                <Route path="/my-children" element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <div className="p-4">My Children (Coming Soon)</div>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <div className="p-4">Settings (Coming Soon)</div>
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
