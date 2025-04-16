
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  BookOpen, 
  Calendar, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  BookOpenCheck, 
  GraduationCap,
  User,
  Bell,
  MessageSquare,
  Check,
  Upload,
  UserPlus,
  School,
  AlertTriangle,
  Activity,
  ClipboardList,
  Wrench,
  LogIn
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { userRole } = useAuth();

  // Define routes based on user role
  const getRoutes = () => {
    const routes = [
      { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" />, allowedRoles: ['admin', 'teacher', 'parent'] },
    ];
    
    if (userRole === 'admin') {
      routes.push(
        { name: 'Admin Dashboard', path: '/admin-dashboard', icon: <Home className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Manage Students', path: '/manage-students', icon: <GraduationCap className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Manage Teachers', path: '/manage-teachers', icon: <UserPlus className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Manage Parents', path: '/manage-parents', icon: <Users className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Classes & Subjects', path: '/manage-classes', icon: <ClipboardList className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Academic Records', path: '/academic-records', icon: <FileText className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Attendance Records', path: '/admin-attendance', icon: <Calendar className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Analytics & Reports', path: '/analytics', icon: <BarChart className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'System Settings', path: '/system-settings', icon: <Wrench className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Activity Logs', path: '/activity-logs', icon: <Activity className="h-5 w-5" />, allowedRoles: ['admin'] },
        { name: 'Account Settings', path: '/account-settings', icon: <LogIn className="h-5 w-5" />, allowedRoles: ['admin'] }
      );
    }
    
    if (userRole === 'teacher') {
      routes.push(
        { name: 'Class Management', path: '/class-management', icon: <BookOpen className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Grade Entry', path: '/grade-entry', icon: <FileText className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Attendance', path: '/attendance', icon: <Calendar className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Performance Analytics', path: '/performance-analytics', icon: <BarChart className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Student Profiles', path: '/student-profiles', icon: <User className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Messages', path: '/messages', icon: <MessageSquare className="h-5 w-5" />, allowedRoles: ['teacher'] },
        { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" />, allowedRoles: ['teacher'] }
      );
    }
    
    if (userRole === 'parent') {
      routes.push(
        { name: 'Performance', path: '/performance', icon: <BarChart className="h-5 w-5" />, allowedRoles: ['parent'] },
        { name: 'Attendance', path: '/attendance', icon: <Calendar className="h-5 w-5" />, allowedRoles: ['parent'] },
        { name: 'Report Cards', path: '/report-cards', icon: <FileText className="h-5 w-5" />, allowedRoles: ['parent'] },
        { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" />, allowedRoles: ['parent'] },
        { name: 'Student Profile', path: '/student-profile', icon: <User className="h-5 w-5" />, allowedRoles: ['parent'] },
        { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" />, allowedRoles: ['parent'] }
      );
    }
    
    return routes.filter(route => route.allowedRoles.includes(userRole || ''));
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-md border-r">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">SPTS</h2>
        <p className="text-sm text-muted-foreground">Student Performance Tracking</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3 py-2">
          {getRoutes().map((route) => (
            <li key={route.path}>
              <NavLink 
                to={route.path} 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {route.icon}
                <span className="ml-3">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
