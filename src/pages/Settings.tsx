import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Settings as SettingsIcon, 
  Camera, 
  Users, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Wifi,
  WifiOff,
  MapPin,
  UserPlus
} from "lucide-react";

interface CameraConfig {
  id: string;
  name: string;
  location: string;
  rtspUrl: string;
  status: "online" | "offline" | "maintenance";
  resolution: string;
  fps: number;
  detectionEnabled: boolean;
}

interface UserAccount {
  id: string;
  username: string;
  email: string;
  role: "admin" | "operator" | "auditor";
  status: "active" | "inactive";
  lastLogin: string;
}

export default function Settings() {
  const [cameras, setCameras] = useState<CameraConfig[]>([
    {
      id: "CAM-01",
      name: "Main Entrance",
      location: "Building A - Entry",
      rtspUrl: "rtsp://192.168.1.101:554/stream1",
      status: "online",
      resolution: "1920x1080",
      fps: 30,
      detectionEnabled: true
    },
    {
      id: "CAM-02", 
      name: "Reception Desk",
      location: "Building A - Lobby",
      rtspUrl: "rtsp://192.168.1.102:554/stream1",
      status: "online",
      resolution: "1920x1080", 
      fps: 30,
      detectionEnabled: true
    },
    {
      id: "CAM-03",
      name: "Parking Entrance",
      location: "Parking Lot - Gate",
      rtspUrl: "rtsp://192.168.1.103:554/stream1",
      status: "maintenance",
      resolution: "1920x1080",
      fps: 25,
      detectionEnabled: false
    }
  ]);

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: "USR-01",
      username: "admin",
      email: "admin@chowkidar.ai",
      role: "admin",
      status: "active",
      lastLogin: "2024-09-18 14:30:00"
    },
    {
      id: "USR-02",
      username: "operator1", 
      email: "operator1@chowkidar.ai",
      role: "operator",
      status: "active",
      lastLogin: "2024-09-18 14:25:00"
    },
    {
      id: "USR-03",
      username: "auditor1",
      email: "auditor1@chowkidar.ai", 
      role: "auditor",
      status: "active",
      lastLogin: "2024-09-18 09:15:00"
    }
  ]);

  const [showPasswords, setShowPasswords] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<CameraConfig | null>(null);
  const [isAddingCamera, setIsAddingCamera] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": case "active": return "success";
      case "maintenance": case "inactive": return "warning";
      case "offline": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Wifi className="h-3 w-3" />;
      case "offline": return <WifiOff className="h-3 w-3" />;
      default: return <Eye className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "destructive";
      case "operator": return "warning";
      case "auditor": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure cameras, users, and system parameters</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {cameras.length} Cameras
          </Badge>
          <Badge variant="outline">
            {users.length} Users
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="cameras" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cameras">Camera Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="detection">Detection Settings</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
        </TabsList>

        {/* Camera Management */}
        <TabsContent value="cameras" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Configuration
              </CardTitle>
              <Dialog open={isAddingCamera} onOpenChange={setIsAddingCamera}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Camera
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Camera</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Camera Name</Label>
                        <Input id="name" placeholder="e.g., Main Entrance" />
                      </div>
                      <div>
                        <Label htmlFor="id">Camera ID</Label>
                        <Input id="id" placeholder="e.g., CAM-04" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Building A - Floor 2" />
                    </div>
                    <div>
                      <Label htmlFor="rtsp">RTSP URL</Label>
                      <Input id="rtsp" placeholder="rtsp://192.168.1.xxx:554/stream1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="resolution">Resolution</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                            <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                            <SelectItem value="640x480">640x480 (SD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="fps">Frame Rate (FPS)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select FPS" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 FPS</SelectItem>
                            <SelectItem value="25">25 FPS</SelectItem>
                            <SelectItem value="15">15 FPS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="detection" defaultChecked />
                      <Label htmlFor="detection">Enable weapon detection</Label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddingCamera(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddingCamera(false)}>
                        Add Camera
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Camera</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resolution</TableHead>
                    <TableHead>Detection</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cameras.map((camera) => (
                    <TableRow key={camera.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{camera.name}</p>
                          <p className="text-sm text-muted-foreground">{camera.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {camera.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getStatusColor(camera.status) as any}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(camera.status)}
                          {camera.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{camera.resolution}</p>
                          <p className="text-xs text-muted-foreground">{camera.fps} FPS</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={camera.detectionEnabled} 
                          onCheckedChange={(checked) => {
                            setCameras(cameras.map(c => 
                              c.id === camera.id ? { ...c, detectionEnabled: checked } : c
                            ));
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Accounts
              </CardTitle>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(user.role) as any}>
                          {user.role.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(user.status) as any}>
                          {user.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(user.lastLogin).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detection Settings */}
        <TabsContent value="detection" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detection Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="confidence">Minimum Confidence (%)</Label>
                  <Input id="confidence" type="number" defaultValue="75" min="0" max="100" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Detections below this threshold will be filtered out
                  </p>
                </div>
                <div>
                  <Label htmlFor="threat">High Threat Threshold (%)</Label>
                  <Input id="threat" type="number" defaultValue="80" min="0" max="100" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Scores above this will trigger immediate alerts
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="realtime" defaultChecked />
                  <Label htmlFor="realtime">Real-time processing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="recording" defaultChecked />
                  <Label htmlFor="recording">Auto-record on detection</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email" defaultChecked />
                  <Label htmlFor="email">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sms" />
                  <Label htmlFor="sms">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="webhook" />
                  <Label htmlFor="webhook">Webhook integration</Label>
                </div>
                <div>
                  <Label htmlFor="retention">Evidence retention (days)</Label>
                  <Input id="retention" type="number" defaultValue="90" min="1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Config */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="session">Session timeout (minutes)</Label>
                  <Input id="session" type="number" defaultValue="60" min="5" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" />
                  <Label htmlFor="2fa">Require 2FA for admins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="audit" defaultChecked />
                  <Label htmlFor="audit">Audit logging</Label>
                </div>
                <div>
                  <Label htmlFor="backup">Auto backup interval (hours)</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Every 6 hours</SelectItem>
                      <SelectItem value="12">Every 12 hours</SelectItem>
                      <SelectItem value="24">Daily</SelectItem>
                      <SelectItem value="168">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Version:</span>
                    <p className="font-medium">Chowkidar AI v2.1.0</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Database:</span>
                    <p className="font-medium">PostgreSQL 15.2</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uptime:</span>
                    <p className="font-medium">15 days, 8 hours</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Storage:</span>
                    <p className="font-medium">2.1 GB / 100 GB</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Download System Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}