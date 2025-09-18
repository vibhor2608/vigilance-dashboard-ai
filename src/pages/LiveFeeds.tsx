import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Camera, 
  Maximize2, 
  AlertTriangle, 
  Eye, 
  MapPin, 
  Wifi,
  WifiOff,
  Play,
  Pause
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "warning";
  hasAlert: boolean;
  detections: Array<{
    type: string;
    confidence: number;
    box: [number, number, number, number];
  }>;
}

export default function LiveFeeds() {
  const [selectedFeed, setSelectedFeed] = useState<CameraFeed | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const cameraFeeds: CameraFeed[] = [
    {
      id: "CAM-01",
      name: "Main Entrance",
      location: "Building A - Entry",
      status: "online",
      hasAlert: false,
      detections: []
    },
    {
      id: "CAM-02",
      name: "Reception Desk",
      location: "Building A - Lobby",
      status: "online", 
      hasAlert: false,
      detections: []
    },
    {
      id: "CAM-03",
      name: "Parking Entrance",
      location: "Parking Lot - Gate",
      status: "online",
      hasAlert: true,
      detections: [
        { type: "Pistol", confidence: 87, box: [120, 80, 240, 180] }
      ]
    },
    {
      id: "CAM-04",
      name: "Emergency Exit",
      location: "Building B - Rear",
      status: "warning",
      hasAlert: false,
      detections: []
    },
    {
      id: "CAM-05",
      name: "Server Room",
      location: "Building A - Floor 2",
      status: "offline",
      hasAlert: false,
      detections: []
    },
    {
      id: "CAM-06",
      name: "Cafeteria",
      location: "Building A - Floor 1",
      status: "online",
      hasAlert: false,
      detections: []
    },
    {
      id: "CAM-07",
      name: "Loading Bay",
      location: "Building C - Rear",
      status: "online",
      hasAlert: true,
      detections: [
        { type: "Knife", confidence: 92, box: [180, 120, 280, 220] }
      ]
    },
    {
      id: "CAM-08",
      name: "Conference Room",
      location: "Building A - Floor 3",
      status: "online",
      hasAlert: false,
      detections: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "success";
      case "warning": return "warning";
      case "offline": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Wifi className="h-3 w-3" />;
      case "warning": return <AlertTriangle className="h-3 w-3" />;
      case "offline": return <WifiOff className="h-3 w-3" />;
      default: return <Eye className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Camera Feeds</h1>
          <p className="text-muted-foreground">Real-time surveillance with AI weapon detection</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant={isPlaying ? "outline" : "default"}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause All" : "Resume All"}
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">8 Active Feeds</span>
          </div>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cameraFeeds.map((feed) => (
          <Card 
            key={feed.id} 
            className={`cursor-pointer transition-all hover:scale-105 ${
              feed.hasAlert ? "ring-2 ring-destructive/50 bg-destructive/5" : ""
            }`}
            onClick={() => setSelectedFeed(feed)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium truncate">{feed.name}</CardTitle>
                <Badge 
                  variant={getStatusColor(feed.status) as any}
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(feed.status)}
                  {feed.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {feed.location}
              </p>
            </CardHeader>
            
            <CardContent className="pb-3">
              {/* Mock Video Feed */}
              <div className="relative bg-gradient-to-br from-muted/50 to-muted/80 rounded-lg aspect-video mb-3 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-30" />
                
                {/* Status Overlay */}
                {feed.status === "offline" && (
                  <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
                    <div className="text-center">
                      <WifiOff className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-destructive font-medium">Feed Offline</p>
                    </div>
                  </div>
                )}
                
                {/* Detection Boxes */}
                {feed.detections.map((detection, idx) => (
                  <div 
                    key={idx}
                    className="absolute border-2 border-destructive bg-destructive/10 rounded"
                    style={{
                      left: `${(detection.box[0] / 400) * 100}%`,
                      top: `${(detection.box[1] / 300) * 100}%`,
                      width: `${((detection.box[2] - detection.box[0]) / 400) * 100}%`,
                      height: `${((detection.box[3] - detection.box[1]) / 300) * 100}%`
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                      {detection.type} ({detection.confidence}%)
                    </div>
                  </div>
                ))}
                
                {/* Alert Indicator */}
                {feed.hasAlert && (
                  <div className="absolute top-2 right-2">
                    <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
                  </div>
                )}
                
                {/* Feed ID */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {feed.id}
                </div>
                
                {/* Expand Button */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="absolute bottom-2 right-2 bg-black/50 text-white hover:bg-black/70"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Feed Info */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  1920x1080
                </span>
                {feed.detections.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {feed.detections.length} Detection{feed.detections.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Screen Feed Dialog */}
      <Dialog open={!!selectedFeed} onOpenChange={() => setSelectedFeed(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              {selectedFeed?.name} - {selectedFeed?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFeed && (
            <div className="flex-1 space-y-4">
              {/* Large Feed View */}
              <div className="relative bg-gradient-to-br from-muted/50 to-muted/80 rounded-lg aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-30" />
                
                {/* Detection Boxes */}
                {selectedFeed.detections.map((detection, idx) => (
                  <div 
                    key={idx}
                    className="absolute border-4 border-destructive bg-destructive/20 rounded"
                    style={{
                      left: `${(detection.box[0] / 400) * 100}%`,
                      top: `${(detection.box[1] / 300) * 100}%`,
                      width: `${((detection.box[2] - detection.box[0]) / 400) * 100}%`,
                      height: `${((detection.box[3] - detection.box[1]) / 300) * 100}%`
                    }}
                  >
                    <div className="absolute -top-8 left-0 bg-destructive text-destructive-foreground text-sm px-3 py-1 rounded">
                      {detection.type} - {detection.confidence}% Confidence
                    </div>
                  </div>
                ))}
                
                {/* Feed Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg">
                  <p className="font-medium">{selectedFeed.location}</p>
                  <p className="text-sm opacity-90">Resolution: 1920x1080 • 30 FPS</p>
                  <p className="text-xs opacity-75">Last Update: Live</p>
                </div>
              </div>
              
              {/* Alert Actions */}
              {selectedFeed.hasAlert && (
                <div className="flex items-center gap-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <div className="flex-1">
                    <p className="font-medium text-destructive">Weapon Detection Alert</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedFeed.detections.length} threat{selectedFeed.detections.length > 1 ? 's' : ''} detected - Immediate response required
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      False Alarm
                    </Button>
                    <Button variant="destructive" size="sm">
                      Confirm Threat
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}