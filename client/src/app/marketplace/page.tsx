"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";

export default function Marketplace() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", price: 0, type: "SELL", location: "" });
  
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const fetchListings = async () => {
    try {
      setLoading(true);
      let query = "/listings?";
      if (search) query += `search=${search}&`;
      if (typeFilter !== "ALL") query += `type=${typeFilter}&`;
      
      const res = await api.get(query);
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
    const delayDebounceFn = setTimeout(() => {
      fetchListings();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, typeFilter]);

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
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plants, seeds..."
              className="w-full bg-background/50 border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-background/50 border border-border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
          >
            <option value="ALL">All Types</option>
            <option value="SELL">Sell</option>
            <option value="EXCHANGE">Exchange</option>
            <option value="GIVEAWAY">Giveaway</option>
          </select>
          
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
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} placeholder="Price" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
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
          <div className="col-span-full text-center text-muted-foreground py-10">Searching listings...</div>
        ) : listings.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-10 glass-morphism rounded-3xl">No listings found. Try adjusting your filters.</div>
        ) : listings.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-morphism rounded-3xl overflow-hidden group border border-border hover:border-primary/50 transition-colors flex flex-col"
          >
            <div className="h-48 bg-muted flex items-center justify-center text-7xl relative">
              {item.type === 'GIVEAWAY' ? '🎁' : item.type === 'EXCHANGE' ? '🤝' : '🌱'}
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                {item.type}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{item.location}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-primary text-xl">
                  {item.type === 'GIVEAWAY' ? 'Free' : item.type === 'EXCHANGE' ? 'Exchange' : `৳${item.price}`}
                </span>
                <a 
                  href={`https://wa.me/?text=Hi! I saw your listing for '${item.title}' on GrowShare. Is it still available?`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}