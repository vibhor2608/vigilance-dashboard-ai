import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  UserCheck,
  Clock,
  MapPin,
  Camera,
} from "lucide-react";

interface Alert {
  id: string;
  timestamp: string;
  cameraId: string;
  location: string;
  weaponType: string;
  confidence: number;
  threatScore: number;
  status: "pending" | "confirmed" | "false_alarm" | "investigating";
  assignedTo?: string;
  imageUrl?: string;
  notes?: string;
}

export default function Alerts() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const alerts: Alert[] = [
    {
      id: "ALT-2024-001",
      timestamp: "2024-09-18 14:32:15",
      cameraId: "CAM-03",
      location: "Car Parking - Building A",
      weaponType: "Pistol",
      confidence: 87,
      threatScore: 85,
      status: "pending",
      imageUrl: "/cctv4.png",
    },
    {
      id: "ALT-2024-002",
      timestamp: "2024-09-18 14:28:42",
      cameraId: "CAM-07",
      location: "Room 204 - Building B",
      weaponType: "Knife",
      confidence: 92,
      threatScore: 72,
      status: "investigating",
      assignedTo: "Officer Johnson",
      imageUrl: "/cctv5.png",
    },
    {
      id: "ALT-2024-003",
      timestamp: "2024-09-18 14:15:08",
      cameraId: "CAM-01",
      location: "Main Gate ",
      weaponType: "Rifle",
      confidence: 95,
      threatScore: 95,
      status: "confirmed",
      assignedTo: "Sgt. Williams",
      imageUrl: "/cctv1.jpg",
      notes: "Security team responded. Suspect apprehended.",
    },
    {
      id: "ALT-2024-004",
      timestamp: "2024-09-18 13:45:22",
      cameraId: "CAM-12",
      location: "Emergency Exit - Building C",
      weaponType: "Pistol",
      confidence: 78,
      threatScore: 65,
      status: "false_alarm",
      assignedTo: "Officer Davis",
      imageUrl: "/cctv2.png",
      notes: "False positive - was a realistic toy prop.",
    },
    {
      id: "ALT-2024-005",
      timestamp: "2024-09-18 13:20:15",
      cameraId: "CAM-05",
      location: "Server Room - Building A",
      weaponType: "Knife",
      confidence: 89,
      threatScore: 80,
      status: "pending",
      imageUrl: "/cctv3.png",
    },
  ];

  const getSeverityLevel = (threatScore: number) => {
    if (threatScore >= 80) return "high";
    if (threatScore >= 60) return "medium";
    return "low";
  };

  const getSeverityColor = (threatScore: number) => {
    const level = getSeverityLevel(threatScore);
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "destructive";
      case "investigating":
        return "warning";
      case "false_alarm":
        return "secondary";
      default:
        return "default";
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus =
      selectedStatus === "all" || alert.status === selectedStatus;
    const matchesSeverity =
      selectedSeverity === "all" ||
      getSeverityLevel(alert.threatScore) === selectedSeverity;
    const matchesSearch =
      searchTerm === "" ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.weaponType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const updateAlertStatus = (
    alertId: string,
    newStatus: Alert["status"],
    assignedTo?: string
  ) => {
    // In real app, this would make an API call
    console.log(`Updating alert ${alertId} to ${newStatus}`, { assignedTo });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Alert Management
          </h1>
          <p className="text-muted-foreground">
            Review and respond to weapon detection alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="animate-pulse">
            {alerts.filter((a) => a.status === "pending").length} Pending Review
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {alerts.filter((a) => a.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmed Threats
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {alerts.filter((a) => a.status === "confirmed").length}
            </div>
            <p className="text-xs text-muted-foreground">Verified incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Alarms</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.status === "false_alarm").length}
            </div>
            <p className="text-xs text-muted-foreground">Accuracy: 80%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts, locations, weapons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="false_alarm">False Alarm</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Queue ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Weapon Type</TableHead>
                <TableHead>Threat Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-mono">{alert.id}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(alert.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{alert.location}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {alert.cameraId}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{alert.weaponType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getSeverityColor(alert.threatScore) as any}
                      >
                        {alert.threatScore}%
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({getSeverityLevel(alert.threatScore).toUpperCase()})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(alert.status) as any}>
                      {alert.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {alert.assignedTo ? (
                      <div className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{alert.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Unassigned
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAlert(alert)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              Alert Details - {alert.id}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Detection Image
                                </h4>
                                <div className="relative bg-muted rounded-lg aspect-video">
                                  <img
                                    src="/placeholder.svg"
                                    alt="Detection"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                  {/* Mock detection box */}
                                  <div className="absolute inset-1/4 border-2 border-destructive bg-destructive/10 rounded">
                                    <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                                      {alert.weaponType} ({alert.confidence}%)
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Alert Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Camera:
                                      </span>
                                      <span>{alert.cameraId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Location:
                                      </span>
                                      <span>{alert.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Weapon Type:
                                      </span>
                                      <span>{alert.weaponType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Confidence:
                                      </span>
                                      <span>{alert.confidence}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">
                                        Threat Score:
                                      </span>
                                      <Badge
                                        variant={
                                          getSeverityColor(
                                            alert.threatScore
                                          ) as any
                                        }
                                      >
                                        {alert.threatScore}%
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {alert.notes && (
                                  <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                      {alert.notes}
                                    </p>
                                  </div>
                                )}

                                <div className="flex gap-2 pt-4">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() =>
                                      updateAlertStatus(alert.id, "confirmed")
                                    }
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Confirm Threat
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() =>
                                      updateAlertStatus(alert.id, "false_alarm")
                                    }
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    False Alarm
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {alert.status === "pending" && (
                        <>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              updateAlertStatus(alert.id, "confirmed")
                            }
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateAlertStatus(alert.id, "false_alarm")
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No alerts match your current filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
