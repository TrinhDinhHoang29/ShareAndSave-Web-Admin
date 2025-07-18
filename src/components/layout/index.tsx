import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import NotificationBell from "@/components/layout/notification-bell";
import SkipToMain from "@/components/skip-to-main";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

function LayoutDefault() {
  const defaultOpen = Cookies.get("sidebar_state") !== "false";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SkipToMain />
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
        )}
      >
        {/* ===== Top Heading ===== */}
        <Header>
          {/* <TopNav links={topNav} /> */}

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <NotificationBell />
            {/* <ProfileDropdown /> */}
          </div>
        </Header>

        <Outlet />
      </div>
    </SidebarProvider>
  );
}
export default LayoutDefault;
