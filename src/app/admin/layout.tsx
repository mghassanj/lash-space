import { ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Sparkles, 
  BarChart3, 
  Settings,
  Package,
  Menu,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "المواعيد", icon: Calendar },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/services", label: "الخدمات", icon: Sparkles },
  { href: "/admin/inventory", label: "المخزون", icon: Package },
  { href: "/admin/analytics", label: "التحليلات", icon: BarChart3 },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

function Sidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col h-full bg-[#1A1A1A] text-white ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">
          LASH SPACE <span className="text-[#9C8974]">· Admin</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all group"
            >
              <span className="font-medium">{link.label}</span>
              <Icon className="w-5 h-5 group-hover:text-[#9C8974] transition-colors" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu */}
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              
              <h2 className="text-lg font-semibold text-gray-900 hidden sm:block">
                لوحة التحكم
              </h2>
            </div>

            {/* Admin Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#9C8974] text-white text-sm">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">المدير</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
