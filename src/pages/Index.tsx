
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to their dashboard
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Student Performance Tracking System
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive platform for monitoring and improving student academic performance.
            Connecting teachers, parents, and administrators for better education outcomes.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Parent Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Parents Portal</h2>
            <p className="text-gray-600">
              Monitor your child's academic progress, attendance, and receive important updates.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate('/auth?role=parent')}
            >
              Access Parent Portal
            </Button>
          </div>

          {/* Teacher Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Teachers Portal</h2>
            <p className="text-gray-600">
              Manage classes, record grades, track attendance, and communicate with parents.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate('/auth?role=teacher')}
            >
              Access Teacher Portal
            </Button>
          </div>

          {/* Admin Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Admin Portal</h2>
            <p className="text-gray-600">
              Oversee system operations, manage users, and access comprehensive analytics.
            </p>
            <Button 
              className="w-full" 
              onClick={() => navigate('/auth?role=admin')}
            >
              Access Admin Portal
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed with instant notifications about academic progress</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Performance Analytics</h3>
              <p className="text-gray-600">Detailed insights into student performance and trends</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Seamless Communication</h3>
              <p className="text-gray-600">Direct communication channel between teachers and parents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
