
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedPage from "../components/AnimatedPage";

const PrivacyPage = () => {
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
            Privacy Policy
          </motion.h1>
          
          <motion.div 
            className="prose prose-invert max-w-3xl mx-auto glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>1. Introduction</h2>
            <p>
              At the CodeBird Club, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or use our services.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li>
                <strong>Personal Information:</strong> This includes your name, email address, phone number, 
                and other information you provide when creating an account, registering for events, or 
                contacting us.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and use our website, including 
                your IP address, browser type, pages visited, and time spent on our website.
              </li>
              <li>
                <strong>Technical Data:</strong> Information about your device, operating system, and internet connection.
              </li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use your information for the following purposes:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow you to participate in interactive features of our website</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
              or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>5. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your information to outside parties without your consent, 
              except as described in this Privacy Policy. This does not include trusted third parties who assist us 
              in operating our website, conducting our business, or serving you, as long as these parties agree to 
              keep this information confidential.
            </p>
            
            <h2>6. Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website. For more information about how we use 
              cookies, please see our <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
            
            <h2>7. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Request transfer of your personal information</li>
              <li>Withdraw consent at any time</li>
            </ul>
            
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at 
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

export default PrivacyPage;
