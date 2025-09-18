import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

export default function Analytics() {
  // Mock data for charts
  const alertsPerDay = [
    { date: "Sep 12", alerts: 4, confirmed: 2, falseAlarms: 2 },
    { date: "Sep 13", alerts: 7, confirmed: 5, falseAlarms: 2 },
    { date: "Sep 14", alerts: 3, confirmed: 2, falseAlarms: 1 },
    { date: "Sep 15", alerts: 9, confirmed: 6, falseAlarms: 3 },
    { date: "Sep 16", alerts: 12, confirmed: 8, falseAlarms: 4 },
    { date: "Sep 17", alerts: 6, confirmed: 4, falseAlarms: 2 },
    { date: "Sep 18", alerts: 15, confirmed: 11, falseAlarms: 4 }
  ];

  const weaponTypeDistribution = [
    { name: "Pistol", value: 45, count: 23 },
    { name: "Knife", value: 30, count: 15 },
    { name: "Rifle", value: 20, count: 10 },
    { name: "Other", value: 5, count: 3 }
  ];

  const detectionAccuracy = [
    { month: "May", accuracy: 78, totalDetections: 145 },
    { month: "Jun", accuracy: 82, totalDetections: 167 },
    { month: "Jul", accuracy: 85, totalDetections: 198 },
    { month: "Aug", accuracy: 88, totalDetections: 223 },
    { month: "Sep", accuracy: 91, totalDetections: 201 }
  ];

  const hourlyActivity = [
    { hour: "00", detections: 2 },
    { hour: "01", detections: 1 },
    { hour: "02", detections: 0 },
    { hour: "03", detections: 1 },
    { hour: "04", detections: 0 },
    { hour: "05", detections: 1 },
    { hour: "06", detections: 3 },
    { hour: "07", detections: 5 },
    { hour: "08", detections: 8 },
    { hour: "09", detections: 12 },
    { hour: "10", detections: 15 },
    { hour: "11", detections: 18 },
    { hour: "12", detections: 22 },
    { hour: "13", detections: 25 },
    { hour: "14", detections: 28 },
    { hour: "15", detections: 24 },
    { hour: "16", detections: 20 },
    { hour: "17", detections: 16 },
    { hour: "18", detections: 12 },
    { hour: "19", detections: 8 },
    { hour: "20", detections: 5 },
    { hour: "21", detections: 3 },
    { hour: "22", detections: 2 },
    { hour: "23", detections: 1 }
  ];

  const COLORS = ['hsl(var(--destructive))', 'hsl(var(--warning))', 'hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Analytics</h1>
          <p className="text-muted-foreground">Performance metrics and threat intelligence</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">91.2%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-success" />
              +3.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">8.8%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-success" />
              -1.5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">Within SLA: 95%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Detections</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">201</div>
            <p className="text-xs text-muted-foreground">
              Target: 180 ({Math.round((201/180) * 100)}% of target)
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Alerts Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Daily Alert Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertsPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="confirmed" fill="hsl(var(--destructive))" name="Confirmed Threats" />
                <Bar dataKey="falseAlarms" fill="hsl(var(--muted))" name="False Alarms" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded" />
                <span>Confirmed Threats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded" />
                <span>False Alarms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weapon Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weapon Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={weaponTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {weaponTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {weaponTypeDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{item.name}: {item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Detection Accuracy Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Detection Accuracy Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={detectionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Accuracy %" 
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 text-success">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">Improving Performance</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Accuracy has improved by 13% over the last 5 months through model refinements and training.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              24-Hour Activity Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="detections" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.3)"
                  name="Detections"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-2 bg-muted/50 rounded">
                <p className="font-medium">Peak Hours</p>
                <p className="text-muted-foreground">12:00 - 15:00</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded">
                <p className="font-medium">Low Activity</p>
                <p className="text-muted-foreground">22:00 - 06:00</p>
              </div>
              <div className="text-center p-2 bg-muted/50 rounded">
                <p className="font-medium">Daily Average</p>
                <p className="text-muted-foreground">12.5 alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary & Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="secondary" className="bg-success/20 text-success-foreground">Excellent</Badge>
                Detection Accuracy
              </h4>
              <p className="text-sm text-muted-foreground">
                Current accuracy of 91.2% exceeds industry standards. Model performance has consistently improved over the past quarter.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">Monitor</Badge>
                Peak Hour Load
              </h4>
              <p className="text-sm text-muted-foreground">
                Detection load increases significantly during business hours (12-15:00). Consider resource scaling for optimal performance.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="destructive">Action Required</Badge>
                Response Time
              </h4>
              <p className="text-sm text-muted-foreground">
                Average response time of 2.3 minutes meets SLA but shows room for improvement during peak hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}