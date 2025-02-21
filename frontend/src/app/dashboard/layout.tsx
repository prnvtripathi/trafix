// "use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { BackgroundStyle } from "@/components/effects/background-style";
import { fetchUserApis } from "@/lib/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // async function getData() {
  //   const response = await fetchUserApis();

  //   const formattedData = response.map(
  //     (api: { ID: string; Name: string; Method: string; URL: string }) => ({
  //       id: api.ID,
  //       name: api.Name,
  //       method: api.Method,
  //       url: api.URL,
  //     })
  //   );

  //   return formattedData;
  // }

  // const apiData = await getData();

  const apiData = [
    {
      id: "1",
      name: "Dashboard user demographics",
      method: "GET",
      url: "https://api.example.com/1",
    },
    {
      id: "2",
      name: "API 2",
      method: "POST",
      url: "https://api.example.com/2",
    },
    {
      id: "3",
      name: "API 3",
      method: "PUT",
      url: "https://api.example.com/3",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar apiData={apiData} />

      <main className="md:flex-1 space-y-2 overflow-hidden relative z-0">
        {/* <BackgroundStyle/> */}
        <div className="flex items-center justify-between">
          <SidebarTrigger className="flex md:hidden h-full" />
          <Header />
        </div>
        <div className="mx-4">{children}</div>
        {/* <Footer /> */}
      </main>
    </SidebarProvider>
  );
}
