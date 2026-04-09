"use client";

import { motion, type Variants } from "framer-motion";
import { Star, Phone, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as any }
};

interface ProductCardProps {
  product: Product;
  handleWhatsAppOrder: (name: string, price: string) => void;
}

export default function ProductCard({ product, handleWhatsAppOrder }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -15, scale: 1.02 }}
      className="group relative p-8 rounded-[3rem] bg-white/[0.03] border border-white/[0.05] hover:border-green-500/40 transition-all duration-700 overflow-hidden"
    >
      {/* Holographic Data Grid Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none [background:radial-gradient(circle,rgba(34,197,94,0.3)_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Tactical Scanline */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500/50 -translate-y-full group-hover:animate-scanner-slow z-20 pointer-events-none shadow-[0_0_15px_rgba(34,197,94,0.8)]" />

      <div className="relative">
        <Link href={`/product/${product.id}`} className="block">
          <div className="aspect-square mb-10 overflow-hidden rounded-[2.5rem] bg-white flex items-center justify-center p-10 group-hover:scale-95 transition-transform duration-700 shadow-2xl relative">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              quality={75}
              className="w-full h-full object-contain filter drop-shadow-2xl group-hover:blur-sm transition-all duration-700"
            />
            
            {/* Technical Data Overlay (Revealed on Hover) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 backdrop-blur-[2px]">
              <div className="space-y-4">
                {product.labStats.slice(0, 3).map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="flex flex-col border-l-2 border-green-500 pl-4"
                  >
                    <span className="text-[8px] font-mono text-green-500/70 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-xl font-black font-syncopate text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">{product.brand}</span>
          <div className="flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
            <Star className="w-3 h-3 fill-green-500 text-green-500" />
            <span className="text-xs font-bold text-green-400">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-2xl font-bold mb-6 group-hover:text-green-400 transition-colors uppercase tracking-tight leading-[1.2] px-2">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between mt-auto px-2">
          <p className="text-3xl font-bold text-white tracking-tighter font-space italic">{product.price}</p>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => handleWhatsAppOrder(product.name, product.price)}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
              title="Commander Direct"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => addToCart(product)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-green-500 text-black rounded-2xl flex items-center justify-center hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
              title="Ajouter au Panier"
            >
              <Plus className="w-7 h-7" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
