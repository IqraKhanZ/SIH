import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Train, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Wrench,
  Shield,
  MapPin,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const dashboardMetrics = [
  {
    title: "Trains Ready",
    value: "147",
    total: "180",
    icon: Train,
    color: "text-signal-green",
    bgColor: "bg-signal-green/10",
  },
  {
    title: "Maintenance Alerts", 
    value: "8",
    total: "Active",
    icon: AlertCircle,
    color: "text-signal-amber",
    bgColor: "bg-signal-amber/10",
  },
  {
    title: "Ad Deadlines",
    value: "3",
    total: "This Week",
    icon: Clock,
    color: "text-signal-orange",
    bgColor: "bg-signal-orange/10",
  },
  {
    title: "System Health",
    value: "98.2%",
    total: "Uptime",
    icon: CheckCircle,
    color: "text-signal-green",
    bgColor: "bg-signal-green/10",
  },
];

const quickActions = [
  {
    title: "Data Prediction",
    description: "View operational analytics",
    icon: TrendingUp,
    path: "/data-prediction",
  },
  {
    title: "Maintenance Hub",
    description: "Job cards and fitness tracking",
    icon: Wrench,
    path: "/data-prediction/jobs",
  },
  {
    title: "Train Audit",
    description: "Detailed train profiles",
    icon: Shield,
    path: "/train-audit",
  },
  {
    title: "Stabling Status",
    description: "Bay allocation overview",
    icon: MapPin,
    path: "/data-prediction/stabling",
  },
];

export default function Dashboard() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('dashboardOverview')}</h1>
          <p className="text-muted-foreground">{t('railwayOperationsManagement')}</p>
        </div>
        <Link to="/input-upload">
          <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {t('inputUpload')}
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="shadow-railway-md hover:shadow-railway-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.total}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-railway-md">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
          <CardDescription>
            Navigate to key operational areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-accent transition-smooth w-full"
                >
                  <action.icon className="h-8 w-8 text-railway-blue" />
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Today's Priorities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-signal-amber/10 rounded-md">
              <AlertCircle className="h-5 w-5 text-signal-amber" />
              <div>
                <p className="font-medium text-foreground">Train TR-4521 Maintenance Due</p>
                <p className="text-sm text-muted-foreground">Scheduled for Bay 7 at 14:00</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-signal-orange/10 rounded-md">
              <Clock className="h-5 w-5 text-signal-orange" />
              <div>
                <p className="font-medium text-foreground">Advertisement Campaign Deadline</p>
                <p className="text-sm text-muted-foreground">Metro Express branding expires Friday</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-signal-green/10 rounded-md">
              <CheckCircle className="h-5 w-5 text-signal-green" />
              <div>
                <p className="font-medium text-foreground">Monthly Inspection Complete</p>
                <p className="text-sm text-muted-foreground">12 trains cleared for service</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Operational Capacity</span>
                <span className="text-foreground">82%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-signal-green h-2 rounded-full" style={{width: "82%"}}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Maintenance Schedule</span>
                <span className="text-foreground">67%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-signal-amber h-2 rounded-full" style={{width: "67%"}}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cleaning Operations</span>
                <span className="text-foreground">91%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-railway-blue h-2 rounded-full" style={{width: "91%"}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}