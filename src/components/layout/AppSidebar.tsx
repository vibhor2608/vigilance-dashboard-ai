import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Shield,
  AlertTriangle,
  Camera,
  Archive,
  Settings,
  Activity
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Live Feeds", url: "/feeds", icon: Camera },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Evidence Archive", url: "/archive", icon: Archive },
  { title: "Analytics", url: "/analytics", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    return isActive(path)
      ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-r-2 border-primary"
      : "hover:bg-accent/50 hover:text-accent-foreground";
  };

  return (
    <Sidebar className="border-r bg-sidebar-background">
      <SidebarContent className="p-4">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-sidebar-foreground">Chowkidar</h2>
              <p className="text-xs text-sidebar-foreground/60">v2.1.0</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}