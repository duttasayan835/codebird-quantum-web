
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";

const CookiesPage = () => {
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
            Cookie Policy
          </motion.h1>
          
          <motion.div 
            className="prose prose-invert max-w-3xl mx-auto glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the owners of the site.
            </p>
            
            <h2>2. How We Use Cookies</h2>
            <p>
              The CodeBird Club website uses cookies for the following purposes:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. 
                They enable core functionality such as security, network management, and account access.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies allow us to remember choices you make and 
                provide enhanced features.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> We use analytics cookies to collect information about how 
                visitors use our website. This helps us improve our website and your browsing experience.
              </li>
              <li>
                <strong>Personalization Cookies:</strong> These cookies help us provide a more personalized experience 
                by remembering your preferences and settings.
              </li>
            </ul>
            
            <h2>3. Third-Party Cookies</h2>
            <p>
              Some pages on our website may include content from third-party services such as YouTube, Twitter, 
              or Facebook. These third-party services may use cookies when you visit our pages. We do not control 
              these third-party cookies and recommend you check the cookie policies of these third-party services 
              to understand how they use cookies.
            </p>
            
            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Most web browsers allow you to manage your cookie 
              preferences. You can:
            </p>
            <ul>
              <li>Delete cookies from your device</li>
              <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
              <li>Set your browser to notify you when you receive a cookie</li>
            </ul>
            <p>
              Please note that if you choose to block or delete cookies, you may not be able to access certain areas 
              or features of our website, and some services may not function properly.
            </p>
            
            <h2>5. Changes to Our Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. Any changes will be posted on this page with an 
              updated revision date.
            </p>
            
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at 
              <a href="mailto:privacy@codebirdclub.com" className="text-primary hover:underline"> privacy@codebirdclub.com</a>.
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
                to="/terms"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Terms and Conditions
              </Link>
              <Link
                to="/privacy"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </AnimatedPage>
  );
};

export default CookiesPage;
