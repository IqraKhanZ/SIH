import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Train,
  Wrench,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const scenarioTemplates = [
  {
    id: 1,
    name: "Peak Hour Disruption",
    description: "3 trains unavailable during morning rush",
    params: "unavailable_trains=3&time_period=peak&duration=2h"
  },
  {
    id: 2,
    name: "Maintenance Window",
    description: "Track closure for 4 hours overnight",
    params: "track_closure=main_line&duration=4h&time=overnight"
  },
  {
    id: 3,
    name: "Emergency Scenario",
    description: "Signal failure affecting 2 routes",
    params: "signal_failure=true&affected_routes=2&severity=high"
  }
];

const sampleResults = [
  {
    metric: "Service Frequency",
    baseline: "Every 3 minutes",
    simulated: "Every 5 minutes",
    impact: "Reduced by 40%",
    status: "critical"
  },
  {
    metric: "Passenger Capacity",
    baseline: "12,000/hour",
    simulated: "8,400/hour",
    impact: "Reduced by 30%",
    status: "warning"
  },
  {
    metric: "Average Delay",
    baseline: "2.1 minutes",
    simulated: "7.3 minutes",
    impact: "Increased by 247%",
    status: "critical"
  },
  {
    metric: "Resource Utilization",
    baseline: "85%",
    simulated: "92%",
    impact: "Increased by 8%",
    status: "normal"
  }
];

const recommendations = [
  {
    action: "Deploy backup trains from depot B",
    impact: "Restore 60% of lost capacity",
    time: "15 minutes",
    cost: "$1,200"
  },
  {
    action: "Reroute trains via alternate track",
    impact: "Reduce delays by 40%", 
    time: "5 minutes",
    cost: "$300"
  },
  {
    action: "Activate emergency bus service",
    impact: "Handle 2,000 passengers/hour",
    time: "30 minutes",
    cost: "$2,500"
  }
];

export default function Simulation() {
  const [scenario, setScenario] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const runSimulation = async () => {
    if (!scenario.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe a scenario to simulate",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRunning(false);
    setShowResults(true);
    
    toast({
      title: "Simulation Complete",
      description: "Analysis and recommendations are ready",
    });
  };

  const resetSimulation = () => {
    setScenario("");
    setShowResults(false);
  };

  const loadTemplate = (template: any) => {
    setScenario(template.description);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-signal-red/20 text-signal-red';
      case 'warning': return 'bg-signal-amber/20 text-signal-amber';
      case 'normal': return 'bg-signal-green/20 text-signal-green';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-railway-blue" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">What-If Simulation</h1>
          <p className="text-muted-foreground">Test scenarios and analyze operational impact</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-railway-md">
            <CardHeader>
              <CardTitle>Scenario Input</CardTitle>
              <CardDescription>
                Describe the situation you want to simulate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scenario">Scenario Description</Label>
                <Textarea
                  id="scenario"
                  placeholder="e.g., 3 trains unavailable during peak hours due to maintenance..."
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={runSimulation} 
                  disabled={isRunning}
                  className="flex-1"
                >
                  {isRunning ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetSimulation}
                  size="icon"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card className="shadow-railway-md">
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>
                Common scenarios to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {scenarioTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-smooth"
                  onClick={() => loadTemplate(template)}
                >
                  <h4 className="font-medium text-foreground">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {showResults ? (
            <>
              {/* Impact Analysis */}
              <Card className="shadow-railway-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-signal-amber" />
                    Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    Comparative analysis of operational metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium text-muted-foreground">Metric</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">Baseline</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">Simulated</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">Impact</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleResults.map((result, index) => (
                          <tr key={index} className="border-b hover:bg-accent/50 transition-smooth">
                            <td className="p-3 font-medium text-foreground">{result.metric}</td>
                            <td className="p-3 text-muted-foreground">{result.baseline}</td>
                            <td className="p-3 text-foreground">{result.simulated}</td>
                            <td className="p-3 font-medium">{result.impact}</td>
                            <td className="p-3">
                              <Badge className={getStatusColor(result.status)}>
                                {result.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-railway-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-signal-green" />
                    Recommended Solutions
                  </CardTitle>
                  <CardDescription>
                    AI-generated mitigation strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-foreground">{rec.action}</h4>
                        <Badge variant="outline">${rec.cost}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Train className="h-4 w-4 text-railway-blue" />
                          <span className="text-muted-foreground">Impact: </span>
                          <span className="text-foreground font-medium">{rec.impact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-signal-amber" />
                          <span className="text-muted-foreground">Implementation: </span>
                          <span className="text-foreground font-medium">{rec.time}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Implement Solution
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-railway-md">
              <CardContent className="p-12 text-center">
                <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Simulate</h3>
                <p className="text-muted-foreground mb-4">
                  Enter a scenario description and click "Run Simulation" to see the analysis
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Train className="h-4 w-4" />
                    <span>Fleet Management</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wrench className="h-4 w-4" />
                    <span>Maintenance Impact</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Route Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}