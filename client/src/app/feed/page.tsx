"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/api/axios";
import { toast } from "react-toastify";

// Helper function for relative time
function timeAgo(dateParam: string) {
  if (!dateParam) return "";
  const date = new Date(dateParam);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Comments state
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [commentsData, setCommentsData] = useState<Record<string, any[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user') || 'null'));
    fetchPosts();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    try {
      if (editPostId) {
        await api.patch(`/posts/${editPostId}`, { description: newPost });
        toast.success("Post updated successfully!");
      } else {
        await api.post("/posts", { description: newPost });
        toast.success("Post created successfully!");
      }
      setNewPost("");
      setShowCreate(false);
      setEditPostId(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Action failed.");
    }
  };

  const handleEditClick = (post: any) => {
    setEditPostId(post.id);
    setNewPost(post.description);
    setShowCreate(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/posts/${id}`);
      toast.success("Post deleted!");
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post.");
    }
  };

  const toggleLike = async (postId: string) => {
    // Optimistic UI
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    try {
      await api.post("/likes", { postId });
      fetchPosts();
    } catch (err) {
      // Revert if error (if duplicate, ignore)
      fetchPosts();
    }
  };

  const handleShare = (postId: string) => {
    const url = `${window.location.origin}/feed?post=${postId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const fetchComments = async (postId: string) => {
    try {
      const res = await api.get(`/posts/${postId}`);
      if (res.data.success && res.data.data.comments) {
        setCommentsData(prev => ({ ...prev, [postId]: res.data.data.comments }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!showComments[postId]) {
      fetchComments(postId);
    }
  };

  const handleCreateComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newComment[postId]?.trim()) return;
    try {
      await api.post("/comments", { postId, content: newComment[postId] });
      toast.success("Comment added!");
      setNewComment(prev => ({ ...prev, [postId]: "" }));
      fetchComments(postId);
      fetchPosts(); // update comment count
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${commentId}`);
      toast.success("Comment deleted!");
      fetchComments(postId);
      fetchPosts();
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Social Feed</h1>
        <button 
          onClick={() => {
            if (showCreate && editPostId) {
              setEditPostId(null);
              setNewPost("");
            }
            setShowCreate(!showCreate);
          }}
          className="bg-primary flex items-center gap-2 text-primary-foreground px-4 py-2 rounded-xl font-medium shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {editPostId ? "Cancel Edit" : "Create Post"}
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
            <form onSubmit={handleSubmit} className="glass-morphism rounded-3xl p-6 border border-primary/20">
              <h2 className="text-xl font-bold mb-4">{editPostId ? "Edit Post" : "Create Post"}</h2>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's growing on in your garden?"
                className="w-full bg-background/50 border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none min-h-[120px]"
              />
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:bg-primary/90">
                  {editPostId ? "Update" : "Post"}
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
              className="glass-morphism rounded-3xl p-6 relative group"
            >
              {currentUser?.id === post.userId && (
                <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEditClick(post)} className="bg-black/50 p-2 rounded-full text-blue-400 hover:text-white transition" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="bg-black/50 p-2 rounded-full text-rose-400 hover:text-white transition" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary overflow-hidden">
                    {post.user?.profileImage ? <img src={post.user.profileImage} alt="" className="w-full h-full object-cover" /> : (post.user?.name?.[0]?.toUpperCase() || "?")}
                  </div>
                  <div>
                    <h3 className="font-bold">{post.user?.name || "Unknown User"}</h3>
                    <p className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 whitespace-pre-wrap">{post.description}</p>
              
              <div className="flex items-center gap-6 border-t border-border/50 pt-4">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${likedPosts[post.id] ? 'text-rose-500' : 'text-muted-foreground hover:text-rose-500'}`}
                >
                  <Heart className={`w-5 h-5 ${likedPosts[post.id] ? 'fill-current' : ''}`} /> 
                  <span className="font-medium">{(post._count?.likes || 0) + (likedPosts[post.id] ? 1 : 0)}</span>
                </button>
                <button onClick={() => toggleComments(post.id)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" /> <span className="font-medium">{post._count?.comments || 0}</span>
                </button>
                <button onClick={() => handleShare(post.id)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {showComments[post.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border/30"
                  >
                    <form onSubmit={(e) => handleCreateComment(e, post.id)} className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        value={newComment[post.id] || ""} 
                        onChange={(e) => setNewComment(prev => ({...prev, [post.id]: e.target.value}))}
                        placeholder="Write a comment..." 
                        className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary/50"
                      />
                      <button type="submit" className="bg-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/30 transition">
                        Send
                      </button>
                    </form>
                    <div className="space-y-3">
                      {commentsData[post.id]?.map((comment: any) => (
                        <div key={comment.id} className="flex gap-3 bg-black/20 p-3 rounded-xl relative group/comment">
                           <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                              {comment.user?.profileImage ? <img src={comment.user.profileImage} alt="" className="w-full h-full object-cover" /> : (comment.user?.name?.[0]?.toUpperCase() || "?")}
                           </div>
                           <div>
                             <div className="flex items-baseline gap-2">
                               <span className="font-bold text-sm">{comment.user?.name}</span>
                               <span className="text-[10px] text-muted-foreground">{timeAgo(comment.createdAt)}</span>
                             </div>
                             <p className="text-sm mt-1 text-gray-300">{comment.content}</p>
                           </div>
                           {currentUser?.id === comment.userId && (
                             <button onClick={() => handleDeleteComment(comment.id, post.id)} className="absolute top-2 right-2 opacity-0 group-hover/comment:opacity-100 text-rose-500 hover:text-rose-400 p-1">
                               <Trash2 className="w-3 h-3" />
                             </button>
                           )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}