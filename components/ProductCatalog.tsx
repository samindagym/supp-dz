"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Activity, Zap, Box, FlaskConical, Target } from "lucide-react";
import { products, Product } from "@/lib/products";
import ProductCard from "./ProductCard";

const PROTOCOLS = [
  { id: "all", label: "ALL_UNITS", icon: Box, categories: [] },
  { id: "gainer", label: "ANABOLIC_STACK", icon: Target, categories: ["All-In-One Gainer"] },
  { id: "whey", label: "PROTEIN_CORE", icon: Activity, categories: ["Premium Whey", "Classic Whey", "Isolate Protein"] },
  { id: "recovery", label: "RECOVERY_FUEL", icon: Zap, categories: ["Performance Amino", "Pump & Recovery"] },
];

export default function ProductCatalog() {
  const [activeProtocol, setActiveProtocol] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeProtocol === "all") return matchesSearch;
      
      const protocol = PROTOCOLS.find(p => p.id === activeProtocol);
      const matchesProtocol = protocol?.categories.includes(product.category);
      
      return matchesSearch && matchesProtocol;
    });
  }, [activeProtocol, searchQuery]);

  const handleWhatsAppOrder = (productName: string, price: string) => {
    const WHATSAPP_NUMBER = "213555555555";
    const message = `Bonjour! Je souhaite commander le *${productName}* au prix de *${price}*. Pouvez-vous me confirmer la disponibilité ?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="space-y-12 pb-32">
      {/* Protocol HUD (The Discovery Center) */}
      <div className="sticky top-24 z-30 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden group/hud">
        
        {/* HUD Pulse Background */}
        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover/hud:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
          
          {/* Search Terminal */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className={`w-4 h-4 transition-colors ${searchQuery ? 'text-green-500' : 'text-zinc-500'}`} />
            </div>
            <input 
              type="text"
              placeholder="SEARCH_INVENTORY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-mono tracking-widest text-green-500 placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 transition-all font-bold"
            />
            
            {/* Terminal Scanning Line */}
            {searchQuery && (
                <motion.div 
                    initial={{ left: "10%" }}
                    animate={{ left: "90%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-3 h-[1px] w-8 bg-green-500/50 blur-[1px]"
                />
            )}

            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className={`px-2 py-0.5 rounded text-[8px] font-mono transition-colors ${searchQuery ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    {searchQuery ? 'ACTIVE_SCAN' : 'READY'}
                </div>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/5 hidden md:block" />

          {/* Protocol Selection Deck */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {PROTOCOLS.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => setActiveProtocol(protocol.id)}
                className={`relative px-6 py-3 rounded-xl flex items-center gap-3 transition-all duration-500 whitespace-nowrap group ${
                  activeProtocol === protocol.id 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                } border`}
              >
                <protocol.icon className={`w-4 h-4 transition-colors ${
                  activeProtocol === protocol.id ? 'text-green-500' : 'text-zinc-500 group-hover:text-zinc-300'
                }`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  activeProtocol === protocol.id ? 'text-green-500' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {protocol.label}
                </span>
                {activeProtocol === protocol.id && (
                  <motion.div 
                    layoutId="protocol-active"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="h-10 w-[1px] bg-white/5 hidden md:block" />

          {/* Status Indicators */}
          <div className="hidden lg:flex items-center gap-10 px-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-zinc-600 uppercase">UNITS_FOUND</span>
              <span className="text-xl font-bold font-syncopate text-white">{filteredProducts.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[8px] font-mono text-zinc-600 uppercase">LAB_LATENCY</span>
                <span className="text-xl font-bold font-syncopate text-green-500">4MS</span>
            </div>
          </div>

        </div>
      </div>

      {/* Results Deck */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard 
                product={product} 
                handleWhatsAppOrder={handleWhatsAppOrder} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results Fallback */}
      {filteredProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-40 text-center"
        >
          <FlaskConical className="w-20 h-20 text-zinc-800 mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold uppercase tracking-widest text-zinc-500">Zero Matches Found in Inventory</h3>
          <p className="text-zinc-600 font-mono text-xs mt-2 uppercase">Protocol Parameter mismatch: Try broad-spectrum query</p>
          <button 
            onClick={() => { setActiveProtocol('all'); setSearchQuery(''); }}
            className="mt-8 px-8 py-3 bg-zinc-900 border border-white/5 hover:border-green-500/30 text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Reset All Sub-Systems
          </button>
        </motion.div>
      )}
    </div>
  );
}
