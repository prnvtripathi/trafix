import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/theme-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Home,
  PanelLeft,
  Search,
  Settings,
  Users2,
  Package,
  ContactRoundIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import { auth, signOut } from "@/auth";
import DynamicBreadcrumb from "./breadcrumbs";

import { Table, LogOut, Shield, Mail, User } from "lucide-react";

export default async function Header() {
  const { user } = await auth();
  console.log(user, "aa gaya");

  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      link: "/dashboard",
      tooltiptext: "Home",
      logo: <Home className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Products",
      link: "/dashboard/products",
      tooltiptext: "Products",
      logo: <Package className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Customers",
      link: "/dashboard/customers",
      tooltiptext: "Customers",
      logo: <Users2 className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "contact",
      link: "/dashboard/contactlogs",
      tooltiptext: "Contact Logs",
      logo: <ContactRoundIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <nav className="py-4 sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-transparent text-lg font-semibold text-primary-foreground md:text-base"
              >
                <div>
                  <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white dark:text-black p-1 rounded-full inline mx-2 md:mx-0" />
                </div>
                <span className="sr-only">company logo</span>
              </Link>
              {sidebarItems.map((item, index) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item.logo} {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center space-x-4">
          {" "}
          {/* This div is for breadcrumbs */}
          <LayoutDashboardIcon className="h-8 w-8 bg-primary text-white p-1 rounded-full inline mx-2 md:mx-0" />{" "}
          <DynamicBreadcrumb separator={"/"} />
        </div>

        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer size-7">
              <AvatarImage src={user.img || "/noavatar.png"} />
              {user.name ? (
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              ) : (
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-fit p-0" align="end">
            <div className="flex items-center space-x-4 p-4 border-b">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={user.img} alt={user.name} />
                {user.name ? (
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                ) : (
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="py-4 px-2 space-y-3">
              <DropdownMenuLabel className="flex items-center cursor-default">
                <User className="mr-3 h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Username: {user.username}</p>
              </DropdownMenuLabel>
              <DropdownMenuLabel className="flex items-center cursor-default">
                <Mail className="mr-3 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Email: {user.email}</span>
              </DropdownMenuLabel>
              {/* <DropdownMenuLabel className="flex items-center cursor-default">
                  <Shield className="mr-3 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Role: {userRole}</span>
                </DropdownMenuLabel> */}
            </div>

            <DropdownMenuSeparator />
            {/* <div className="p-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                  }}
                  className="w-full font-bold hover:text-primary transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div> */}
            <DropdownMenuItem className="p-2 m-1">
              <form
                className="w-full"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="w-full text-left hover:text-red-500 transition">
                  {" "}
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </nav>
    </>
  );
}
