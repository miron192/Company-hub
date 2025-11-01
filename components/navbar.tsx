"use client";

import type React from "react";
import {
  Bell,
  MessageSquare,
  Home,
  Users,
  Compass,
  LogOut,
  GamepadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 👈 import client-side BetterAuth
import SignOutButton from "./sign-out-button";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // ✅ check auth status once component mounts
  useEffect(() => {
    async function getUser() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }
    getUser();
  }, []);

  // ✅ handle sign out properly using BetterAuth client
  async function handleSignOut() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err) {
      console.error("Error signing out:", err);
    }
  }

  return (
    <nav className="sticky top-0 hidden md:block z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              C
            </div>
            <span className="hidden sm:inline">CompanyHub</span>
          </Link>

          {/* Navigation Links (only for logged in users) */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              <NavLink
                href="/people"
                icon={<Users className="h-4 w-4" />}
                label="People"
              />
              <NavLink
                href="/messages"
                icon={<MessageSquare className="h-4 w-4" />}
                label="Messages"
              />
              <NavLink
                href="/discover"
                icon={<Compass className="h-4 w-4" />}
                label="Discover"
              />
              <NavLink
                href="/games"
                icon={<GamepadIcon className="h-4 w-4" />}
                label="Games"
              />
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {/* User Info + Sign Out */}
              <div className="flex items-center gap-3 pl-3 border-l border-border">
                <Link href="/profile">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium leading-none">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.email}
                    </p>
                  </div>
                </Link>
                <SignOutButton />
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
