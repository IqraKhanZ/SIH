import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Zap,
  Settings
} from "lucide-react";

const mlPredictions = [
  {
    id: "ML-001",
    type: "Brake System Failure",
    train: "TR-4521",
    probability: 78,
    timeframe: "7-10 days", 
    severity: "High",
    recommendation: "Schedule immediate inspection"
  },
  {
    id: "ML-002", 
    type: "Engine Performance Drop",
    train: "TR-4522",
    probability: 65,
    timeframe: "14-21 days",
    severity: "Medium",
    recommendation: "Monitor closely and plan maintenance"
  },
  {
    id: "ML-003",
    type: "Door Mechanism Issue", 
    train: "TR-4523",
    probability: 45,
    timeframe: "30-45 days",
    severity: "Low",
    recommendation: "Include in next scheduled maintenance"
  },
];

const trendAnalysis = [
  {
    metric: "Overall System Health",
    current: 92,
    trend: "+2.3%",
    status: "Improving"
  },
  {
    metric: "Predictive Accuracy",
    current: 87,
    trend: "+1.8%", 
    status: "Stable"
  },
  {
    metric: "Maintenance Efficiency",
    current: 74,
    trend: "-0.5%",
    status: "Declining"
  },
];

const preventiveSuggestions = [
  {
    train: "TR-4521",
    component: "Brake Pads",
    action: "Replace within 5 days",
    priority: "High",
    savings: "$2,400"
  },
  {
    train: "TR-4522", 
    component: "Oil Filter",
    action: "Service within 2 weeks",
    priority: "Medium", 
    savings: "$800"
  },
  {
    train: "TR-4523",
    component: "Door Seals",
    action: "Inspect and lubricate",
    priority: "Low",
    savings: "$350"
  },
];

export default function MLAnalysis() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-signal-red/20 text-signal-red';
      case 'Medium': return 'bg-signal-amber/20 text-signal-amber';
      case 'Low': return 'bg-signal-green/20 text-signal-green';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-signal-red/20 text-signal-red';
      case 'Medium': return 'bg-signal-amber/20 text-signal-amber';
      case 'Low': return 'bg-signal-green/20 text-signal-green';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-railway-blue" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">ML Analysis Dashboard</h1>
          <p className="text-muted-foreground">Machine learning insights and predictive analytics</p>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Brain className="h-8 w-8 text-railway-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Predictions</p>
                <p className="text-2xl font-bold text-signal-amber">24</p>
              </div>
              <TrendingUp className="h-8 w-8 text-signal-amber" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold text-signal-green">87%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-signal-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost Savings</p>
                <p className="text-2xl font-bold text-foreground">$24.5K</p>
              </div>
              <Zap className="h-8 w-8 text-railway-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Failure Predictions */}
        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-signal-amber" />
              Failure Predictions
            </CardTitle>
            <CardDescription>
              ML-driven predictions for potential equipment failures
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mlPredictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{prediction.type}</h4>
                  <Badge className={getSeverityColor(prediction.severity)}>
                    {prediction.severity}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Train: </span>
                    <span className="text-foreground font-medium">{prediction.train}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeframe: </span>
                    <span className="text-foreground font-medium">{prediction.timeframe}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Probability</span>
                    <span className="text-foreground font-medium">{prediction.probability}%</span>
                  </div>
                  <Progress value={prediction.probability} className="h-2" />
                </div>

                <p className="text-sm text-muted-foreground italic">
                  {prediction.recommendation}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-railway-blue" />
              Trend Analysis
            </CardTitle>
            <CardDescription>
              Performance trends and system health metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {trendAnalysis.map((trend, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{trend.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{trend.current}%</span>
                    <Badge variant={trend.status === 'Improving' ? 'default' : trend.status === 'Stable' ? 'secondary' : 'destructive'}>
                      {trend.trend}
                    </Badge>
                  </div>
                </div>
                <Progress value={trend.current} className="h-2" />
                <p className="text-xs text-muted-foreground">Status: {trend.status}</p>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configure Analysis Parameters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preventive Maintenance Suggestions */}
      <Card className="shadow-railway-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-signal-green" />
            Preventive Maintenance Suggestions
          </CardTitle>
          <CardDescription>
            AI-recommended maintenance actions to prevent failures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Train</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Component</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Recommended Action</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Est. Savings</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {preventiveSuggestions.map((suggestion, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50 transition-smooth">
                    <td className="p-3 font-medium text-foreground">{suggestion.train}</td>
                    <td className="p-3 text-foreground">{suggestion.component}</td>
                    <td className="p-3 text-foreground">{suggestion.action}</td>
                    <td className="p-3">
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium text-signal-green">{suggestion.savings}</td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">
                        <Clock className="mr-1 h-3 w-3" />
                        Schedule
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}