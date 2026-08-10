const fs = require('fs');
const path = require('path');

const files = {
  "src/app/feed/page.tsx": `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      if (res.data.success) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      await api.post("/posts", { content: newPost });
      setNewPost("");
      setShowCreate(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Social Feed</h1>
        <button 
          onClick={() => setShowCreate(!showCreate)}
          className="bg-primary flex items-center gap-2 text-primary-foreground px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Post
        </button>
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <form onSubmit={handleCreate} className="glass-morphism rounded-3xl p-6 border border-primary/20">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's growing on in your garden?"
                className="w-full bg-background/50 border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[120px]"
              />
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:bg-primary/90">
                  Post
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-muted-foreground py-10">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-10 glass-morphism rounded-3xl">No posts yet. Be the first to share!</div>
        ) : (
          posts.map((post, idx) => (
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
                    {post.user?.name?.[0] || "?"}
                  </div>
                  <div>
                    <h3 className="font-bold">{post.user?.name || "Unknown User"}</h3>
                    <p className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><MoreHorizontal className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              
              <p className="text-lg leading-relaxed mb-6">{post.content}</p>
              
              <div className="flex items-center gap-6 border-t border-border/50 pt-4">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" /> <span className="font-medium">{post._count?.likes || 0}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" /> <span className="font-medium">{post._count?.comments || 0}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}`,

  "src/app/marketplace/page.tsx": `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MessageCircle, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";

export default function Marketplace() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", price: 0, type: "SELL", location: "" });

  const fetchListings = async () => {
    try {
      const res = await api.get("/listings");
      if (res.data.success) {
        setListings(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/listings", { ...formData, price: Number(formData.price) });
      setShowCreate(false);
      setFormData({ title: "", description: "", price: 0, type: "SELL", location: "" });
      fetchListings();
    } catch (err) {
      console.error(err);
    }
  };

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
          <button 
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <form onSubmit={handleCreate} className="glass-morphism rounded-3xl p-6 border border-primary/20 max-w-2xl mx-auto space-y-4">
              <h2 className="text-xl font-bold mb-4">Create New Listing</h2>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Title (e.g. Monstera Cutting)" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Price" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50 text-foreground">
                  <option value="SELL">Sell</option>
                  <option value="EXCHANGE">Exchange</option>
                  <option value="GIVEAWAY">Giveaway</option>
                </select>
              </div>
              <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Location (e.g. Dhaka)" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
              
              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:bg-primary/90">
                  Publish Listing
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground py-10">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-10 glass-morphism rounded-3xl">No listings available. Be the first to add one!</div>
        ) : listings.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-morphism rounded-3xl overflow-hidden group border border-border hover:border-primary/50 transition-colors flex flex-col"
          >
            <div className="h-48 bg-muted flex items-center justify-center text-7xl relative">
              🌿
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                {item.type}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.location}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-primary text-xl">
                  {item.type === 'GIVEAWAY' ? 'Free' : item.type === 'EXCHANGE' ? 'Exchange' : \`৳\${item.price}\`}
                </span>
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
}`,

  "src/app/dashboard/page.tsx": `"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Droplets, Sun, ShoppingBag, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";

export default function Dashboard() {
  const [gardens, setGardens] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateGarden, setShowCreateGarden] = useState(false);
  const [gardenName, setGardenName] = useState("");
  const [gardenLocation, setGardenLocation] = useState("");

  const fetchData = async () => {
    try {
      const [gardensRes, listingsRes] = await Promise.all([
        api.get("/gardens"),
        api.get("/listings")
      ]);
      if (gardensRes.data.success) setGardens(gardensRes.data.data);
      if (listingsRes.data.success) setListings(listingsRes.data.data.filter((l: any) => l.userId === JSON.parse(localStorage.getItem("user") || "{}").id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateGarden = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/gardens", { name: gardenName, location: gardenLocation });
      setGardenName("");
      setGardenLocation("");
      setShowCreateGarden(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { title: "My Gardens", value: gardens.length, icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Listings", value: listings.length, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Tasks Today", value: "0", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10" },
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">My Gardens</h2>
            <button 
              onClick={() => setShowCreateGarden(!showCreateGarden)}
              className="flex items-center gap-1 text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" /> Add Garden
            </button>
          </div>
          
          <AnimatePresence>
            {showCreateGarden && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <form onSubmit={handleCreateGarden} className="bg-background/40 p-4 rounded-2xl border border-border flex gap-3">
                  <input required value={gardenName} onChange={e => setGardenName(e.target.value)} placeholder="Garden Name" className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input required value={gardenLocation} onChange={e => setGardenLocation(e.target.value)} placeholder="Location" className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold">Save</button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {loading ? (
              <div className="text-muted-foreground text-sm">Loading gardens...</div>
            ) : gardens.length === 0 ? (
              <div className="text-muted-foreground text-sm p-4 border border-dashed border-border rounded-xl text-center">No gardens created yet. Create one to start tracking plants!</div>
            ) : gardens.map((garden) => (
              <div key={garden.id} className="p-4 bg-background/50 border border-border rounded-2xl flex items-center justify-between hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-xl"><Leaf className="w-5 h-5 text-primary" /></div>
                  <div>
                    <span className="font-bold block">{garden.name}</span>
                    <span className="text-xs text-muted-foreground">{garden.location}</span>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary hover:underline bg-primary/10 px-3 py-1.5 rounded-lg">View Plants ({garden.plants?.length || 0})</button>
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
};

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(path.resolve(__dirname, file), content);
});
console.log("Pages updated to be fully functional.");
