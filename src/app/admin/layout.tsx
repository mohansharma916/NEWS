"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Squares2X2Icon, // Dashboard
  DocumentTextIcon, // Posts
  TagIcon,          // Categories
  ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/authContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Squares2X2Icon },
    { name: "Posts", href: "/admin/posts", icon: DocumentTextIcon },
    { name: "Categories", href: "/admin/categories", icon: TagIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-gray-200 bg-white pb-4 pt-5 shadow-sm lg:block">
        <div className="flex flex-shrink-0 items-center px-4">
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
        
        <nav className="mt-8 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
          
          {/* Logout Button */}
          <button
            onClick={logout}
            className="group mt-8 flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 flex-shrink-0 text-red-500" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 px-4 py-8 pl-72"> 
        {/* pl-72 pushes content to right of sidebar */}
        {children}
      </main>
    </div>
  );
}