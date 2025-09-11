"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import axios from "@/lib/axios";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SideHeader } from "./side-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  async function LogoutHandler() {
    try {
      const res = await axios.post("/v1/auth/logout");
      if (!res) {
        toast.error("Couldn't log user out. Please try again.");
        return;
      }
      toast("User has been logged out!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    header: {
      name: "CodeSnipVault",
      logo: GalleryVerticalEnd,
    },
    navMain: [
      {
        title: "Dashboard",
        onClick: () => router.push("/dashboard"),
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Create Snippet",
        onClick: () => router.push("/creation"),
        icon: Bot,
      },
      {
        title: "Account",
        onClick: () => router.push("/profile"),
        icon: BookOpen,
      },
      {
        title: "Logout",
        onClick: () => LogoutHandler(),
        icon: Settings2,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideHeader header={data.header} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
