import { Routes, Route, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  Shield,
  FileText,
  Palette,
  MapPin,
  Wrench,
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

// Sample data for different modules
const fitnessData = [
  { id: "TR-4521", status: "Valid", expiry: "2024-03-15", type: "Annual", risk: "Low" },
  { id: "TR-4522", status: "Expired", expiry: "2024-01-20", type: "Monthly", risk: "High" },
  { id: "TR-4523", status: "Valid", expiry: "2024-05-10", type: "Annual", risk: "Low" },
  { id: "TR-4524", status: "Due Soon", expiry: "2024-02-05", type: "Quarterly", risk: "Medium" },
];

const jobCardData = [
  { id: "JC-2024-001", train: "TR-4521", type: "Brake System", status: "Open", priority: "High", assigned: "Team A" },
  { id: "JC-2024-002", train: "TR-4522", type: "Engine Check", status: "In Progress", priority: "Medium", assigned: "Team B" },
  { id: "JC-2024-003", train: "TR-4523", type: "Cleaning", status: "Closed", priority: "Low", assigned: "Team C" },
  { id: "JC-2024-004", train: "TR-4524", type: "Electrical", status: "Open", priority: "High", assigned: "Team A" },
];

function DataModule({ 
  title, 
  icon: Icon, 
  data, 
  columns 
}: { 
  title: string; 
  icon: any; 
  data: any[]; 
  columns: { key: string; label: string; }[]
}) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = data.filter(item =>
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      "Valid": "bg-signal-green/20 text-signal-green",
      "Expired": "bg-signal-red/20 text-signal-red", 
      "Due Soon": "bg-signal-amber/20 text-signal-amber",
      "Open": "bg-signal-red/20 text-signal-red",
      "In Progress": "bg-signal-amber/20 text-signal-amber",
      "Closed": "bg-signal-green/20 text-signal-green",
    };
    return variants[status] || "bg-muted text-muted-foreground";
  };

  return (
    <Card className="shadow-railway-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-railway-blue" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          Operational data and analytics for {title.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th key={column.key} className="text-left p-3 font-medium text-muted-foreground">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-accent/50 transition-smooth">
                  {columns.map((column) => (
                    <td key={column.key} className="p-3">
                      {column.key === 'status' ? (
                        <Badge className={getStatusBadge(item[column.key])}>
                          {item[column.key]}
                        </Badge>
                      ) : (
                        <span className="text-foreground">{item[column.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DataPrediction() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-railway-blue" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Prediction & Analytics</h1>
          <p className="text-muted-foreground">Operational data analysis and predictive insights</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Predictions</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <TrendingUp className="h-8 w-8 text-railway-blue" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Alerts</p>
                <p className="text-2xl font-bold text-signal-amber">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-signal-amber" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-railway-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Sources</p>
                <p className="text-2xl font-bold text-foreground">6</p>
              </div>
              <Shield className="h-8 w-8 text-signal-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Modules Tabs */}
      <Tabs defaultValue="fitness" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="fitness" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Fitness
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Job Cards
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="mileage" className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Mileage
          </TabsTrigger>
          <TabsTrigger value="cleaning" className="flex items-center gap-1">
            <Wrench className="h-4 w-4" />
            Cleaning
          </TabsTrigger>
          <TabsTrigger value="stabling" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Stabling
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fitness">
          <DataModule
            title="Fitness Certificates"
            icon={Shield}
            data={fitnessData}
            columns={[
              { key: 'id', label: 'Train ID' },
              { key: 'status', label: 'Status' },
              { key: 'expiry', label: 'Expiry Date' },
              { key: 'type', label: 'Certificate Type' },
              { key: 'risk', label: 'Risk Level' },
            ]}
          />
        </TabsContent>

        <TabsContent value="jobs">
          <DataModule
            title="Job-Card Status"
            icon={FileText}
            data={jobCardData}
            columns={[
              { key: 'id', label: 'Job ID' },
              { key: 'train', label: 'Train' },
              { key: 'type', label: 'Work Type' },
              { key: 'status', label: 'Status' },
              { key: 'priority', label: 'Priority' },
              { key: 'assigned', label: 'Assigned To' },
            ]}
          />
        </TabsContent>

        <TabsContent value="branding">
          <DataModule
            title="Branding Priorities"
            icon={Palette}
            data={[
              { campaign: "Metro Express", train: "TR-4521", status: "Active", expiry: "2024-06-15", revenue: "$15,000" },
              { campaign: "City Transit", train: "TR-4522", status: "Expired", expiry: "2024-01-30", revenue: "$12,500" },
            ]}
            columns={[
              { key: 'campaign', label: 'Campaign' },
              { key: 'train', label: 'Train' },
              { key: 'status', label: 'Status' },
              { key: 'expiry', label: 'Expiry' },
              { key: 'revenue', label: 'Revenue' },
            ]}
          />
        </TabsContent>

        <TabsContent value="mileage">
          <DataModule
            title="Mileage Balancing"
            icon={MapPin}
            data={[
              { train: "TR-4521", mileage: "125,430", target: "130,000", variance: "+3.5%", efficiency: "High" },
              { train: "TR-4522", mileage: "98,750", target: "100,000", variance: "-1.3%", efficiency: "Normal" },
            ]}
            columns={[
              { key: 'train', label: 'Train ID' },
              { key: 'mileage', label: 'Current Mileage' },
              { key: 'target', label: 'Target' },
              { key: 'variance', label: 'Variance' },
              { key: 'efficiency', label: 'Efficiency' },
            ]}
          />
        </TabsContent>

        <TabsContent value="cleaning">
          <DataModule
            title="Cleaning & Detailing Slots"
            icon={Wrench}
            data={[
              { train: "TR-4521", slot: "Bay 3", scheduled: "2024-02-01 14:00", status: "Completed", type: "Deep Clean" },
              { train: "TR-4522", slot: "Bay 1", scheduled: "2024-02-01 16:00", status: "In Progress", type: "Standard" },
            ]}
            columns={[
              { key: 'train', label: 'Train ID' },
              { key: 'slot', label: 'Bay/Slot' },
              { key: 'scheduled', label: 'Scheduled Time' },
              { key: 'status', label: 'Status' },
              { key: 'type', label: 'Cleaning Type' },
            ]}
          />
        </TabsContent>

        <TabsContent value="stabling">
          <DataModule
            title="Stabling Geometry"
            icon={Calendar}
            data={[
              { train: "TR-4521", bay: "A-12", position: "Platform Side", occupied: "18:30", departure: "05:45", status: "Occupied" },
              { train: "TR-4522", bay: "B-7", position: "Maintenance", occupied: "20:15", departure: "06:30", status: "Available" },
            ]}
            columns={[
              { key: 'train', label: 'Train ID' },
              { key: 'bay', label: 'Bay' },
              { key: 'position', label: 'Position' },
              { key: 'occupied', label: 'Occupied Since' },
              { key: 'departure', label: 'Departure Time' },
              { key: 'status', label: 'Status' },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}