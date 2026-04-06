"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            SUPP<span className="text-white">.dz</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-300 hover:text-white transition-colors">Accueil</a>
            <a href="#products" className="text-gray-300 hover:text-white transition-colors">Produits</a>
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Avantages</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://wa.me/213555555555"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-600 rounded-full font-medium hover:bg-green-700 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Commander</span>
            </motion.a>

            <button className="relative p-2 text-gray-300 hover:text-white">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-800 mt-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#hero" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Accueil</a>
              <a href="#products" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Produits</a>
              <a href="#features" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Avantages</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">Contact</a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
