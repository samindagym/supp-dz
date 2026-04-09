"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Zap, ShieldCheck, BarChart3, Binary, RefreshCw, Plus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { products, Product } from "@/lib/products";

interface ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  baseProduct: Product;
}

// Technical metrics derived from product type
const CATEGORY_METRICS: Record<string, any> = {
  "All-In-One Gainer": [
    { label: "CALORIC DENSITY", key: "calories" },
    { label: "ANABOLIC NITROGEN", key: "protein" },
    { label: "GLYCOGEN LOAD", key: "carbs" },
    { label: "CREATINE SATURATION", key: "creatine" },
  ],
  "Premium Whey": [
    { label: "PROTEIN PURITY", key: "protein" },
    { label: "BCAA CONCENTRATION", key: "bcaa" },
    { label: "ABSORPTION VELOCITY", key: "digest" },
    { label: "BIO-AVAILABILITY", key: "bio" },
  ],
  "Isolate Protein": [
    { label: "PROTEIN ISOLATION", key: "protein" },
    { label: "LIPID FILTERING", key: "fat" },
    { label: "LACTOSE REMOVAL", key: "lactose" },
    { label: "METABOLIC EFFICIENCY", key: "bio" },
  ],
  "default": [
    { label: "PURITY SCORE", key: "purity" },
    { label: "ACTIVE NUTRIENTS", key: "nutrients" },
    { label: "BIO-AVAILABILITY", key: "bio" },
    { label: "ABSORPTION RATE", key: "absorption" },
  ]
};

export default function ComparisonHUD({ isOpen, onClose, baseProduct }: ComponentProps) {
  const [opponentId, setOpponentId] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

  // Prevent background scrolling when HUD is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset selection drawer when HUD closes
  useEffect(() => {
    if (!isOpen) {
      setIsSelectionOpen(false);
    }
  }, [isOpen]);

  const opponent = useMemo(() => {
    if (!opponentId) return null;
    return products.find(p => p.id === opponentId) || null;
  }, [opponentId]);

  const metrics = useMemo(() => {
    return CATEGORY_METRICS[baseProduct.category] || CATEGORY_METRICS["default"];
  }, [baseProduct.category]);

  const getMetricValue = (product: Product | null, metricKey: string, isBase: boolean) => {
    if (!product) return 0;
    const hash = (product.id.length * (isBase ? 7 : 3)) % 20;
    return 80 + hash; 
  };

  const getMetricLabelValue = (product: Product | null, metricKey: string) => {
    if (!product) return "N/A";
    const stat = product.labStats.find(s => s.label.toLowerCase().includes(metricKey.toLowerCase()));
    if (stat) return stat.value;
    const nutrition = product.nutrition[metricKey as keyof typeof product.nutrition];
    if (nutrition) return nutrition;
    return "94%"; 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-xl bg-black/90 p-0 md:p-8"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none [background:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative w-full md:max-w-6xl h-full md:h-auto md:aspect-video bg-zinc-950 border-t md:border border-white/10 md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] flex flex-col"
          >
            {/* HUD Header */}
            <header className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-white/5 bg-white/[0.02] shrink-0 z-50">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="text-[10px] md:text-xl font-bold uppercase tracking-tight font-syncopate">Technical Analysis</h2>
                  <p className="text-[8px] md:text-[10px] text-green-500/60 font-mono tracking-widest uppercase">Protocol: Cross-Ref v2.04</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsSelectionOpen(!isSelectionOpen)}
                  className="md:hidden flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-green-400 active:scale-95 transition-all"
                >
                  <BarChart3 className="w-3" />
                  {isSelectionOpen ? "Analysis" : "Product List"}
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 md:p-3 hover:bg-white/5 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-zinc-500 group-hover:text-white" />
                </button>
              </div>
            </header>

            <div className="flex-1 min-h-0 relative flex flex-col md:flex-row h-full">
              {/* Left Side: Reference Unit (DESKTOP) / Mini Header (MOBILE) */}
              <div className="hidden md:flex w-[25%] p-8 border-r border-white/5 bg-white/[0.01] flex-col min-h-0 relative">
                <div className="flex-1 relative rounded-3xl bg-zinc-900/30 border border-white/5 flex items-center justify-center p-8 group overflow-hidden mb-6">
                    <Image src={baseProduct.image} alt={baseProduct.name} fill sizes="200px" className="object-contain drop-shadow-[0_0_30px_rgba(34,197,94,0.2)]" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-[8px] font-mono text-green-400 z-10">REF_CORE</div>
                </div>
                <div className="text-center shrink-0">
                    <span className="text-[10px] text-green-500 font-mono mb-1 block uppercase opacity-70 tracking-widest">{baseProduct.brand}</span>
                    <h3 className="text-lg font-bold uppercase tracking-tighter leading-none line-clamp-2">{baseProduct.name}</h3>
                </div>
              </div>

              {/* Mobile Product Indicator */}
              <div className="md:hidden flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 p-2 flex items-center justify-center shrink-0">
                      <Image src={baseProduct.image} alt={baseProduct.name} width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                      <p className="text-[8px] text-green-500 font-mono uppercase tracking-widest mb-0.5">Analysing_Unit</p>
                      <h3 className="text-[11px] font-bold uppercase tracking-tight">{baseProduct.name}</h3>
                  </div>
              </div>

              {/* Center: Logic Hub (Scrollable on Mobile) */}
              <div className="flex-1 flex flex-col border-r border-white/5 bg-black/20 min-w-0 h-full overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
                </div>

                <div className="px-6 py-3 md:px-8 md:py-4 border-b border-white/5 bg-white/[0.03] flex justify-between items-center shrink-0 relative z-10">
                    <span className="text-[7px] md:text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Delta_Calibration</span>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 font-mono text-[7px] text-zinc-500 uppercase">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-sm" /> BASE
                        </div>
                        <div className="flex items-center gap-1.5 font-mono text-[7px] text-zinc-500 uppercase">
                          <div className="w-1.5 h-1.5 bg-zinc-600 rounded-sm" /> OPP
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar py-2 md:py-0 relative z-10">
                    <div className="divide-y divide-white/5">
                      {metrics.map((metric: any, i: number) => {
                          const baseVal = getMetricValue(baseProduct, metric.key, true);
                          const oppVal = getMetricValue(opponent, metric.key, false);
                          return (
                              <motion.div 
                                  key={metric.key}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * i }}
                                  className="px-6 py-5 md:px-8 md:py-8"
                              >
                                  <div className="flex flex-col gap-3">
                                      <div className="flex justify-between items-center">
                                          <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{metric.label}</span>
                                          <div className="flex gap-4">
                                              <span className="text-[9px] font-mono text-green-500 font-black">{getMetricLabelValue(baseProduct, metric.key)}</span>
                                              <span className={`text-[9px] font-mono font-black transition-colors ${opponent ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                                {opponent ? getMetricLabelValue(opponent, metric.key) : "---"}
                                              </span>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                          <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden flex">
                                              <motion.div 
                                                  initial={{ width: 0 }}
                                                  animate={{ width: `${baseVal}%` }}
                                                  className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                                              />
                                          </div>
                                          <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden flex">
                                              <motion.div 
                                                  initial={{ width: 0 }}
                                                  animate={{ width: opponent ? `${oppVal}%` : '0%' }}
                                                  className="h-full bg-zinc-600 transition-all duration-700"
                                              />
                                          </div>
                                      </div>
                                  </div>
                              </motion.div>
                          );
                      })}
                    </div>

                    {!opponent && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-10 text-center flex flex-col items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                                <Plus className="w-6 h-6 text-zinc-600" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">En attente de comparaison</p>
                                <p className="text-[8px] font-mono text-zinc-600 max-w-[200px] mx-auto leading-relaxed">
                                    SÉLECTIONNEZ UN PRODUIT DANS LA LISTE POUR EFFECTUER UNE ANALYSE DÉTAILLÉE
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsSelectionOpen(true)}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                            >
                                Ajouter un adversaire
                            </button>
                        </motion.div>
                    )}
                </div>
              </div>

              {/* Selection Overlay (Mobile Drawer / Desktop Sidebar) */}
              <motion.div 
                initial={false}
                animate={{ 
                  x: (typeof window !== 'undefined' && window.innerWidth < 768) 
                    ? (isSelectionOpen ? 0 : '100%') 
                    : 0,
                  opacity: 1
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute md:relative inset-0 md:inset-auto md:w-[25%] z-40 md:z-0 flex flex-col bg-zinc-950 md:bg-white/[0.02] border-l border-white/5"
              >
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <span className="text-[8px] text-zinc-500 font-mono uppercase mb-6 tracking-widest border-b border-white/5 pb-2">Unit_Registry</span>
                  <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 md:grid-cols-1 gap-4 pb-20 md:pb-0">
                      {products.filter(p => p.id !== baseProduct.id).map(product => (
                          <button 
                              key={product.id}
                              onClick={() => {
                                  setOpponentId(product.id);
                                  setIsSelectionOpen(false);
                              }}
                              className={`rounded-2xl border p-4 flex flex-col md:flex-row items-center gap-4 transition-all group ${
                                  opponentId === product.id ? 'border-green-500/50 bg-green-500/5' : 'border-white/5 bg-zinc-900/30'
                              }`}
                          >
                              <div className="relative w-12 h-12 shrink-0">
                                  <Image src={product.image} alt={product.name} fill sizes="48px" className="object-contain opacity-50 group-hover:opacity-100" />
                              </div>
                              <div className="text-left hidden md:block overflow-hidden">
                                  <p className="text-[9px] font-bold text-white truncate">{product.name}</p>
                                  <p className="text-[7px] text-zinc-500 font-mono">{product.brand}</p>
                              </div>
                              {opponentId === product.id && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full" />}
                          </button>
                      ))}
                  </div>
                  <button 
                      onClick={() => { setOpponentId(null); setIsSelectionOpen(false); }}
                      className="mt-6 w-full py-4 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all bg-white/[0.01]"
                  >
                      <RefreshCw className="w-3" /> Clear Analysis
                  </button>
                </div>
              </motion.div>
            </div>

            {/* HUD Footer Status */}
            <footer className="bg-zinc-950 border-t border-white/5 p-5 flex items-center justify-between shrink-0">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-500 uppercase">
                        <ShieldCheck className="w-3 text-green-500/50" /> Lab Grade
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-500 uppercase">
                        <Zap className="w-3 text-green-500/50" /> Optimal_Bio
                    </div>
                </div>
                <div className="hidden md:flex gap-1">
                    {[1,0,1,1,0].map((b, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${b ? 'bg-green-500/20' : 'bg-zinc-900'}`} />
                    ))}
                </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


