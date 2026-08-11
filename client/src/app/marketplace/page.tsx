"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Filter, MessageCircle, Heart, Share2, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { toast } from "react-toastify";

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("all");
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [editListingId, setEditListingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "SELL",
    location: "",
    categoryId: ""
  });

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user') || 'null'));
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [listingsRes, categoriesRes] = await Promise.all([
        api.get("/listings"),
        api.get("/categories")
      ]);
      if (listingsRes.data.success) {
        let filtered = listingsRes.data.data;
        if (activeTab !== "all") {
          filtered = filtered.filter((item: any) => item.type === activeTab.toUpperCase());
        }
        setListings(filtered);
      }
      if (categoriesRes.data.success) {
        setCategories(categoriesRes.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      toast.warning("Please select a category first.");
      return;
    }
    
    try {
      if (editListingId) {
        await api.patch(`/listings/${editListingId}`, { ...formData, price: Number(formData.price), status: "ACTIVE" });
        toast.success("Listing updated successfully!");
      } else {
        await api.post("/listings", { ...formData, price: Number(formData.price), status: "ACTIVE" });
        toast.success("Listing created successfully!");
      }
      
      setFormData({ title: "", description: "", price: "", type: "SELL", location: "", categoryId: "" });
      setEditListingId(null);
      setShowCreate(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save listing.");
    }
  };

  const handleEditClick = (listing: any) => {
    setEditListingId(listing.id);
    setFormData({
      title: listing.title,
      description: listing.description,
      price: listing.price?.toString() || "",
      type: listing.type,
      location: listing.location,
      categoryId: listing.categoryId
    });
    setShowCreate(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await api.delete(`/listings/${id}`);
      toast.success("Listing deleted successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Trade, buy, or give away plants and seeds.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-background/50 border border-border rounded-xl p-1 flex">
            {['all', 'sell', 'exchange', 'giveaway'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? 'bg-primary text-primary-foreground shadow-lg' : 'hover:bg-primary/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              if (showCreate && editListingId) {
                setEditListingId(null);
                setFormData({ title: "", description: "", price: "", type: "SELL", location: "", categoryId: "" });
              }
              setShowCreate(!showCreate);
            }}
            className="bg-primary text-primary-foreground p-2 md:px-4 md:py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">{editListingId ? "Cancel Edit" : "Create Listing"}</span>
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
            <form onSubmit={handleSubmit} className="glass-morphism rounded-3xl p-6 md:p-8 border border-primary/20 max-w-2xl">
              <h2 className="text-xl font-bold mb-6">{editListingId ? "Edit Listing" : "Create New Listing"}</h2>
              
              <div className="space-y-4 mb-6">
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Listing Title (e.g. Monstera Deliciosa)" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50 min-h-[100px]" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-4">
                    <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="flex-1 bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50">
                      <option value="SELL">Sell</option>
                      <option value="EXCHANGE">Exchange</option>
                      <option value="GIVEAWAY">Giveaway</option>
                    </select>
                    {formData.type === 'SELL' && (
                      <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="Price (৳)" className="flex-1 bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
                    )}
                  </div>
                  
                  <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50">
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Location (e.g. Dhaka)" className="w-full bg-background/50 border border-border rounded-xl p-3 focus:ring-2 focus:ring-primary/50" />
              </div>
              
              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:bg-primary/90">
                  {editListingId ? "Update Listing" : "Publish Listing"}
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
            className="glass-morphism rounded-3xl overflow-hidden group border border-border hover:border-primary/50 transition-colors flex flex-col relative"
          >
            {currentUser?.id === item.userId && (
              <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEditClick(item)} className="bg-black/60 p-2 rounded-full text-blue-400 hover:text-white transition" title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="bg-black/60 p-2 rounded-full text-rose-400 hover:text-white transition" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
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