
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut, Shield, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    setIsAdmin(!!adminAuth);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setIsAdmin(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { 
      name: "Projects", 
      href: "/projects",
      dropdown: [
        { name: "All Projects", href: "/projects" },
        { name: "Featured", href: "/projects/featured" },
        { name: "Open Source", href: "/projects/open-source" }
      ]
    },
    { name: "Events", href: "/events" },
    { 
      name: "Resources", 
      href: "/resources",
      dropdown: [
        { name: "All Resources", href: "/resources" },
        { name: "Tutorials", href: "/resources/tutorials" },
        { name: "Challenges", href: "/resources/challenges" }
      ]
    },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" }
  ];

  const NavItem = ({ item, isMobile = false }: { item: any; isMobile?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    if (item.dropdown) {
      return (
        <div 
          className={`relative ${isMobile ? 'w-full' : ''}`}
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          <button
            onClick={() => isMobile && setIsHovered(!isHovered)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-primary ${
              isMobile ? 'w-full justify-between' : ''
            }`}
          >
            {item.name}
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`} 
            />
          </button>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 0 : 10, height: isMobile ? 0 : 'auto' }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: isMobile ? 0 : 10, height: isMobile ? 0 : 'auto' }}
                transition={{ duration: 0.2 }}
                className={`${
                  isMobile 
                    ? 'w-full bg-white/5 rounded-lg mt-2 overflow-hidden' 
                    : 'absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50'
                }`}
              >
                {item.dropdown.map((subItem: any) => (
                  <Link
                    key={subItem.href}
                    to={subItem.href}
                    onClick={() => {
                      setIsOpen(false);
                      setIsHovered(false);
                    }}
                    className="block px-4 py-3 text-sm hover:bg-white/10 hover:text-primary transition-colors"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        to={item.href}
        onClick={() => setIsOpen(false)}
        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-primary ${
          location.pathname === item.href ? 'text-primary bg-white/10' : ''
        } ${isMobile ? 'block w-full' : ''}`}
      >
        {item.name}
      </Link>
    );
  };

  const UserDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <span className="hidden md:block text-sm">
          {profile?.full_name || user?.email?.split('@')[0] || 'User'}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-50"
          >
            <Link
              to="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/10 transition-colors"
            >
              <User size={16} />
              Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/10 transition-colors"
            >
              <Settings size={16} />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors text-red-400"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const AdminDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
          <Shield size={16} className="text-white" />
        </div>
        <span className="hidden md:block text-sm text-purple-300">Admin</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 text-purple-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl z-50"
          >
            <Link
              to="/admin"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-purple-500/10 transition-colors text-purple-300"
            >
              <Shield size={16} />
              Admin Dashboard
            </Link>
            <button
              onClick={() => {
                handleAdminLogout();
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-red-500/10 transition-colors text-red-400"
            >
              <LogOut size={16} />
              Admin Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              CodeBird Club
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {/* Admin or User Auth */}
            {isAdmin ? (
              <AdminDropdown />
            ) : user ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="px-4 py-2 text-sm rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/admin-login"
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 text-purple-300"
                >
                  Admin
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/10 py-4 overflow-hidden"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <NavItem key={item.href} item={item} isMobile />
                ))}
                
                {/* Mobile Auth */}
                {!user && !isAdmin && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-center rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/admin-login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-center rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 text-purple-300"
                    >
                      Admin Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
