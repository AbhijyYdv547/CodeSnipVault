"use client"

import { type LucideIcon } from "lucide-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: {
        title: string
        onClick:()=>void
        icon?: LucideIcon
        isActive?: boolean
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Traverse</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item,index) => (
                        <SidebarMenuItem key={index} onClick={item.onClick}>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>

                        </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
