"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Droplets, Sun, ShoppingBag, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [gardens, setGardens] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Garden form state
  const [showCreateGarden, setShowCreateGarden] = useState(false);
  const [editGardenId, setEditGardenId] = useState<string | null>(null);
  const [gardenName, setGardenName] = useState("");
  const [gardenLocation, setGardenLocation] = useState("");
  const [availablePlants, setAvailablePlants] = useState<any[]>([]);
  const [activeGardenId, setActiveGardenId] = useState<string | null>(null);
  const [selectedPlantId, setSelectedPlantId] = useState("");

  const handleAddPlant = async (gardenId: string) => {
    if (!selectedPlantId) {
      toast.warning("Please select a plant");
      return;
    }
    try {
      await api.post("/user-plants", { gardenId, plantId: selectedPlantId });
      toast.success("Plant added to garden!");
      setSelectedPlantId("");
      setActiveGardenId(null);
      fetchData();
    } catch (err) {
      toast.error("Failed to add plant");
    }
  };

  const fetchData = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : {};
      const [gardensRes, listingsRes, plantsRes] = await Promise.all([
        api.get("/gardens"),
        api.get("/listings"),
        api.get("/plants")
      ]);
      if (gardensRes.data.success) setGardens(gardensRes.data.data);
      if (listingsRes.data.success) setListings(listingsRes.data.data.filter((l: any) => l.userId === user.id));
      if (plantsRes.data.success) setAvailablePlants(plantsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitGarden = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editGardenId) {
        await api.patch(`/gardens/${editGardenId}`, { name: gardenName });
        toast.success("Garden updated successfully!");
      } else {
        await api.post("/gardens", { name: gardenName });
        toast.success("Garden created successfully!");
      }
      setGardenName("");
      setGardenLocation("");
      setEditGardenId(null);
      setShowCreateGarden(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save garden.");
    }
  };

  const handleEditGarden = (garden: any) => {
    setEditGardenId(garden.id);
    setGardenName(garden.name);
    setGardenLocation(garden.location || "");
    setShowCreateGarden(true);
  };

  const handleDeleteGarden = async (id: string) => {
    if (!confirm("Are you sure you want to delete this garden?")) return;
    try {
      await api.delete(`/gardens/${id}`);
      toast.success("Garden deleted successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete garden.");
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
              <div className={`${stat.bg} p-4 rounded-2xl`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
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
              onClick={() => {
                if (showCreateGarden && editGardenId) {
                  setEditGardenId(null);
                  setGardenName("");
                  setGardenLocation("");
                }
                setShowCreateGarden(!showCreateGarden);
              }}
              className="flex items-center gap-1 text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" /> {editGardenId ? "Cancel Edit" : "Add Garden"}
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
                <form onSubmit={handleSubmitGarden} className="bg-background/40 p-4 rounded-2xl border border-border flex flex-col sm:flex-row gap-3">
                  <input required value={gardenName} onChange={e => setGardenName(e.target.value)} placeholder="Garden Name" className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input required value={gardenLocation} onChange={e => setGardenLocation(e.target.value)} placeholder="Location" className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
                  <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold">
                    {editGardenId ? "Update" : "Save"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {loading ? (
              <div className="text-muted-foreground text-sm">Loading gardens...</div>
            ) : gardens.length === 0 ? (
              <div className="text-muted-foreground text-sm p-4 border border-dashed border-border rounded-xl text-center">No gardens created yet. Create one to start tracking plants!</div>
            ) : gardens.map((garden) => {
              return (
                <div key={garden.id} className="flex flex-col gap-2">
                  <div className="p-4 bg-background/50 border border-border rounded-2xl flex items-center justify-between hover:border-primary/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded-xl"><Leaf className="w-5 h-5 text-primary" /></div>
                      <div>
                        <span className="font-bold block">{garden.name}</span>
                        <span className="text-xs text-muted-foreground">{garden.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditGarden(garden)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteGarden(garden.id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => setActiveGardenId(activeGardenId === garden.id ? null : garden.id)} className="flex items-center gap-1 text-sm bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 transition-colors font-medium ml-2">
                        <Plus className="w-4 h-4" /> Add Plant
                      </button>
                      <button className="text-sm font-medium text-primary hover:underline bg-primary/10 px-3 py-1.5 rounded-lg ml-2">
                        View Plants ({garden.plants?.length || 0})
                      </button>
                    </div>
                  </div>
                  
                  {activeGardenId === garden.id && (
                    <div className="p-4 bg-background/30 rounded-xl border border-border flex flex-col sm:flex-row gap-3">
                      <select value={selectedPlantId} onChange={e => setSelectedPlantId(e.target.value)} className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                        <option value="" disabled>Select a plant from database</option>
                        {availablePlants.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <button onClick={() => handleAddPlant(garden.id)} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shrink-0">
                        Add
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
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
}