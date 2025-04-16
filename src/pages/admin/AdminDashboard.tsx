
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Users, 
  Activity, 
  AlertTriangle, 
  UserPlus,
  Book
} from 'lucide-react';

// Dashboard card component
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// Activity item component
interface ActivityItemProps {
  title: string;
  timestamp: string;
  actionType?: 'login' | 'update' | 'add' | 'delete';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, timestamp, actionType = 'update' }) => {
  const getActionColor = () => {
    switch (actionType) {
      case 'login':
        return 'bg-blue-500';
      case 'update':
        return 'bg-green-500';
      case 'add':
        return 'bg-primary';
      case 'delete':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex items-center py-2">
      <div className={`w-2 h-2 rounded-full mr-3 ${getActionColor()}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

// Quick action button component
interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
  >
    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
      {icon}
    </div>
    <span className="text-sm font-medium text-center">{label}</span>
  </button>
);

const AdminDashboard: React.FC = () => {
  // Handlers for quick actions
  const handleAddTeacher = () => {
    window.location.href = '/manage-teachers';
  };

  const handleAddStudent = () => {
    alert('Add Student functionality will be implemented soon');
  };

  const handleAssignClass = () => {
    alert('Assign Class functionality will be implemented soon');
  };
  
  const handleUploadData = () => {
    alert('Upload Data functionality will be implemented soon');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">School system overview and management.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value="520"
          description="Enrolled students"
          icon={<GraduationCap className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Total Teachers"
          value="38"
          description="Faculty members"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Classes & Streams"
          value="16"
          description="Total classes"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        />
        <StatsCard
          title="Alerts"
          value="8"
          description="Needs attention"
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        />
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              icon={<UserPlus className="h-5 w-5" />}
              label="Add Teacher"
              onClick={handleAddTeacher}
            />
            <QuickAction
              icon={<GraduationCap className="h-5 w-5" />}
              label="Add Student"
              onClick={handleAddStudent}
            />
            <QuickAction
              icon={<Book className="h-5 w-5" />}
              label="Assign Class"
              onClick={handleAssignClass}
            />
            <QuickAction
              icon={<FileText className="h-5 w-5" />}
              label="Upload Data"
              onClick={handleUploadData}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Activity Logs */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ActivityItem
                title="Mr. Otieno added grades for Form 3 Chemistry"
                timestamp="2 hours ago"
                actionType="add"
              />
              <ActivityItem
                title="Admin updated school term dates"
                timestamp="Yesterday"
                actionType="update"
              />
              <ActivityItem
                title="Ms. Wanjiku marked Form 2B attendance"
                timestamp="Yesterday"
                actionType="update"
              />
              <ActivityItem
                title="Mr. Omondi logged in"
                timestamp="3 days ago"
                actionType="login"
              />
              <ActivityItem
                title="New student added to Form 1A"
                timestamp="1 week ago"
                actionType="add"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Items that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <ActivityItem
                title="5 students with attendance below 80% in Form 3C"
                timestamp="High Priority"
                actionType="delete"
              />
              <ActivityItem
                title="End of term grades missing for Form 2B Physics"
                timestamp="Medium Priority"
                actionType="delete"
              />
              <ActivityItem
                title="Class average below 50% in Form 4A Chemistry"
                timestamp="Medium Priority" 
                actionType="delete"
              />
              <ActivityItem
                title="3 teachers haven't logged in for 2 weeks"
                timestamp="Low Priority"
                actionType="delete"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
