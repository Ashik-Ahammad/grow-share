const fs = require('fs');
const path = require('path');

const pages = [
  {
    path: 'src/app/login/page.tsx',
    content: `"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism p-8 rounded-3xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 p-3 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Log in to your GrowShare account</p>
        </div>

        <form className="space-y-4 flex flex-col">
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button className="w-full bg-primary text-primary-foreground font-bold rounded-xl py-3 mt-4 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
            Log In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}`
  },
  {
    path: 'src/app/register/page.tsx',
    content: `"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism p-8 rounded-3xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 p-3 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Join GrowShare</h1>
          <p className="text-muted-foreground mt-2">Start your gardening journey</p>
        </div>

        <form className="space-y-4 flex flex-col">
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium pl-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button className="w-full bg-primary text-primary-foreground font-bold rounded-xl py-3 mt-4 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}`
  },
  {
    path: 'src/app/feed/page.tsx',
    content: `"use client";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

export default function Feed() {
  const posts = [
    { id: 1, author: "Alice", time: "2h ago", content: "My tomato plant produced its first fruit today! 🍅 So happy with the progress.", type: "Plant Update", likes: 24, comments: 5 },
    { id: 2, author: "Bob", time: "5h ago", content: "What is the best soil for indoor monsteras? Mine is turning yellow.", type: "Question", likes: 12, comments: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Social Feed</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-colors">
          Create Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post, idx) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-morphism rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {post.author[0]}
                </div>
                <div>
                  <h3 className="font-bold">{post.author}</h3>
                  <p className="text-xs text-muted-foreground">{post.time} • {post.type}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><MoreHorizontal className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            
            <p className="text-lg leading-relaxed mb-6">{post.content}</p>
            
            <div className="flex items-center gap-6 border-t border-border/50 pt-4">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-5 h-5" /> <span className="font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" /> <span className="font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/marketplace/page.tsx',
    content: `"use client";
import { motion } from "framer-motion";
import { Search, Filter, MessageCircle } from "lucide-react";

export default function Marketplace() {
  const listings = [
    { id: 1, title: "Healthy Lemon Plant", price: "৳250", type: "SELL", location: "Savar", image: "🍋" },
    { id: 2, title: "Tomato Seeds", price: "Free", type: "GIVEAWAY", location: "Dhaka", image: "🍅" },
    { id: 3, title: "Monstera Cutting", price: "Exchange", type: "EXCHANGE", location: "Mirpur", image: "🌿" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search plants, seeds..."
              className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="p-2 glass-morphism rounded-xl border border-border hover:bg-white/5 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-morphism rounded-3xl overflow-hidden group border border-border hover:border-primary/50 transition-colors"
          >
            <div className="h-48 bg-muted flex items-center justify-center text-7xl relative">
              {item.image}
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                {item.type}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.location}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-primary text-xl">{item.price}</span>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-xl transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`
  },
  {
    path: 'src/app/dashboard/page.tsx',
    content: `"use client";
import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "My Plants", value: "18", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Listings", value: "7", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Tasks Today", value: "4", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-1">Good Morning, Gardener 🌱</h1>
          <p className="text-muted-foreground">Here is what's happening in your garden today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-morphism p-6 rounded-3xl flex items-center gap-4"
            >
              <div className={\`\${stat.bg} p-4 rounded-2xl\`}>
                <Icon className={\`w-8 h-8 \${stat.color}\`} />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground font-medium">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-morphism rounded-3xl p-6"
        >
          <h2 className="text-xl font-bold mb-6">My Gardens</h2>
          <div className="space-y-4">
            {['Rooftop Garden', 'Balcony Garden'].map((garden) => (
              <div key={garden} className="p-4 bg-background/50 border border-border rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-xl"><Leaf className="w-5 h-5 text-primary" /></div>
                  <span className="font-bold">{garden}</span>
                </div>
                <button className="text-sm font-medium text-primary hover:underline">View Plants</button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-morphism rounded-3xl p-6 flex flex-col"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sun className="text-amber-500 w-5 h-5" /> Weather Alert
          </h2>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20">
            <span className="text-4xl mb-2">🌧️</span>
            <p className="font-bold text-lg mb-1">Rain expected tomorrow</p>
            <p className="text-sm text-muted-foreground">Suggestion: Consider skipping tomorrow's scheduled watering for outdoor plants.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}`
  }
];

pages.forEach(page => {
  const dir = path.dirname(page.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(page.path, page.content);
});
console.log("Frontend pages generated.");
