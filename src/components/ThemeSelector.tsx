
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Palette } from "lucide-react";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "space", name: "Deep Space", color: "from-gray-900 to-purple-900" },
    { id: "matrix", name: "Matrix", color: "from-green-900 to-black" },
    { id: "cyberpunk", name: "Cyberpunk", color: "from-pink-900 to-cyan-900" },
    { id: "neon", name: "Neon", color: "from-purple-900 to-blue-900" }
  ];

  return (
    <div className="relative group">
      <motion.button
        className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Palette size={20} className="text-white" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
      >
        <div className="space-y-2 min-w-[150px]">
          <h3 className="text-sm font-medium text-white mb-3">Choose Theme</h3>
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id as any)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                theme === themeOption.id ? "bg-white/20" : "hover:bg-white/10"
              }`}
              whileHover={{ x: 5 }}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-gradient-to-r ${themeOption.color}`}
              />
              <span className="text-sm text-white">{themeOption.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSelector;
