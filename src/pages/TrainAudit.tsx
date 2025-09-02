import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Train, 
  Shield, 
  Wrench, 
  MapPin,
  Clock,
  Palette,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const trainData = [
  {
    id: "TR-4521",
    model: "Metro Express 2020",
    status: "Active",
    fitness: {
      status: "Valid",
      expiry: "2024-08-15",
      progress: 85
    },
    maintenance: {
      pending: 2,
      lastService: "2024-01-10",
      nextDue: "2024-02-15"
    },
    branding: {
      campaign: "City Transit",
      revenue: "$15,000",
      expiry: "2024-06-30"
    },
    mileage: {
      current: 125430,
      target: 130000,
      efficiency: 96
    },
    cleaning: {
      lastCleaned: "2024-01-28",
      type: "Deep Clean",
      nextScheduled: "2024-02-05"
    },
    stabling: {
      currentBay: "A-12",
      position: "Platform Side",
      since: "18:30"
    }
  },
  {
    id: "TR-4522", 
    model: "Metro Express 2019",
    status: "Maintenance",
    fitness: {
      status: "Expired",
      expiry: "2024-01-20",
      progress: 15
    },
    maintenance: {
      pending: 5,
      lastService: "2023-12-15",
      nextDue: "Overdue"
    },
    branding: {
      campaign: "No Active Campaign",
      revenue: "$0",
      expiry: "-"
    },
    mileage: {
      current: 98750,
      target: 100000,
      efficiency: 87
    },
    cleaning: {
      lastCleaned: "2024-01-25",
      type: "Standard",
      nextScheduled: "2024-02-08"
    },
    stabling: {
      currentBay: "M-3",
      position: "Maintenance Bay",
      since: "14:20"
    }
  },
  {
    id: "TR-4523",
    model: "Metro Express 2021", 
    status: "Active",
    fitness: {
      status: "Valid",
      expiry: "2024-09-22",
      progress: 92
    },
    maintenance: {
      pending: 1,
      lastService: "2024-01-20",
      nextDue: "2024-03-01"
    },
    branding: {
      campaign: "Metro Ads Plus",
      revenue: "$8,500",
      expiry: "2024-05-15"
    },
    mileage: {
      current: 87250,
      target: 90000,
      efficiency: 91
    },
    cleaning: {
      lastCleaned: "2024-01-29",
      type: "Standard",
      nextScheduled: "2024-02-12"
    },
    stabling: {
      currentBay: "B-7",
      position: "Ready Track",
      since: "22:45"
    }
  },
  {
    id: "TR-4524",
    model: "Metro Express 2020",
    status: "Active", 
    fitness: {
      status: "Due Soon",
      expiry: "2024-02-05",
      progress: 45
    },
    maintenance: {
      pending: 3,
      lastService: "2024-01-05",
      nextDue: "2024-02-20"
    },
    branding: {
      campaign: "Urban Style",
      revenue: "$12,200",
      expiry: "2024-07-10"
    },
    mileage: {
      current: 112800,
      target: 115000,
      efficiency: 94
    },
    cleaning: {
      lastCleaned: "2024-01-27",
      type: "Deep Clean",
      nextScheduled: "2024-02-10"
    },
    stabling: {
      currentBay: "A-5",
      position: "Platform Side",
      since: "19:15"
    }
  },
  {
    id: "TR-4525",
    model: "Metro Express 2022",
    status: "Active",
    fitness: {
      status: "Valid",
      expiry: "2024-11-08",
      progress: 98
    },
    maintenance: {
      pending: 0,
      lastService: "2024-01-25",
      nextDue: "2024-04-15"
    },
    branding: {
      campaign: "Green Transit",
      revenue: "$18,700",
      expiry: "2024-08-20"
    },
    mileage: {
      current: 42150,
      target: 45000,
      efficiency: 89
    },
    cleaning: {
      lastCleaned: "2024-01-30",
      type: "Standard",
      nextScheduled: "2024-02-06"
    },
    stabling: {
      currentBay: "C-2",
      position: "Ready Track", 
      since: "20:30"
    }
  },
];

export default function TrainAudit() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  
  const filteredTrains = trainData.filter(train =>
    train.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-signal-green/20 text-signal-green';
      case 'Maintenance': return 'bg-signal-amber/20 text-signal-amber';
      case 'Out of Service': return 'bg-signal-red/20 text-signal-red';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFitnessColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-signal-green/20 text-signal-green';
      case 'Due Soon': return 'bg-signal-amber/20 text-signal-amber';
      case 'Expired': return 'bg-signal-red/20 text-signal-red';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Train className="h-8 w-8 text-railway-blue" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Train Audit</h1>
          <p className="text-muted-foreground">Comprehensive train profiles and operational status</p>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="shadow-railway-md">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-signal-green">4</p>
              <p className="text-sm text-muted-foreground">Active Trains</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-signal-amber">1</p>
              <p className="text-sm text-muted-foreground">In Maintenance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-signal-red">1</p>
              <p className="text-sm text-muted-foreground">Fitness Expired</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-railway-blue">11</p>
              <p className="text-sm text-muted-foreground">Pending Jobs</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">$54.4K</p>
              <p className="text-sm text-muted-foreground">Ad Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Train List */}
        <div className="lg:col-span-2">
          <Card className="shadow-railway-md">
            <CardHeader>
              <CardTitle>Fleet Overview</CardTitle>
              <CardDescription>
                Complete list of trains with key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search trains..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {filteredTrains.map((train) => (
                  <div 
                    key={train.id} 
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-smooth cursor-pointer"
                    onClick={() => setSelectedTrain(train)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Train className="h-5 w-5 text-railway-blue" />
                        <div>
                          <h3 className="font-semibold text-foreground">{train.id}</h3>
                          <p className="text-sm text-muted-foreground">{train.model}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(train.status)}>
                          {train.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Fitness: </span>
                        <Badge className={getFitnessColor(train.fitness.status)} variant="outline">
                          {train.fitness.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pending Jobs: </span>
                        <span className="font-medium text-foreground">{train.maintenance.pending}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mileage: </span>
                        <span className="font-medium text-foreground">{train.mileage.current.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bay: </span>
                        <span className="font-medium text-foreground">{train.stabling.currentBay}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Train Detail Panel */}
        <div className="lg:col-span-1">
          {selectedTrain ? (
            <Card className="shadow-railway-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5 text-railway-blue" />
                  {selectedTrain.id}
                </CardTitle>
                <CardDescription>
                  {selectedTrain.model}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Fitness Status */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-railway-blue" />
                    <span className="font-medium text-foreground">Fitness Certificate</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={getFitnessColor(selectedTrain.fitness.status)}>
                        {selectedTrain.fitness.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expires</span>
                      <span className="text-foreground">{selectedTrain.fitness.expiry}</span>
                    </div>
                    <Progress value={selectedTrain.fitness.progress} className="h-2" />
                  </div>
                </div>

                {/* Maintenance */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-signal-amber" />
                    <span className="font-medium text-foreground">Maintenance</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending Jobs</span>
                      <Badge variant={selectedTrain.maintenance.pending > 0 ? "destructive" : "secondary"}>
                        {selectedTrain.maintenance.pending}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Service</span>
                      <span className="text-foreground">{selectedTrain.maintenance.lastService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Due</span>
                      <span className="text-foreground">{selectedTrain.maintenance.nextDue}</span>
                    </div>
                  </div>
                </div>

                {/* Branding */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-signal-green" />
                    <span className="font-medium text-foreground">Advertisement</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Campaign: </span>
                      <span className="text-foreground">{selectedTrain.branding.campaign}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Revenue: </span>
                      <span className="font-medium text-signal-green">{selectedTrain.branding.revenue}</span>
                    </div>
                  </div>
                </div>

                {/* Stabling */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-railway-blue" />
                    <span className="font-medium text-foreground">Current Location</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Bay: </span>
                      <span className="text-foreground">{selectedTrain.stabling.currentBay}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Position: </span>
                      <span className="text-foreground">{selectedTrain.stabling.position}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Since: </span>
                      <span className="text-foreground">{selectedTrain.stabling.since}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-railway-md">
              <CardContent className="p-8 text-center">
                <Train className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Select a Train</h3>
                <p className="text-muted-foreground text-sm">
                  Click on a train from the list to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}