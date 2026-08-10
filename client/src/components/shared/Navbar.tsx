"use client";

import Link from "next/link";
import { Leaf, User, MessageCircle, ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Social Feed", href: "/feed", icon: MessageCircle },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "My Garden", href: "/dashboard", icon: Leaf },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{name: string, role: string} | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const checkAuth = () => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch(e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">GrowShare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <User className="w-4 h-4" />
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:text-destructive transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 glass-morphism border-b border-border/40 p-4 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-border/50 my-2" />
            {user ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-sm font-bold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors">
                  <User className="w-5 h-5" />
                  {user.name}
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center justify-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-3 rounded-xl hover:bg-muted/50 transition-colors text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
