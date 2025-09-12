"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  FolderCode,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import axios from "@/lib/axios";
import {
  Sidebar,
  SidebarContent,
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
        isActive: true,
      },
      {
        title: "Organized",
        onClick: () => router.push("/organized"),
        icon: FolderCode,
        isActive: true,
      },
      {
        title: "Account",
        onClick: () => router.push("/profile"),
        icon: BookOpen,
        isActive: true,
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
      <SidebarRail />
    </Sidebar>
  );
}
