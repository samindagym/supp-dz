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
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-transform duration-500">
              <ShoppingCart className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-[-0.05em] uppercase">
              SUPP<span className="text-green-500">.dz</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#hero" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Accueil</a>
            <a href="#products" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Produits</a>
            <a href="#features" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Avantages</a>
            <a href="#contact" className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://wa.me/213555555555?text=Bonjour!%20J%27aimerais%20avoir%20plus%20d%27informations%20sur%20vos%20suppl%C3%A9ments."
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Commander</span>
            </motion.a>

            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full text-[10px] font-black flex items-center justify-center text-black border-2 border-black">0</span>
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-400 hover:text-white transition-colors">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-10 border-t border-white/5 mt-4"
          >
            <div className="flex flex-col items-center gap-8">
              <a href="#hero" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-gray-400 hover:text-white">Accueil</a>
              <a href="#products" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-gray-400 hover:text-white">Produits</a>
              <a href="#features" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-gray-400 hover:text-white">Avantages</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-xl font-bold uppercase tracking-widest text-gray-400 hover:text-white">Contact</a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
