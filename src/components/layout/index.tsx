import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import NotificationBell from "@/components/layout/notification-bell";
import { Search } from "@/components/search";
import SkipToMain from "@/components/skip-to-main";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

function LayoutDefault() {
  const defaultOpen = Cookies.get("sidebar_state") !== "false";
  return (
    <SearchProvider>
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
              <Search />
              <ThemeSwitch />
              <NotificationBell />
              {/* <ProfileDropdown /> */}
            </div>
          </Header>

          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
export default LayoutDefault;
