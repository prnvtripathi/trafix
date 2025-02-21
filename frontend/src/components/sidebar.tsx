"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BarChart2,
  Settings,
  LogOut,
  ChevronsLeft,
  // Plus,
  // QrCode,
  // ScanQrCode,
  // LinkIcon,
  // LucideFileChartColumnIncreasing,
  // TestTubeDiagonal,
  NotebookTextIcon,
  ArrowUpRight,
  ChevronRight,
  GitGraphIcon,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./theme-button";
import SpinningLogo from "./effects/spinningLogo";
import { GearIcon } from "@radix-ui/react-icons";
import { PageRoutes } from "@/lib/pageroutes";
import { Badge } from "./ui/badge";
// import ThemeToggle from "./ui/theme-toggle";

type ApiData = {
  id: string;
  name: string;
  method: string;
  url: string;
};

export function AppSidebar({ apiData }: { apiData: ApiData[] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center justify-center py-3 gap-2 flex-row w-full"
        >
          {/* <Image
            src="/images/logo.svg"
            alt="Logo"
            height={32}
            width={32}
            priority
          /> */}{" "}
          <div className="bg-primary rounded-full shadow-xl text-white  p-1">
            <GearIcon className=" m-0 h-6 p-0 rounded-full w-full" />
          </div>
          {isSidebarOpen && (
            <AnimatePresence>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold"
              >
                Trafix
              </motion.span>
            </AnimatePresence>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-2">
        <SidebarMenu>
          <SidebarSeparator />
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Workspace"
              isActive={pathname.includes("/dashboard/workspace")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/workspace">
                <BarChart2 className="h-4 w-4" />
                <span>Workspace</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>{" "}
  
  <SidebarMenuItem>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
              
                    <>
                      <GitGraphIcon className="h-4 w-4" />
                      <span>All APIs</span>
                    </>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
                <CollapsibleContent>
                <SidebarGroupContent>
                  {apiData.map((api) => (
                  <SidebarMenuItem key={api.id} className="pr-2">
                    <SidebarMenuButton
                    tooltip={api.name}
                    isActive={pathname.includes(api.url)}
                    asChild
                    className="flex items-center"
                    >
                    <Link href={api.url} className="text-sm flex items-center justify-between w-full">
                      {/* <GitGraphIcon className="h-4 w-4" /> */}
                        <span>{api.name.length > 20 ? `${api.name.substring(0, 15)}...` : api.name}</span>
                        <Badge variant='outline'>
                        <span className={`${
                          api.method.toUpperCase() === 'GET' ? 'text-green-500' :
                          api.method.toUpperCase() === 'POST' ? 'text-blue-500' :
                          api.method.toUpperCase() === 'PUT' ? 'text-yellow-500' :
                          api.method.toUpperCase() === 'DELETE' ? 'text-red-500' :
                          'text-xs'
                        }`}>
                          {api.method.toUpperCase()}
                        </span>
                      </Badge>
                    </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          </SidebarMenuItem>
          {/* <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Create & Run Test Cases"
              isActive={pathname.includes("/dashboard/test-cases")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/test-cases">
                <TestTubeDiagonal className="h-4 w-4" />
                <span>Test Cases</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
        <SidebarSeparator />
          <SidebarMenuItem>
            <Link href={`/docs${PageRoutes[0].href}`} target="_blank">
              <SidebarMenuButton tooltip="View Documentation">
                <NotebookTextIcon className="h-4 w-4" />{" "}
                <span>View Documentation</span>
                <ArrowUpRight className="h-1 w-1" />
              </SidebarMenuButton>
            </Link>{" "}
          </SidebarMenuItem>
          <SidebarMenuItem className="pr-2">
            <SidebarMenuButton
              tooltip="Settings"
              isActive={pathname.includes("/dashboard/settings")}
              asChild
              className="flex items-center"
            >
              <Link href="/dashboard/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Expand Sidebar"
              onClick={() => {
                toggleSidebar();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              // className="flex items-center justify-center w-full"
            >
              <ChevronsLeft
                className={`h-4 w-4 ${
                  isSidebarOpen ? "" : "transform rotate-180"
                } transition-transform duration-300`}
              />
              <span>Collapse Sidebar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/* <ThemeToggle /> */}
            {/* <SidebarMenuButton>
            <ModeToggle/>
            <span>Switch Theme</span>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => {
                signOut({ redirect: true, redirectTo: "/login" });
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
