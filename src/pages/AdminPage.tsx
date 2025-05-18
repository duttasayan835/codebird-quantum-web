
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (credentials.email === "admin@codebirdclub.com" && credentials.password === "admin") {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard.",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Admin Dashboard
          </motion.h1>
          
          {!isAuthenticated ? (
            <motion.div 
              className="max-w-md mx-auto glass-card p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-foreground/80">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 text-foreground/80">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white transition-colors shadow-lg flex items-center justify-center"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </>
                  ) : "Login"}
                </motion.button>
              </form>
              <div className="mt-4 text-sm text-center text-foreground/60">
                <p>Demo credentials:</p>
                <p>Email: admin@codebirdclub.com</p>
                <p>Password: admin</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Users</h3>
                    <p className="text-3xl font-bold">1,245</p>
                    <p className="text-green-400 text-sm">↑ 12% from last month</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Projects</h3>
                    <p className="text-3xl font-bold">48</p>
                    <p className="text-green-400 text-sm">↑ 5% from last month</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Events</h3>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-yellow-400 text-sm">= Same as last month</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass-card p-6 h-full">
                    <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {[
                        { user: "Sarah J.", action: "Created a new project", time: "2 hours ago" },
                        { user: "Mike T.", action: "Registered for event: Web3 Workshop", time: "3 hours ago" },
                        { user: "Alex C.", action: "Commented on a blog post", time: "5 hours ago" },
                        { user: "Emily R.", action: "Submitted a resource", time: "Yesterday" },
                        { user: "David K.", action: "Updated profile", time: "Yesterday" }
                      ].map((activity, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-white/10">
                          <div>
                            <span className="font-medium">{activity.user}</span> {activity.action}
                          </div>
                          <div className="text-foreground/60 text-sm">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="glass-card p-6 h-full">
                    <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <button className="w-full py-2 text-left px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        Add New User
                      </button>
                      <button className="w-full py-2 text-left px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        Create Event
                      </button>
                      <button className="w-full py-2 text-left px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        Publish Blog Post
                      </button>
                      <button className="w-full py-2 text-left px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        Approve Resources
                      </button>
                      <button className="w-full py-2 text-left px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        System Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default AdminPage;
