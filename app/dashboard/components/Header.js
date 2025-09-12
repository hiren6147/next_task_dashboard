"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import { LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = useMemo(
    () => user?.displayName ?? user?.email ?? "User",
    [user?.displayName, user?.email],
  );
  const avatarLabel = useMemo(
    () => displayName?.[0]?.toUpperCase() ?? "U",
    [displayName],
  );

  return (
    <TooltipProvider>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full shadow-lg backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <span className="text-sm font-bold text-white">TM</span>
                </div>
                <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                  Task Manager
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Desktop View */}
              <div className="hidden items-center space-x-4 md:flex">
                <span className="text-muted-foreground text-sm">
                  Hi, {displayName}
                </span>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <DropdownMenu
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white">
                          {avatarLabel}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-medium">
                          {displayName}
                        </p>
                        <p className="text-muted-foreground text-xs leading-none">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <span className="text-muted-foreground text-sm">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-500 focus:bg-red-50 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
