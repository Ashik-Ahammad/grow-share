"use client";
import { motion } from "framer-motion";
import { Camera, User, Mail, MapPin, AlignLeft, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { uploadImageToImgbb } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    profileImage: "",
    coverImage: "",
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        if (res.data.success) {
          const user = res.data.data;
          setFormData({
            name: user.name || "",
            bio: user.bio || "",
            location: user.location || "",
            profileImage: user.profileImage || "",
            coverImage: user.coverImage || "",
          });
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "profileImage" | "coverImage") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImageToImgbb(file);
      if (url) {
        setFormData(prev => ({ ...prev, [type]: url }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { coverImage, ...apiData } = formData;
      const res = await api.patch("/users/me", apiData);
      if (res.data.success) {
        // Update local storage user data
        const oldUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...oldUser, name: formData.name, profileImage: formData.profileImage }));
        window.dispatchEvent(new Event("auth-change"));
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Cover Image */}
        <div className="h-48 relative bg-primary/20 group">
          {formData.coverImage ? (
            <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/30 to-emerald-500/20" />
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "coverImage")} />
            <div className="flex items-center gap-2 text-white font-medium bg-black/50 px-4 py-2 rounded-xl backdrop-blur-md">
              <Camera className="w-5 h-5" /> Change Cover
            </div>
          </label>
        </div>

        {/* Profile Info Form */}
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-8 flex justify-between items-end">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "profileImage")} />
                <Camera className="w-6 h-6 text-white" />
              </label>
            </div>
            
            {uploadingImage && <div className="text-sm text-primary animate-pulse font-medium">Uploading image...</div>}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><User className="w-4 h-4"/> Full Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Mail className="w-4 h-4"/> Email Address</label>
                <input 
                  disabled
                  value={email}
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4"/> Location</label>
                <input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><AlignLeft className="w-4 h-4"/> Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell us about your gardening journey..."
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border/50">
              <button 
                type="submit" 
                disabled={saving || uploadingImage}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
