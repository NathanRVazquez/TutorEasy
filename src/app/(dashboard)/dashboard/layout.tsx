import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata: Metadata = {
  title: "TutorEasy",
  description: "CUNY Tech Prep Final Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="flex h-screen">
    //   {/* Sidebar */}
    //   <aside className="w-[16%] md:w-[8%] lg:w-[14%] xl:w-[16%]">
    //     <div className="flex flex-col h-full">
    //       <div className="px-2 pt-2 pb-0 md:px-2 md:pt-2 xl:px-4 xl:pt-4 xl:pb-0">
    //         <div className="flex justify-center items-center lg:hidden">
    //           <Menu size={28} />
    //         </div>
    //         <div className="flex items-center justify-center lg:justify-start">
    //           <Link href="/dashboard">
    //             <h1 className="font-bold text-2xl hidden lg:block">
    //               TutorEasy
    //             </h1>
    //           </Link>
    //         </div>
    //       </div>

    //       <Separator className="my-4" />

    //       <SideMenuLinks />
    //       <p className="text-center text-xs hidden lg:block text-gray-400 mb-2">
    //         &copy; {new Date().getFullYear()} TutorEasy
    //       </p>
    //     </div>
    //   </aside>
    //   {/* Main Content */}
    //   <div className="grow bg-blue-50">
    //     <DashboardHeader />
    //     <div className="p-4">{children}</div>
    //   </div>
    // </div>
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full">
        <div className="grow bg-blue-50">
          <DashboardHeader />
          <div className="p-4">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
