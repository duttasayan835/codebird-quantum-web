
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative glass-card overflow-hidden p-8 md:p-16">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Join <span className="text-gradient">The Codebird Club</span>?
            </h2>
            <p className="text-xl text-foreground/80 mb-10">
              Become part of our vibrant community of developers, collaborate on innovative projects, 
              and take your coding journey to new heights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/join"
                className="px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-white transition-all shadow-lg hover:shadow-primary/40 text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Join Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full transition-all text-lg w-full sm:w-auto text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
