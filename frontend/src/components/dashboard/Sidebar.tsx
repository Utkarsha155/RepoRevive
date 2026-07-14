"use client";
interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  FolderGit2,
  Upload,
  FileText,
  MessageSquare,
  Award,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Marketplace",
    href: "/dashboard/marketplace",
    icon: Store,
  },
  {
    name: "My Projects",
    href: "/dashboard/projects",
    icon: FolderGit2,
  },
  {
    name: "Upload Project",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    name: "Requests",
    href: "/dashboard/requests",
    icon: FileText,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  }
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    logout();
    setMobileOpen?.(false);
    router.push("/");

  };
  return (
    <aside
      className={`
    fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
    border-r border-white/10 bg-[#111118]
    transition-transform duration-300
    lg:translate-x-0
    ${mobileOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
        }
  `}
    >
      {/* Logo */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">

        <Link href="/" className="text-xl font-bold text-white">
          Repo<span className="text-violet-500">Revive</span>
        </Link>

        <button
          onClick={() => setMobileOpen?.(false)}
          className="rounded-lg p-2 hover:bg-white/5 lg:hidden"
        >
          <X size={22} />
        </button>

      </div>

      {/* Menu */}

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active = pathname === item.href;

            return (

              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen?.(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${active
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >

                <Icon size={20} />

                <span>{item.name}</span>

              </Link>

            );

          })}

        </div>

      </nav>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}