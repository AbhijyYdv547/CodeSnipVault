
"use client";

import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"


interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-background">
            <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-col flex-1">
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                    </header>

                </SidebarInset>
            <main className="flex-1 px-6">
                {children} 
            </main>
            </div>
        </SidebarProvider>
        </div>
    );
};

export default DashboardLayout;
