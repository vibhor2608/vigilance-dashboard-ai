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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Archive,
  Download,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Video,
  Image,
  FileText,
  Eye,
  Share2,
} from "lucide-react";

interface EvidenceItem {
  id: string;
  alertId: string;
  timestamp: string;
  cameraId: string;
  location: string;
  weaponType: string;
  confidence: number;
  threatScore: number;
  thumbnailUrl: string;
  videoUrl: string;
  reportUrl: string;
  fileSize: string;
  duration: string;
  status: "archived" | "processing" | "available";
}

export default function EvidenceArchive() {
  const [selectedWeapon, setSelectedWeapon] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const evidenceItems: EvidenceItem[] = [
    {
      id: "EVD-2024-001",
      alertId: "ALT-2024-001",
      timestamp: "2024-09-18 14:32:15",
      cameraId: "CAM-03",
      location: "Main Entrance - Building A",
      weaponType: "Rifle",
      confidence: 87,
      threatScore: 85,
      thumbnailUrl: "/cctv1.jpg",
      videoUrl: "/evidence/video-001.mp4",
      reportUrl: "/evidence/report-001.pdf",
      fileSize: "45.2 MB",
      duration: "2:15",
      status: "available",
    },
    {
      id: "EVD-2024-002",
      alertId: "ALT-2024-002",
      timestamp: "2024-09-18 14:28:42",
      cameraId: "CAM-07",
      location: "Parking Lot - Gate B",
      weaponType: "Knife",
      confidence: 92,
      threatScore: 72,
      thumbnailUrl: "/cctv2.png",
      videoUrl: "/evidence/video-002.mp4",
      reportUrl: "/evidence/report-002.pdf",
      fileSize: "32.8 MB",
      duration: "1:45",
      status: "available",
    },
    {
      id: "EVD-2024-003",
      alertId: "ALT-2024-003",
      timestamp: "2024-09-18 14:15:08",
      cameraId: "CAM-01",
      location: "Reception - Building A",
      weaponType: "Rifle",
      confidence: 95,
      threatScore: 95,
      thumbnailUrl: "/cctv3.png",
      videoUrl: "/evidence/video-003.mp4",
      reportUrl: "/evidence/report-003.pdf",
      fileSize: "67.1 MB",
      duration: "3:22",
      status: "available",
    },
    {
      id: "EVD-2024-004",
      alertId: "ALT-2024-004",
      timestamp: "2024-09-18 13:45:22",
      cameraId: "CAM-12",
      location: "Emergency Exit - Building C",
      weaponType: "Pistol",
      confidence: 78,
      threatScore: 92,
      thumbnailUrl: "/cctv4.png",
      videoUrl: "/evidence/video-004.mp4",
      reportUrl: "/evidence/report-004.pdf",
      fileSize: "28.5 MB",
      duration: "1:30",
      status: "archived",
    },
    {
      id: "EVD-2024-005",
      alertId: "ALT-2024-005",
      timestamp: "2024-09-18 13:20:15",
      cameraId: "CAM-05",
      location: "Server Room - Building A",
      weaponType: "Knife",
      confidence: 89,
      threatScore: 70,
      thumbnailUrl: "/cctv5.png`",
      videoUrl: "/evidence/video-005.mp4",
      reportUrl: "/evidence/report-005.pdf",
      fileSize: "41.7 MB",
      duration: "2:05",
      status: "processing",
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
      case "available":
        return "success";
      case "processing":
        return "warning";
      case "archived":
        return "secondary";
      default:
        return "default";
    }
  };

  const filteredItems = evidenceItems.filter((item) => {
    const matchesWeapon =
      selectedWeapon === "all" ||
      item.weaponType.toLowerCase() === selectedWeapon;
    const matchesSeverity =
      selectedSeverity === "all" ||
      getSeverityLevel(item.threatScore) === selectedSeverity;
    const matchesSearch =
      searchTerm === "" ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesWeapon && matchesSeverity && matchesSearch;
  });

  const downloadEvidence = (item: EvidenceItem) => {
    // In real app, this would trigger file download
    console.log(`Downloading evidence package: ${item.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Evidence Archive
          </h1>
          <p className="text-muted-foreground">
            Forensic evidence packages from weapon detections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Bulk Export
          </Button>
          <Badge variant="outline">
            {evidenceItems.length} Evidence Packages
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Evidence
            </CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evidenceItems.length}</div>
            <p className="text-xs text-muted-foreground">Packages archived</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Video className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {evidenceItems.filter((i) => i.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {evidenceItems.filter((i) => i.status === "processing").length}
            </div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1 GB</div>
            <p className="text-xs text-muted-foreground">15% of capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search evidence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={selectedWeapon} onValueChange={setSelectedWeapon}>
              <SelectTrigger>
                <SelectValue placeholder="Weapon type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weapons</SelectItem>
                <SelectItem value="pistol">Pistol</SelectItem>
                <SelectItem value="rifle">Rifle</SelectItem>
                <SelectItem value="knife">Knife</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? dateFrom.toLocaleDateString() : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? dateTo.toLocaleDateString() : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={item.thumbnailUrl}
                alt="Evidence thumbnail"
                className="w-full h-40 object-cover bg-muted"
              />

              {/* Status Badge */}
              <Badge
                variant={getStatusColor(item.status) as any}
                className="absolute top-2 left-2"
              >
                {item.status.toUpperCase()}
              </Badge>

              {/* Severity Badge */}
              <Badge
                variant={getSeverityColor(item.threatScore) as any}
                className="absolute top-2 right-2"
              >
                {getSeverityLevel(item.threatScore).toUpperCase()}
              </Badge>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>

            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{item.id}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {item.weaponType}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.location}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Camera:</span>
                  <p className="font-medium">{item.cameraId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">{item.duration}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <p className="font-medium">{item.confidence}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <p className="font-medium">{item.fileSize}</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleString()}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={item.status === "processing"}
                  onClick={() => downloadEvidence(item)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No evidence packages match your current filters
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedWeapon("all");
                setSelectedSeverity("all");
                setDateFrom(undefined);
                setDateTo(undefined);
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
