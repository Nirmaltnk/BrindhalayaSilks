"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag, Contact, LogOut } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        router.push("/");
    };

    return (
        <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Admin Panel
                    </h2>
                    <div className="space-y-1">
                        <Button
                            asChild
                            variant={pathname === "/admin" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Link href="/admin">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Products
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant={pathname === "/admin/contact" ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Link href="/admin/contact">
                                <Contact className="mr-2 h-4 w-4" />
                                Contact Info
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
