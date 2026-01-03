"use client";

import {
  Home,
  Menu,
  PenLine,
  TvMinimal,
  LogOut,
  LogIn,
  UserPlus,
  Codesandbox,
  X,
} from "lucide-react";
import { JSX, useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

// Logo is always visible now
const SidebarLogo = () => (
  <Link href="/" className="flex items-center gap-x-2 p-5 justify-center">
    <Image
      src="/home/Nor.png"
      alt="XorThax Logo"
      width={24}
      height={24}
      className="invert"
    />
    <span className="text-white font-bold text-lg">XorThax</span>
  </Link>
);

const Sidebar: React.FC = () => {
  // Only mobile state is needed now
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const iconSize = 20;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItem: MenuItem[] = [
    {
      icon: <Home size={iconSize} />,
      label: "Home",
      path: "/home",
    },
    {
      icon: <TvMinimal size={iconSize} />,
      label: "Courses",
      path: "/courses",
    },
    {
      icon: <PenLine size={iconSize} />,
      label: "Blogs",
      path: "/blogs",
    },
    {
      icon: <Codesandbox size={iconSize} />,
      label: "Request a course",
      path: "/request-a-course",
    },
  ];

  const handleSignOut = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <>
      {/* --- MOBILE TRIGGER BUTTON --- */}
      {/* Visible only on mobile (lg:hidden) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 bg-[#1f1f1f] text-white rounded-md lg:hidden"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* --- MOBILE OVERLAY --- */}
      {/* Clicking this closes the sidebar on mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-[calc(100vh-24px)] m-3
          transition-transform duration-300 ease-in-out
          border border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD]
          rounded-3xl overflow-hidden
          
          /* Width is now fixed for both states (250px) */
          w-[250px]

          /* Mobile Logic: Slide in/out */
          ${isMobileOpen ? "translate-x-0" : "-translate-x-[150%]"} 
          
          /* Desktop Logic: Always visible (reset translate) */
          lg:translate-x-0 
        `}
      >
        {/* Inner Glass Container */}
        <div className="flex flex-col w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur-3xl">

          {/* TOP SECTION */}
          <div className="flex items-center justify-between mb-4">
            <SidebarLogo />
            
            {/* Mobile Close Button (Hidden on Desktop) */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 text-white ml-auto"
            >
              <X size={24} />
            </button>
          </div>

          {/* MENU ITEMS */}
          <nav className="flex flex-col gap-3">
            {menuItem.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  href={item.path}
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 
                  ${isActive
                    ? "bg-[#1f1f1f] text-white"
                    : "text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* BOTTOM SECTION */}
          <div className="mt-auto">
            <hr className="my-4 border-t border-[#333336]" />

            {/* STATE 1: LOADING */}
            {isPending && (
              <div className="flex items-center gap-3 p-2">
                <div className="w-8 h-8 bg-[#2a2a2a] rounded-full animate-pulse"></div>
                <div className="w-32 h-4 bg-[#2a2a2a] rounded animate-pulse"></div>
              </div>
            )}

            {/* STATE 2: LOGGED IN */}
            {isPending === false && user && (
              <>
                <div className="flex items-center gap-3 p-2 rounded-md text-[#9B9CA0]">
                  <Image
                    src={user.image || "/home/user.png"}
                    alt={user.name || "User"}
                    width={iconSize + 8}
                    height={iconSize + 8}
                    className="rounded-full"
                  />
                  <span className="truncate">{user.name}</span>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-4 p-3 rounded-lg w-full text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <LogOut size={iconSize} />
                  <span>Sign Out</span>
                </button>
              </>
            )}

            {/* STATE 3: LOGGED OUT */}
            {isPending === false && !user && (
              <nav className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-4 p-3 rounded-lg text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200"
                >
                  <LogIn size={iconSize} />
                  <span>Log in</span>
                </Link>
                <Link
                  href="/sign-up"
                  className="flex items-center gap-4 p-3 rounded-lg text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200"
                >
                  <UserPlus size={iconSize} />
                  <span>Sign up</span>
                </Link>
              </nav>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;