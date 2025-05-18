
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";

const TermsPage = () => {
  return (
    <AnimatedPage>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Terms and Conditions
          </motion.h1>
          
          <motion.div 
            className="prose prose-invert max-w-3xl mx-auto glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Codebird Club website and services, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part 
              of these terms, you may not access or use our website or services.
            </p>
            
            <h2>2. Membership</h2>
            <p>
              Membership to the Codebird Club is subject to approval and is at our sole discretion. We reserve the 
              right to reject applications or terminate memberships without providing reasons. Membership benefits 
              are subject to change and may vary depending on your membership level.
            </p>
            
            <h2>3. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, audio, video, 
              and software, is the property of the Codebird Club or its content suppliers and is protected by 
              international copyright laws. Unauthorized use, reproduction, modification, distribution, or display 
              of this content is strictly prohibited.
            </p>
            
            <h2>4. User Conduct</h2>
            <p>
              When using our website or services, you agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              <li>Use our website or services for any illegal or unauthorized purpose</li>
            </ul>
            
            <h2>5. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> to 
              understand how we collect, use, and disclose information about you.
            </p>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              The Codebird Club shall not be liable for any direct, indirect, incidental, special, or consequential 
              damages resulting from the use or inability to use our website or services. We make no warranties, 
              expressed or implied, regarding the reliability, accuracy, or availability of our website or services.
            </p>
            
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time without prior notice. 
              Your continued use of our website or services after any such changes constitutes your acceptance 
              of the new Terms and Conditions.
            </p>
            
            <h2>8. Contact</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at 
              <a href="mailto:legal@codebirdclub.com" className="text-primary hover:underline"> legal@codebirdclub.com</a>.
            </p>
            
            <p className="text-sm text-foreground/60 mt-8">
              Last updated: May 15, 2025
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-4">For more information, please check our:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/privacy"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default TermsPage;
