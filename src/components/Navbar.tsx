
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  dropdown?: { title: string; to: string }[];
}

const NavItem = ({ to, children, dropdown }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return dropdown ? (
    <div className="relative group">
      <button
        className="flex items-center gap-1 px-4 py-2 text-foreground/90 hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <ChevronDown className="h-4 w-4" />
      </button>
      <div
        className={cn(
          "absolute top-full left-0 min-w-[200px] glass-card p-2 transition-all",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <ul className="flex flex-col">
          {dropdown.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="block px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Link
      to={to}
      className="px-4 py-2 text-foreground/90 hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'CB';
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 glass"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-codebird-primary to-codebird-accent flex items-center justify-center animate-glow">
            <span className="font-bold text-white text-lg">CB</span>
          </div>
          <span className="text-xl font-bold text-gradient">CodeBird Club</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem 
            to="/projects" 
            dropdown={[
              { title: "All Projects", to: "/projects" },
              { title: "Featured", to: "/projects/featured" },
              { title: "Open Source", to: "/projects/open-source" }
            ]}
          >
            Projects
          </NavItem>
          <NavItem to="/events">Events</NavItem>
          <NavItem to="/resources">Resources</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/gallery">Gallery</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="ml-4 flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary text-xs">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="ml-4 px-6 py-2 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background glass z-40 lg:hidden pt-20 px-6",
            isMobileMenuOpen ? "flex flex-col animate-fade-in" : "hidden"
          )}
        >
          <nav className="flex flex-col gap-4">
            <Link to="/" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/projects" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Projects</Link>
            <Link to="/events" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link to="/resources" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
            <Link to="/blog" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <Link to="/gallery" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/contact" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="px-4 py-3 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button 
                  className="px-4 py-3 text-left text-destructive hover:bg-white/10 rounded-lg" 
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="mt-4 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-white text-center transition-all shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
