import { SidebarMenuButton } from "@/components/ui/sidebar";
import * as React from "react";
import { Link } from "react-router-dom";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const [activeTeam] = React.useState(teams[0]);

  return (
    <Link to={"/"}>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <activeTeam.logo className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold ">{teams[0].name}</span>
          <span className="truncate text-xs">{teams[0].plan}</span>
        </div>
      </SidebarMenuButton>
    </Link>
  );
}
