"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, ArrowLeft, ShieldCheck, Zap, Thermometer, FlaskConical, Beaker, CheckCircle2, ChevronRight, Scale, Info, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { products, Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import ComparisonHUD from "@/components/ComparisonHUD";

export default function ProductLanding() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  
  const [activeTab, setActiveTab] = useState<'benefits' | 'nutrition' | 'science'>('benefits');
  const [isScanned, setIsScanned] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<{ id: string, purity: string } | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scannerY = useTransform(scrollYProgress, [0, 0.3], ["-10%", "110%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const handleVerifyBatch = () => {
    if (isVerifying || verificationData) return;
    setIsVerifying(true);
    
    // Simulate high-tech verification
    setTimeout(() => {
      setVerificationData({
        id: `GB-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        purity: (99 + Math.random() * 0.9).toFixed(2) + "%"
      });
      setIsVerifying(false);
    }, 2000);
  };

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-[0.2em]">Product Not Found</h1>
        <Link href="/" className="text-green-500 hover:underline">Back to Lab</Link>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb / Back */}
          <Link href="/" className="inline-flex items-center gap-2 mb-12 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-green-400 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;Inventaire
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            {/* Left: Interactive Lab Scanner View */}
            <div className="relative lg:sticky lg:top-32">
              {/* The Scanner Frame */}
              <div className="relative aspect-square rounded-[3rem] bg-zinc-900/50 border border-white/5 overflow-hidden group tactical-target">
                {/* Product ID Label - Centered */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-1 items-center w-full">
                  <span className="text-[10px] font-black text-green-500/50 uppercase tracking-[0.4em]">Unit ID: GB-{product.id.substring(0,6).toUpperCase()}</span>
                  <span className="text-[10px] font-black text-green-500/50 uppercase tracking-[0.4em]">Status: Verified Amino Matrix</span>
                </div>
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
                
                {/* 3D Product Image with Reveal Effect */}
                <motion.div 
                  className="relative w-full h-full p-12 overflow-hidden"
                  style={{ scale: imageScale }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      filter: isScanned ? "contrast(1.1) brightness(1.1)" : "contrast(1) brightness(1)"
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain drop-shadow-[0_0_50px_rgba(34,197,94,0.15)] group-hover:scale-105 transition-all duration-1000"
                    />
                  </motion.div>
                  
                  {/* Digital Overlay when scanned */}
                  <AnimatePresence>
                    {isScanned && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-green-500 pointer-events-none mix-blend-overlay"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* The Scanner Ray - Linked to Scroll for Better Feel */}
                <motion.div 
                  style={{ top: scannerY }}
                  onUpdate={(latest) => {
                    const top = typeof latest.top === 'string' ? parseFloat(latest.top) : 0;
                    if (top > 10 && top < 90) setIsScanned(true);
                  }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent z-10 shadow-[0_0_20px_rgba(34,197,94,1)]"
                />

                {/* Diagnostic HUD Elements */}
                <div className="absolute inset-0 p-8 pointer-events-none opacity-40">
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-green-500/30 rounded-tr-xl" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-green-500/30 rounded-bl-xl" />
                </div>
              </div>

              {/* Lab Certification Badge - NOW INTERACTIVE */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex items-center justify-center"
              >
                <button 
                  onClick={handleVerifyBatch}
                  disabled={isVerifying}
                  className={`flex items-center gap-4 px-6 py-4 bg-zinc-900 border transition-all duration-500 rounded-2xl relative overflow-hidden group ${
                    verificationData ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-green-500/20 hover:border-green-500/50'
                  }`}
                >
                  {/* Scanning Animation */}
                  {isVerifying && (
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-green-500/10 to-transparent skew-x-12 z-0"
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative">
                        <ShieldCheck className={`w-8 h-8 transition-colors duration-500 ${isVerifying ? 'text-yellow-500 animate-spin-slow' : verificationData ? 'text-green-500' : 'text-green-500/50'}`} />
                        {isVerifying && <motion.div layoutId="verify-glow" className="absolute inset-0 bg-yellow-500/20 blur-md rounded-full" />}
                    </div>
                    <div className="text-left">
                        <h4 className="text-xs font-black uppercase tracking-widest text-green-400">
                            {isVerifying ? 'ANALYSE EN COURS...' : verificationData ? 'BATCH VÉRIFIÉ CONFIRMÉ' : 'SUPP.DZ LAB CERTIFIED'}
                        </h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                            {isVerifying ? 'Synchronisation des molécules...' : verificationData ? `ID: ${verificationData.id} // pureté: ${verificationData.purity}` : 'Cliquer pour vérifier le batch actuel'}
                        </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right: Technical Specs & Intel */}
            <div className="space-y-12">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">
                  {product.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">{product.name}</h1>
                <p className="text-xl text-gray-400 font-medium leading-relaxed font-space max-w-xl">
                  {product.description}
                </p>
              </motion.div>

              {/* Lab Stats Grid - REVEAL SYSTEM */}
              <div className="grid grid-cols-2 gap-4">
                {product.labStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 group hover:border-green-500/30 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Zap className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</span>
                    <span className="block text-3xl font-bold font-syncopate text-white mb-2">{stat.value}</span>
                    <span className="block text-[10px] text-green-400 font-bold uppercase tracking-wider">{stat.desc}</span>
                  </motion.div>
                ))}
              </div>

              {/* Science & Intel Tabs */}
              <div className="bg-zinc-900/30 border border-white/5 rounded-[2rem] overflow-hidden">
                <div className="flex border-b border-white/5">
                  {(['benefits', 'nutrition', 'science'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                        activeTab === tab ? 'text-green-500' : 'text-gray-500 hover:text-white'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === 'benefits' && (
                      <motion.div
                        key="benefits"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                          <p className="text-gray-300 font-space text-sm leading-relaxed">Optimization of total protein intake for explosive growth.</p>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                          <p className="text-gray-300 font-space text-sm leading-relaxed">Micro-filtered formula for 100% molecular bioavailability.</p>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'nutrition' && (
                      <motion.div
                        key="nutrition"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm uppercase">
                          <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-gray-500 tracking-tighter">Calories</span>
                            <span className="text-white font-bold">{product.nutrition.calories}</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-gray-500 tracking-tighter">Protein</span>
                            <span className="text-white font-bold">{product.nutrition.protein}</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-gray-500 tracking-tighter">Carbs</span>
                            <span className="text-white font-bold">{product.nutrition.carbs}</span>
                          </div>
                          <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-gray-500 tracking-tighter">Fat</span>
                            <span className="text-white font-bold">{product.nutrition.fat}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'science' && (
                      <motion.div
                        key="science"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                      >
                        <div className="flex gap-4 items-center mb-4">
                          <Beaker className="w-6 h-6 text-green-500" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-green-400">Molecular Interaction Report</h4>
                        </div>
                        <p className="text-gray-400 font-space text-sm italic leading-relaxed">
                          {product.science}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Grid */}
              <div className="flex flex-col sm:flex-row gap-6 items-center pt-8 border-t border-white/5">
                <div className="flex-1 w-full">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-2">Market Valuation</div>
                  <div className="text-4xl font-bold font-syncopate">{product.price}</div>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsComparisonOpen(true)}
                      className="flex-1 sm:flex-none px-8 py-6 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:border-green-500/30 transition-all flex items-center justify-center gap-3"
                    >
                      <BarChart3 className="w-4 h-4 text-green-500" />
                      Analyse Comparative
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="flex-1 sm:flex-none px-12 py-6 bg-green-500 text-black rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-green-400 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Acquérir
                    </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* SIMPLIFIED COMPARISON SECTION */}
          <section className="mt-40 pt-20 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <span className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest mb-4">
                  Intelligence Comparative
                </span>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">Science Metrics</h2>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Scale className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{product.name} vs Marketplace standard</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: "Amino Retention", val: "94%", standard: "72%", icon: Thermometer },
                { label: "Metabolic Velocity", val: "Fast", standard: "Medium", icon: Zap },
                { label: "Purity Quotient", val: "Gold", standard: "Silver", icon: FlaskConical },
              ].map((metric) => (
                <div key={metric.label} className="p-10 rounded-[3rem] bg-zinc-900 shadow-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <metric.icon className="w-20 h-20 text-white" />
                  </div>
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-8">{metric.label}</h3>
                  <div className="flex items-end gap-6">
                    <div>
                      <span className="block text-4xl font-bold text-white mb-2">{metric.val}</span>
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Target Specs</span>
                    </div>
                    <div className="h-12 w-[2px] bg-white/10" />
                    <div>
                      <span className="block text-xl font-bold text-gray-600 mb-2">{metric.standard}</span>
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Industry standard</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LAB TRUST BANNER */}
          <div className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-r from-green-500/5 via-emerald-500/10 to-green-500/5 border border-green-500/10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-black/50 border border-green-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full animate-ping bg-green-500/10" />
                <FlaskConical className="w-10 h-10 text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Molecular Integrity Guaranteed</h3>
                <p className="text-gray-400 font-space">Every batch is tested in a third-party laboratory for 100% purity certification.</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWhatsAppOrder(product.name, 'Sample Inquiry')}
              className="px-10 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl"
            >
              Voir Rapports Labo
            </motion.button>
          </div>

        </div>
      </main>

      {/* Footer Intel */}
      <footer className="py-12 px-4 border-t border-white/5 opacity-40">
        <div className="max-w-7xl mx-auto flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
          <span>Access: Classified Level 4</span>
          <span>© 2026 SUPP.DZ LAB SYSTEMS</span>
        </div>
      </footer>
       <ComparisonHUD 
        isOpen={isComparisonOpen} 
        onClose={() => setIsComparisonOpen(false)} 
        baseProduct={product}
      />
    </div>
  );
}

function handleWhatsAppOrder(productName?: string, price?: string) {
    const WHATSAPP_NUMBER = "213555555555";
    let message = "Bonjour! J'aimerais avoir plus d'informations sur vos protocoles de laboratoire.";
    if (productName && price) {
      if (price === 'Sample Inquiry') {
         message = `Bonjour! Je souhaite consulter les rapports de laboratoire pour le *${productName}*.`;
      } else {
         message = `Bonjour! Je souhaite commander le *${productName}* au prix de *${price}*. Pouvez-vous me confirmer la disponibilité ?`;
      }
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
}
