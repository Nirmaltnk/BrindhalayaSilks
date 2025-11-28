import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProductShowcase limit={3} />



      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-primary">Brindha's Boutique</h3>
            <p className="text-background/70">
              Your destination for premium silk sarees and dresses.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#collections" className="hover:text-primary">Collections</a></li>
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
              <input type="email" placeholder="Email" className="bg-background/10 border border-background/20 rounded px-3 py-2 w-full text-background placeholder:text-background/50" suppressHydrationWarning />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Join</Button>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-background/50 text-sm">
          © 2025 Brindha's Boutique. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
