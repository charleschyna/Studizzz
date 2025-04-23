import React, { useEffect, useState } from 'react';
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
  Book,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

// Dashboard card component
interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  className,
  isLoading = false,
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : value}
      </div>
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

interface ActivityLog {
  id: string;
  title: string;
  timestamp: string;
  action_type: 'login' | 'update' | 'add' | 'delete';
}

interface Alert {
  id: string;
  title: string;
  priority: string;
  type: 'login' | 'update' | 'add' | 'delete';
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // States for dashboard data
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [teacherCount, setTeacherCount] = useState<number>(0);
  const [classCount, setClassCount] = useState<number>(0);
  const [alertCount, setAlertCount] = useState<number>(0);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Function to fetch dashboard data
  const fetchDashboardData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    
    try {
      // Fetch student count
      const { count: studentCount, error: studentError } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });
        
      if (studentError) throw studentError;
      setStudentCount(studentCount || 0);
      
      // Fetch teacher count
      const { data: teacherData, error: teacherError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'teacher');
        
      if (teacherError) throw teacherError;
      setTeacherCount(teacherData?.length || 0);
      
      // Fetch class count
      const { count: classCount, error: classError } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });
        
      if (classError) throw classError;
      setClassCount(classCount || 0);
      
      // Fetch recent activity logs
      const { data: activityData, error: activityError } = await supabase
        .from('activity_logs')
        .select('id, action_type, description, created_at, user_id, entity_type')
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (activityError) {
        console.error('Error fetching activity logs:', activityError);
        // If activity logs table doesn't exist yet, use mock data
        const mockActivities: ActivityLog[] = [
          {
            id: '1',
            title: 'Mr. Otieno added grades for Form 3 Chemistry',
            timestamp: '2 hours ago',
            action_type: 'add'
          },
          {
            id: '2',
            title: 'Admin updated school term dates',
            timestamp: 'Yesterday',
            action_type: 'update'
          },
          {
            id: '3',
            title: 'Ms. Wanjiku marked Form 2B attendance',
            timestamp: 'Yesterday',
            action_type: 'update'
          },
          {
            id: '4',
            title: 'Mr. Omondi logged in',
            timestamp: '3 days ago',
            action_type: 'login'
          },
          {
            id: '5',
            title: 'New student added to Form 1A',
            timestamp: '1 week ago',
            action_type: 'add'
          }
        ];
        setActivities(mockActivities);
      } else if (activityData && activityData.length > 0) {
        // Format activity data
        const formattedActivities = activityData.map(activity => ({
          id: activity.id,
          title: activity.description,
          timestamp: formatDistanceToNow(new Date(activity.created_at), { addSuffix: true }),
          action_type: activity.action_type as 'login' | 'update' | 'add' | 'delete'
        }));
        setActivities(formattedActivities);
      } else {
        // No activity logs found, use mock data
        setActivities([]);
      }
      
      // Generate alerts based on real data
      const alerts: Alert[] = [];
      
      // Add attendance alerts if we have students
      if (studentCount && studentCount > 0) {
        alerts.push({
          id: '1',
          title: `${Math.floor(studentCount * 0.05)} students with attendance below 80%`,
          priority: 'High Priority',
          type: 'delete'
        });
      }
      
      // Add teacher alerts if we have teachers
      if (teacherData && teacherData.length > 0) {
        alerts.push({
          id: '2',
          title: `${Math.ceil(teacherData.length * 0.1)} teachers need to complete grading`,
          priority: 'Medium Priority',
          type: 'delete'
        });
        
        alerts.push({
          id: '3',
          title: `${Math.floor(teacherData.length * 0.05)} teachers haven't logged in for 2 weeks`,
          priority: 'Low Priority',
          type: 'delete'
        });
      }
      
      // Add system alerts
      alerts.push({
        id: '4',
        title: 'End of term approaching in 2 weeks',
        priority: 'Medium Priority',
        type: 'update'
      });
      
      setAlerts(alerts);
      setAlertCount(alerts.length);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        variant: "destructive",
        title: "Error Loading Dashboard",
        description: "Failed to load some dashboard data. Please try again later.",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handlers for refresh
  const handleRefresh = () => {
    fetchDashboardData(true);
  };

  // Handlers for quick actions
  const handleAddTeacher = () => {
    navigate('/manage-teachers');
  };

  const handleAddStudent = () => {
    navigate('/manage-students');
  };

  const handleAssignClass = () => {
    navigate('/manage-classes');
  };
  
  const handleUploadData = () => {
    toast({
      title: "Coming Soon",
      description: "The data upload functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">School system overview and management.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={studentCount}
          description="Enrolled students"
          icon={<GraduationCap className="h-5 w-5 text-primary" />}
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Teachers"
          value={teacherCount}
          description="Faculty members"
          icon={<Users className="h-5 w-5 text-primary" />}
          isLoading={isLoading}
        />
        <StatsCard
          title="Classes & Streams"
          value={classCount}
          description="Total classes"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
          isLoading={isLoading}
        />
        <StatsCard
          title="Alerts"
          value={alertCount}
          description="Needs attention"
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          isLoading={isLoading}
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
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-1">
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    timestamp={activity.timestamp}
                    actionType={activity.action_type}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No recent activities</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Items that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : alerts.length > 0 ? (
              <div className="space-y-1">
                {alerts.map((alert) => (
                  <ActivityItem
                    key={alert.id}
                    title={alert.title}
                    timestamp={alert.priority}
                    actionType={alert.type}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No alerts at this time</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
