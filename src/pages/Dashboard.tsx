
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CalendarCheck, GraduationCap, Users, Bell, Calendar, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your {userRole} dashboard.</p>
      </div>

      {userRole === 'parent' ? (
        <ParentDashboard />
      ) : (
        <AdminTeacherDashboard />
      )}
    </div>
  );
};

const ParentDashboard: React.FC = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Latest Grades"
          value="B+ (80%)"
          description="Term 2, English"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        />
        <DashboardCard
          title="Attendance"
          value="92%"
          description="Present this term"
          icon={<CalendarCheck className="h-5 w-5 text-primary" />}
        />
        <DashboardCard
          title="Alerts"
          value="1"
          description="Low performance in Chemistry"
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        />
        <DashboardCard
          title="Upcoming Events"
          value="3"
          description="Including End Term Exams"
          icon={<Calendar className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Subject grades this term</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SubjectGradeItem
                subject="Mathematics"
                grade="A-"
                score="75%"
              />
              <SubjectGradeItem
                subject="English"
                grade="B+"
                score="72%"
              />
              <SubjectGradeItem
                subject="Chemistry"
                grade="C+"
                score="58%"
                isLow={true}
              />
              <SubjectGradeItem
                subject="Physics"
                grade="B"
                score="67%"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest school activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="Chemistry CAT 2 Results Posted"
                timestamp="2 hours ago"
              />
              <ActivityItem
                title="PTA Meeting Scheduled"
                timestamp="Yesterday"
              />
              <ActivityItem
                title="End Term Exam Timetable Released"
                timestamp="3 days ago"
              />
              <ActivityItem
                title="School Sports Day"
                timestamp="Next Week"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const AdminTeacherDashboard: React.FC = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Students"
          value="520"
          description="Total students"
          icon={<GraduationCap className="h-5 w-5 text-primary" />}
        />
        <DashboardCard
          title="Teachers"
          value="38"
          description="Faculty members"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <DashboardCard
          title="Subjects"
          value="12"
          description="Active subjects"
          icon={<BookOpen className="h-5 w-5 text-primary" />}
        />
        <DashboardCard
          title="Attendance"
          value="95%"
          description="Average attendance"
          icon={<CalendarCheck className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Average grades per class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center text-muted-foreground">
              Chart will be displayed here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="Term 2 Grades Published"
                timestamp="2 hours ago"
              />
              <ActivityItem
                title="Form 3 Attendance Updated"
                timestamp="Yesterday"
              />
              <ActivityItem
                title="New Student Registered"
                timestamp="3 days ago"
              />
              <ActivityItem
                title="Subject Schedule Updated"
                timestamp="1 week ago"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card>
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
};

interface ActivityItemProps {
  title: string;
  timestamp: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, timestamp }) => {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-primary mr-3" />
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

interface SubjectGradeItemProps {
  subject: string;
  grade: string;
  score: string;
  isLow?: boolean;
}

const SubjectGradeItem: React.FC<SubjectGradeItemProps> = ({ subject, grade, score, isLow }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${isLow ? 'bg-red-500' : 'bg-green-500'} mr-3`} />
        <p className="text-sm font-medium">{subject}</p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-semibold ${isLow ? 'text-red-500' : 'text-green-600'}`}>{grade}</span>
        <span className="text-xs text-muted-foreground">({score})</span>
      </div>
    </div>
  );
};

export default Dashboard;
