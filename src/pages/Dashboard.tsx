import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  AlertTriangle,
  Shield,
  Activity,
  MapPin,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const alerts = [
    {
      id: "ALT-001",
      camera: "CAM-03",
      location: "Main Entrance",
      weapon: "Pistol",
      confidence: 87,
      timestamp: "2 min ago",
      severity: "high",
    },
    {
      id: "ALT-002",
      camera: "CAM-07",
      location: "Parking Lot",
      weapon: "Knife",
      confidence: 92,
      timestamp: "8 min ago",
      severity: "medium",
    },
    {
      id: "ALT-003",
      camera: "CAM-01",
      location: "Reception",
      weapon: "Rifle",
      confidence: 95,
      timestamp: "15 min ago",
      severity: "high",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-warning/10 border-warning/20";
      default:
        return "bg-muted/50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Defense Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time weapon detection and threat monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">
            All Systems Operational
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Cameras
            </CardTitle>
            <Camera className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/6</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
            <Progress value={85.7} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              24h Detections
            </CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">98.2%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getSeverityBg(
                    alert.severity
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{alert.id}</span>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{alert.weapon} detected</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {alert.camera}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{alert.confidence}%</p>
                      <p className="text-xs text-muted-foreground">
                        confidence
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Review
                    </Button>
                    <Button size="sm" variant="destructive" className="flex-1">
                      Respond
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Threat Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Threat Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Zone Risk Levels */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div>
                    <p className="font-medium">Main Entrance</p>
                    <p className="text-sm text-muted-foreground">Zone A1</p>
                  </div>
                  <Badge variant="destructive">HIGH RISK</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div>
                    <p className="font-medium">Parking Lot</p>
                    <p className="text-sm text-muted-foreground">Zone B2</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-warning/20 text-warning-foreground"
                  >
                    MEDIUM
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div>
                    <p className="font-medium">Office Area</p>
                    <p className="text-sm text-muted-foreground">Zone C3</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-success/20 text-success-foreground"
                  >
                    LOW
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Server Room</p>
                    <p className="text-sm text-muted-foreground">Zone D4</p>
                  </div>
                  <Badge variant="secondary">SECURE</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  Risk Assessment
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-destructive/10 rounded">
                    <p className="font-medium text-destructive">3</p>
                    <p className="text-muted-foreground">High Risk</p>
                  </div>
                  <div className="text-center p-2 bg-warning/10 rounded">
                    <p className="font-medium text-warning-foreground">5</p>
                    <p className="text-muted-foreground">Medium</p>
                  </div>
                  <div className="text-center p-2 bg-success/10 rounded">
                    <p className="font-medium text-success-foreground">6</p>
                    <p className="text-muted-foreground">Low Risk</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
