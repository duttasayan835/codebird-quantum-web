
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl bg-codebird-primary/20 rounded-full"></div>
            <h1 className="relative text-9xl font-bold text-gradient glow">404</h1>
          </div>
          <h2 className="text-3xl font-bold mb-6">Page not found</h2>
          <p className="text-xl text-foreground/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg"
          >
            <ArrowLeft size={18} /> Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
