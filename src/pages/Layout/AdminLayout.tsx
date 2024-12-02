import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { CSSProperties, Suspense, memo, useState } from "react";
import { Toaster } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PinRightIcon } from "@radix-ui/react-icons";
import { DoorOpen } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const navAdmin = [
  { title: "Dashboard", to: "/admin" },
  { title: "Competition", to: "/admin/competition" },
  { title: "Scholarship", to: "/admin/scholarship" },
  { title: "Seminar", to: "/admin/seminar" },
  { title: "Proker", to: "/admin/Proker" },
  { title: "Member", to: "/admin/Member" },
];

const AdminLayout = memo(() => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const location = useLocation();

  // function logOut() {
  //   // need backend
  //   // document.cookie =
  //   //   "supabase_token=; Max-Age=0; Path=/; Secure; HttpOnly; SameSite=Strict";
  //   // window.location.reload();
  //   signOutUser();
  //   toast("Anda berhasil log out!");
  //   navigate("/admin");
  // }

  const customStyle: CSSProperties = {
    "--sidebar-width": "20vw",
    "--sidebar-width-mobile": "20rem",
  } as CSSProperties;

  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={null}>
        <ScrollRestoration />
        <SidebarProvider
          open={isOpenSidebar}
          className="w-screen scroll-smooth font-poppins"
          style={customStyle}
        >
          <Sidebar>
            <SidebarHeader className="flex items-center">
              <div className="mt-3 flex items-center gap-4">
                <img
                  src="/img/logo-hmif.png"
                  alt="logo-hmif"
                  className="size-12 xl:size-10"
                />
                <div className="flex flex-col justify-center text-primary">
                  <h1 className="text-xl font-bold md:text-2xl xl:text-xl">
                    HMIF UNSRI
                  </h1>
                  <p className="text-xs font-medium xl:text-xs">
                    Kuatkan Formasi Wujudkan Inovasi
                  </p>
                </div>
              </div>
            </SidebarHeader>
            <hr className="m-5" />
            <SidebarContent className="flex flex-col px-5">
              {navAdmin.map((item) => (
                <Link
                  to={item.to}
                  className={cn("p-2 hover:bg-gray-100", {
                    "bg-gray-200 hover:bg-gray-200":
                      item.to === location.pathname,
                  })}
                >
                  {item.title}
                </Link>
              ))}
              <hr className="my-3" />
              <button className="flex flex-row gap-2 p-2 text-left hover:bg-gray-100">
                <DoorOpen />
                Logout
              </button>
            </SidebarContent>
          </Sidebar>
          <button
            onClick={() => setIsOpenSidebar((e) => !e)}
            className={cn(
              "group fixed top-0 m-5 rounded-md bg-slate-600 transition-all duration-300 ease-in-out",
              {
                "ml-[21vw]": isOpenSidebar,
              },
            )}
          >
            <div className="scale-125 rounded-md bg-gray-100 p-2 hover:bg-gray-200">
              <PinRightIcon
                className={cn(`group-hover:rotate-180`, {
                  "rotate-180 group-hover:rotate-0": isOpenSidebar,
                })}
              />
            </div>
          </button>
          <main
            className={cn(
              "w-[80vw] bg-gray-100 p-14 transition-all duration-300 ease-in-out",
              {
                "w-[100vw]": !isOpenSidebar,
              },
            )}
          >
            <Outlet />
            <Toaster />
          </main>
        </SidebarProvider>
      </Suspense>
    </QueryClientProvider>
  );
});

export default AdminLayout;
