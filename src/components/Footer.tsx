
import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-codebird-primary to-codebird-accent flex items-center justify-center">
                <span className="font-bold text-white text-lg">CB</span>
              </div>
              <span className="text-xl font-bold text-gradient">CodeBird Club</span>
            </Link>
            <p className="text-foreground/70 mb-6">
              Empowering developers to soar beyond limitations through community, innovation, and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-codebird-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-codebird-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-codebird-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-codebird-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-codebird-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-foreground/70 hover:text-foreground transition-colors">Projects</Link></li>
              <li><Link to="/events" className="text-foreground/70 hover:text-foreground transition-colors">Events</Link></li>
              <li><Link to="/blog" className="text-foreground/70 hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-foreground/70 hover:text-foreground transition-colors">Learning Paths</Link></li>
              <li><Link to="/resources/tutorials" className="text-foreground/70 hover:text-foreground transition-colors">Tutorials</Link></li>
              <li><Link to="/resources/challenges" className="text-foreground/70 hover:text-foreground transition-colors">Coding Challenges</Link></li>
              <li><Link to="/gallery" className="text-foreground/70 hover:text-foreground transition-colors">Project Gallery</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Get in Touch</Link></li>
              <li><Link to="/join" className="text-foreground/70 hover:text-foreground transition-colors">Join the Club</Link></li>
              <li><a href="mailto:info@codebirdclub.com" className="text-foreground/70 hover:text-foreground transition-colors">info@codebirdclub.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm">
            &copy; {currentYear} CodeBird Club. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-foreground/50 text-sm hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="text-foreground/50 text-sm hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-foreground/50 text-sm hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
