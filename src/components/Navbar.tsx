"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-primary">
                        <Image
                            src="/logo.jpg"
                            alt="Brindhalaya Silks"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-serif text-xl md:text-2xl font-bold text-foreground tracking-wide">
                        Brindhalaya <span className="text-primary">Silks</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/collections">Collections</NavLink>
                    <NavLink href="/about">About</NavLink>
                    {/* <NavLink href="/admin">Admin</NavLink> */}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* <Button variant="ghost" size="icon" className="hover:text-primary" title="Login">
                        <User className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-primary" title="Cart">
                        <ShoppingBag className="w-5 h-5" />
                    </Button> */}
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/collections">Shop Now</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col gap-6 mt-10">
                                <Link href="/" className="text-lg font-medium hover:text-primary">
                                    Home
                                </Link>
                                <Link href="/collections" className="text-lg font-medium hover:text-primary">
                                    Collections
                                </Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary">
                                    About
                                </Link>
                                {/* <Link href="/admin" className="text-lg font-medium hover:text-primary">
                                    Admin Panel
                                </Link> */}
                                <Button className="w-full bg-primary text-primary-foreground">
                                    Shop Now
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative text-foreground/80 hover:text-primary transition-colors font-medium group"
        >
            {children}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}
