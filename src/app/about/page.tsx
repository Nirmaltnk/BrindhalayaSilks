"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="bg-primary/5 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Brindhalaya Silks</h1>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            At Brindhalaya Silks, we believe that every saree tells a story. Founded with a passion for preserving the rich heritage of Indian handlooms, we bring you an exquisite collection of Kanchipuram, Banarasi, and Designer Silks.
                        </p>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Our boutique is a sanctuary for silk lovers, where tradition meets contemporary elegance. Each piece is handpicked to ensure the highest quality and unique design.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-primary text-primary-foreground">Contact Us</Button>
                        </div>
                    </div>
                    <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/images/saree2.png"
                            alt="About Us"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Additional Content for the dedicated page */}
                <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-card rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Our Heritage</h3>
                        <p className="text-muted-foreground">Decades of trust and tradition in weaving the finest silks.</p>
                    </div>
                    <div className="p-6 bg-card rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Quality Promise</h3>
                        <p className="text-muted-foreground">Every thread is inspected to ensure premium quality.</p>
                    </div>
                    <div className="p-6 bg-card rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">Customer First</h3>
                        <p className="text-muted-foreground">Dedicated to providing an exceptional shopping experience.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-foreground text-background py-12 mt-12">
                <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-4 text-primary">Brindhalaya Silks</h3>
                        <p className="text-background/70">
                            Your destination for premium silk sarees and dresses.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-background/70">
                            <li><a href="/" className="hover:text-primary">Home</a></li>
                            <li><a href="/collections" className="hover:text-primary">Collections</a></li>
                            <li><a href="/about" className="hover:text-primary">About Us</a></li>
                            <li><a href="/admin" className="hover:text-primary">Admin Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <ul className="space-y-2 text-background/70">
                            <li>123 Silk Street, Chennai</li>
                            <li>+91 98765 43210</li>
                            <li>hello@brindhalayasilks.com</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <p className="text-background/70 mb-4">Subscribe for latest updates and offers.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email" className="bg-background/10 border border-background/20 rounded px-3 py-2 w-full text-background placeholder:text-background/50" />
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/50 text-sm">
                    © 2025 Brindhalaya Silks. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
