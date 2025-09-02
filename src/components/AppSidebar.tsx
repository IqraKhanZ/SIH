import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Brain,
  Settings,
  Train,
  FileText,
  Shield,
  Palette,
  MapPin,
  Wrench,
  Calendar,
  Upload
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

const mainItems = [
  { title: "dashboard", url: "/", icon: LayoutDashboard },
  { title: "inputUpload", url: "/input-upload", icon: Upload },
  { title: "dataPrediction", url: "/data-prediction", icon: BarChart3 },
  { title: "mlAnalysis", url: "/ml-analysis", icon: Brain },
  { title: "simulation", url: "/simulation", icon: Settings },
  { title: "trainAudit", url: "/train-audit", icon: Train },
];

const dataModules = [
  { title: "fitnessCertificates", url: "/data-prediction/fitness", icon: Shield },
  { title: "jobCardStatus", url: "/data-prediction/jobs", icon: FileText },
  { title: "brandingPriorities", url: "/data-prediction/branding", icon: Palette },
  { title: "mileageBalancing", url: "/data-prediction/mileage", icon: MapPin },
  { title: "cleaningDetailing", url: "/data-prediction/cleaning", icon: Wrench },
  { title: "stablingGeometry", url: "/data-prediction/stabling", icon: Calendar },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-railway-blue text-white shadow-railway-sm" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card border-r transition-colors duration-300">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Train className="h-8 w-8 text-railway-blue" />
            <div>
              <h2 className="font-bold text-foreground">Railway Ops</h2>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{t('mainNavigation') || 'Main Navigation'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`${getNavClass(item.url)} transition-colors duration-300`}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{t(item.title)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('dataModules') || 'Data Modules'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataModules.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} transition-colors duration-300`}
                    >
                      <item.icon className="mr-2 h-3 w-3" />
                      <span className="text-sm">{t(item.title)}</span>
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