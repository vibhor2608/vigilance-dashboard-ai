import { SidebarTrigger } from "@/components/ui/sidebar";
import { Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-card/50 backdrop-blur">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Chowkidar AI
            </h1>
            <p className="text-xs text-muted-foreground">Defense-Grade Surveillance</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
          <span className="text-muted-foreground">System Active</span>
        </div>
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
            3
          </Badge>
        </Button>
      </div>
    </header>
  );
}