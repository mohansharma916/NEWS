"use client";

import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "components/SearchBox";
import NavBar from "components/NavBar";
import LogoLink from "./LogoLink";
import { useAuth } from "../context/authContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex w-full flex-col">
      <div className="grid w-full grid-flow-col grid-rows-2 items-center justify-between px-2 md:flex md:space-x-5 md:px-2.5 md:pt-2.5">
        <LogoLink />
        <SearchBox />
        <div className="flex items-center justify-end">
          
          {/* Static Icons */}
          <button title="help" className="hidden h-12 w-12 items-center justify-center rounded-full hover:bg-gray-400/20 md:flex">
            <QuestionMarkCircleIcon className="h-6 w-6 stroke-gray-800" />
          </button>
          
          {/* AUTH LOGIC */}
          {user ? (
            <>
              {/* Settings (Only for logged in) */}
              <button title="settings" className="hidden h-12 w-12 items-center justify-center rounded-full hover:bg-gray-400/20 md:flex">
                <Cog6ToothIcon className="h-6 w-6 stroke-gray-800" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative group ml-4 flex items-center">
                 <button title="user profile" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-400/20 md:ml-2 md:h-12 md:w-12 overflow-hidden border border-gray-200">
                  <Image
                    height={40}
                    width={40}
                    // Use Real Avatar -> Fallback to Github Default -> Fallback to Local
                    src={user.avatarUrl || "https://avatars.githubusercontent.com/u/0?v=4"} 
                    alt={user.fullName || "User"}
                    className="h-full w-full object-cover"
                  />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 hidden w-48 flex-col rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 group-hover:flex z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {/* Only Show "Create Post" if Admin/Editor */}
                    {(user.role === 'SUPER_ADMIN' || user.role === 'EDITOR') && (
                      <Link 
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                    Admin Panel
                      </Link>
                    )}

                    <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        Sign Out
                    </button>
                </div>
              </div>
            </>
          ) : (
            /* Guest View */
            <Link
              href="/login"
              className="ml-4 flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 md:ml-2 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}

        </div>
      </div>
      <NavBar />
    </header>
  );
}