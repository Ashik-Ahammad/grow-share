"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sprout, Sun } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          className="flex-1 text-center lg:text-left space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-sm font-medium text-primary">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            The #1 Social Gardening Community
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Grow, Share, and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-green-300">
              Thrive Together.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Connect with local gardeners, track your plant's growth, and trade or buy seeds and plants in our dedicated marketplace. Join the green revolution today.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            {!isLoggedIn ? (
              <Link 
                href="/register" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
              >
                Join the Community
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link 
              href="/marketplace" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 glass-morphism hover:bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
            >
              Explore Marketplace
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-2 rounded-lg"><Sprout className="w-5 h-5 text-primary" /></div>
              <div className="text-left">
                <p className="font-bold">10k+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Plants Shared</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/20 p-2 rounded-lg"><Sun className="w-5 h-5 text-amber-500" /></div>
              <div className="text-left">
                <p className="font-bold">5k+</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Gardeners</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 w-full max-w-lg relative"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl glass-morphism border border-white/10 p-2">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay z-10 rounded-[2.5rem]"></div>
             <img 
               src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1200&auto=format&fit=crop" 
               alt="Beautiful indoor plants" 
               className="object-cover w-full h-full rounded-[2.5rem]"
             />
             
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -left-6 top-1/4 glass-morphism p-4 rounded-2xl border border-white/20 shadow-xl z-20 flex items-center gap-3"
             >
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <Leaf className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">New Exchange!</p>
                  <p className="text-sm font-bold">Monstera cutting</p>
                </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-4 bottom-1/4 glass-morphism p-4 rounded-2xl border border-white/20 shadow-xl z-20 flex flex-col gap-2"
             >
                <p className="text-xs text-muted-foreground font-medium flex items-center gap-1"><Sun className="w-3 h-3 text-amber-500"/> Weather Alert</p>
                <p className="text-sm font-bold">Rain expected tomorrow</p>
                <p className="text-xs text-emerald-400">Skip watering schedule</p>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
