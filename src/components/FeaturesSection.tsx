
import React from "react";

const features = [
  {
    icon: "🚀",
    title: "Cutting-Edge Projects",
    description: "Access and collaborate on innovative projects that push the boundaries of technology."
  },
  {
    icon: "👥",
    title: "Vibrant Community",
    description: "Connect with like-minded developers and share knowledge in our supportive network."
  },
  {
    icon: "🎯",
    title: "Skill Development",
    description: "Enhance your coding abilities through workshops, resources, and hands-on challenges."
  },
  {
    icon: "🌐",
    title: "Global Network",
    description: "Join a worldwide community of developers collaborating across time zones and borders."
  },
  {
    icon: "🧠",
    title: "AI & Future Tech",
    description: "Explore the cutting edge of artificial intelligence and emerging technologies."
  },
  {
    icon: "🎮",
    title: "Interactive Learning",
    description: "Learn through immersive, gamified experiences designed for maximum engagement."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Join <span className="text-gradient">Codebird Club</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Unlock a world of opportunities and take your development skills to new heights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 transition-all hover:translate-y-[-5px] hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
