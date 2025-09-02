import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AppLayout() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("railway-auth");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("railway-auth");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shadow-railway-sm transition-colors duration-300">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-foreground">Railway Operations Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                {t('welcome')} back, Operations Manager
              </div>
              <ThemeToggle />
              <LanguageSwitcher />
              <button 
                onClick={handleLogout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {t('logout')}
              </button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-gradient-subtle transition-colors duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}