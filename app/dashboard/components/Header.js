"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useMemo, useState } from "react";
import {
  LogOut,
  User,
  Menu,
  X,
  Home,
  FolderOpen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-accent rounded-lg p-2 transition-colors md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 animate-in zoom-in flex h-9 w-9 items-center justify-center rounded-lg duration-500">
                  <span className="gradient-text text-sm font-bold">TM</span>
                </div>
                <div>
                  <h1 className="hidden text-lg font-semibold md:block">
                    Task Manager
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="ml-6 hidden items-center space-x-1 md:flex">
                <Button variant="ghost" size="sm" className="hover-lift">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                {/* <Button variant="ghost" size="sm" className="hover-lift">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Projects
                </Button> */}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* <ThemeToggle /> */}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover-lift relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.photoURL} alt={displayName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {avatarLabel}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="glass w-56"
                  align="end"
                  forceMount
                >
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
                  {/* <DropdownMenuItem className="hover-lift cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover-lift cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover-lift cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive hover-lift cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="bg-background/95 animate-in slide-in-from-top border-t backdrop-blur-lg duration-200 md:hidden">
            <nav className="container mx-auto space-y-2 px-4 py-4">
              <Button
                variant="ghost"
                className="hover-lift w-full justify-start"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="hover-lift w-full justify-start"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Projects
              </Button>
              <Button
                variant="ghost"
                className="hover-lift w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <div className="border-t pt-2">
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-destructive hover:bg-destructive/10 hover-lift w-full justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </TooltipProvider>
  );
}
