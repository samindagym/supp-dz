"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart, Trash2, Phone } from "lucide-react";

interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (name: string, delta: number) => void;
  removeItem: (name: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, updateQuantity, removeItem }: CartDrawerProps) {
  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ""));
  
  const subtotal = items.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0);
  
  // Intelligent Discount: 10% off if order > 15,000 DA or > 2 items
  const discount = (subtotal > 15000 || items.length >= 2) ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleFinalOrder = () => {
    const WHATSAPP_NUMBER = "213555555555";
    let message = "🚀 *NOUVELLE COMMANDE - SUPP.DZ*\n\n";
    
    items.forEach(item => {
      message += `• ${item.quantity}x *${item.name}* (${item.price})\n`;
    });

    message += `\n━━━━━━━━━━━━━━━\n`;
    message += `💰 *Sous-total:* ${subtotal.toLocaleString()} DA\n`;
    if (discount > 0) message += `🎁 *Remise Fidélité:* -${discount.toLocaleString()} DA\n`;
    message += `⭐ *TOTAL À PAYER:* *${total.toLocaleString()} DA*\n\n`;
    message += `📍 *Livraison:* 58 Wilayas (Algeria)\n`;
    message += `✍️ *Note:* Veuillez me recontacter pour finaliser l'adresse de livraison.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/40 backdrop-blur-2xl border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight">Mon Panier</h2>
                  <p className="text-xs text-gray-500 font-space">{items.length} produit(s)</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors border border-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium font-space">Votre panier est vide</p>
                  <button 
                    onClick={onClose}
                    className="text-green-500 text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm uppercase leading-tight max-w-[150px]">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.name)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <p className="text-sm font-bold text-green-400 font-space italic">{item.price}</p>
                        
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => updateQuantity(item.name, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.name, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-black/40 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Sous-total</span>
                    <span className="font-space">{subtotal.toLocaleString()} DA</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-400 font-bold">
                      <span className="flex items-center gap-1 italic underline decoration-green-400/30 font-syncopate text-[8px]">⭐ Remise Fidélité</span>
                      <span className="font-space">-{discount.toLocaleString()} DA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/5">
                    <span>TOTAL</span>
                    <span className="text-white tracking-tighter font-space italic">{total.toLocaleString()} DA</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinalOrder}
                  className="w-full py-5 bg-green-500 text-black rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all"
                >
                  <Phone className="w-5 h-5 fill-black" />
                  Finaliser ma commande
                </motion.button>
                
                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-bold">
                  ⚡ Livraison Express dans toute l&apos;Algérie
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
