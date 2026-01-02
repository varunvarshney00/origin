"use client";

import {
  Home,
  // Menu,
  PenLine,
  TvMinimal,
  LogOut,
  LogIn,
  UserPlus,
  Codesandbox,
} from "lucide-react";
import { JSX, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path: string;
}

// A new component for the logo to keep the main component cleaner
const SidebarLogo = ({ isOpen }: { isOpen: boolean }) => (
  <Link href="/" className="flex items-center gap-x-2 p-5 justify-center">
    <Image
      src="/home/phoenix.png" // Using the phoenix logo from your other component
      alt="XorThax Logo"
      width={24}
      height={24}
      className="invert"
    />
    {isOpen && <span className="text-white font-bold text-lg">XorThax</span>}
  </Link>
);

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const iconSize = 20;

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
    // Outer container for positioning and background gradient
    <aside
      className={`${isOpen ? "w-[250px]" : "w-[92px]"
        } fixed left-0 hidden lg:inline-block border border-[#545454] bg-gradient-to-b from-[#768BDD] via-[#171717] to-[#768BDD] top-0 m-3 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out h-[calc(100vh-24px)]`}
    >
      {/* Inner container for content, padding, and the glass effect */}
      <div className="flex flex-col w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop-blur-3xl">

        {/* TOP SECTION WITH LOGO AND TOGGLE BUTTON */}
        <div className={`flex items-center mb-4 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          {isOpen && <SidebarLogo isOpen={isOpen} />}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded text-white hover:bg-[#1f1f1f]"
            aria-label="Toggle Sidebar"
          >
            {/* <Menu size={iconSize} /> */}
          </button>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-3">
          {menuItem.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <Link
                href={item.path}
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${isActive
                  ? "bg-[#1f1f1f] text-white" // Active link styles
                  : "text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white" // Inactive link styles
                  } ${!isOpen && "justify-center"}`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="mt-auto">
          <hr className="my-4 border-t border-[#333336]" />

          {/* STATE 1: SESSION IS LOADING */}
          {isPending && (
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 bg-[#2a2a2a] rounded-full animate-pulse"></div>
              {isOpen && (
                <div className="w-32 h-4 bg-[#2a2a2a] rounded animate-pulse"></div>
              )}
            </div>
          )}

          {/* STATE 2: USER IS LOGGED IN */}
          {isPending === false && user && (
            <>
              <div
                className={`flex items-center gap-3 p-2 rounded-md text-[#9B9CA0] ${!isOpen && "justify-center"
                  }`}
              >
                <Image
                  src={user.image || "/home/user.png"}
                  alt={user.name || "User"}
                  width={iconSize + 8}
                  height={iconSize + 8}
                  className="rounded-full"
                />
                {isOpen && <span className="truncate">{user.name}</span>}
              </div>
              <button
                onClick={handleSignOut}
                className={`flex items-center gap-4 p-3 rounded-lg w-full text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200 cursor-pointer ${!isOpen && "justify-center"
                  }`}
              >
                <LogOut size={iconSize} />
                {isOpen && <span>Sign Out</span>}
              </button>
            </>
          )}

          {/* STATE 3: USER IS LOGGED OUT */}
          {isPending === false && !user && (
            <nav className="flex flex-col gap-2">
              <Link
                href="/sign-in"
                className={`flex items-center gap-4 p-3 rounded-lg text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200 ${!isOpen && "justify-center"
                  }`}
              >
                <LogIn size={iconSize} />
                {isOpen && <span>Log in</span>}
              </Link>
              <Link
                href="/sign-up"
                className={`flex items-center gap-4 p-3 rounded-lg text-[#9B9CA0] hover:bg-[#1f1f1f] hover:text-white transition-colors duration-200 ${!isOpen && "justify-center"
                  }`}
              >
                <UserPlus size={iconSize} />
                {isOpen && <span>Sign up</span>}
              </Link>
            </nav>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;