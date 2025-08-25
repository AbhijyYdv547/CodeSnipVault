"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { SideHeader } from "./side-header"
import { useRouter } from "next/navigation"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter()
    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        header: 
            {
                name: "CodeSnipVault",
                logo: GalleryVerticalEnd,
            },
        navMain: [
            {
                title: "Dashboard",
                onClick: () => router.push("/dashboard") ,
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
                onClick: () => router.push("/"),
                icon: Settings2,
            },
        ],
    }
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SideHeader header={data.header}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
