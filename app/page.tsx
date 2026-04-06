"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShoppingCart, Truck, Shield, Star, Phone, MapPin, ChevronDown, Quote, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

// Animation variants for reusable patterns
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef });
  const { scrollYProgress: productsProgress } = useScroll({ target: productsRef });

  const heroImageY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroImageOpacity = useTransform(heroProgress, [0, 0.5, 0.8], [1, 0.3, 0]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -50]);

  // Cart State Management
  const [cart, setCart] = useState<{ name: string; price: string; image: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("supp_dz_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Cart LOAD ERROR:", err);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("supp_dz_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { name: string; price: string; image: string }) => {
    setCart(currItems => {
      const existingItem = currItems.find(item => item.name === product.name);
      if (existingItem) {
        return currItems.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart trigger
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(currItems =>
      currItems
        .map(item => (item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (name: string) => {
    setCart(currItems => currItems.filter(item => item.name !== name));
  };

  const products = [
    { name: "Muscle Fuel Anabolic (4kg)", price: "12,500 DA", image: "/products/muscle_fuel_anabolic.png", rating: 4.9, reviews: 234, brand: "Golden Body" },
    { name: "Blue Lab Whey (1kg)", price: "6,800 DA", image: "/products/blue_lab_whey.png", rating: 4.8, reviews: 189, brand: "Golden Body" },
    { name: "Pure Whey (2kg)", price: "12,700 DA", image: "/products/pure_whey.png", rating: 4.7, reviews: 156, brand: "Golden Body" },
    { name: "Anabolic Isolate (1kg)", price: "7,400 DA", image: "/products/anabolic_isolate.png", rating: 4.9, reviews: 312, brand: "Golden Body" },
    { name: "Creatine (350g)", price: "4,500 DA", image: "/products/creatine.png", rating: 4.6, reviews: 98, brand: "Golden Body" },
    { name: "Citrulline Malate (250g)", price: "3,000 DA", image: "/products/citrulline_malate.png", rating: 4.8, reviews: 267, brand: "Golden Body" },
  ];

  const WHATSAPP_NUMBER = "213555555555";

  const handleWhatsAppOrder = (productName?: string, price?: string) => {
    let message = "Bonjour! J'aimerais avoir plus d'informations sur vos suppléments.";
    if (productName && price) {
      message = `Bonjour! Je souhaite commander le *${productName}* au prix de *${price}*. Pouvez-vous me confirmer la disponibilité ?`;
    }
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const features = [
    { icon: Truck, title: "Livraison 58 Wilayas", desc: "Livraison rapide partout en Algérie" },
    { icon: Shield, title: "Produits 100% Authentiques", desc: "Certifiés et vérifiés" },
    { icon: ShoppingCart, title: "Paiement à la Livraison", desc: "Payez quand vous recevez" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-green-500/30">
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 origin-left z-50"
        style={{ scaleX: productsProgress }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
        {/* Cinematic Background Image Layer */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: heroImageY,
            opacity: heroImageOpacity,
            scale: heroImageScale,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-60" />
          <img
            src="/hero/supplement_hero.png"
            alt="Premium Supplements"
            className="w-full h-full object-cover brightness-[50%] contrast-[110%]"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          style={{ y: heroContentY }}
          className="relative z-20 text-center max-w-7xl mx-auto px-4"
        >
          {/* Animated Glow Background behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/20 blur-[120px] rounded-full animate-dynamic-glow pointer-events-none -z-10" />

          <motion.div variants={fadeInUp} className="mb-10">
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-block px-10 py-3 bg-gradient-to-r from-green-500/10 via-emerald-500/20 to-green-500/10 border border-green-500/40 rounded-full text-green-400 text-[10px] font-bold tracking-[0.4em] uppercase"
            >
              🇩🇿 Performance Premium DZ
            </motion.span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, ease: [0.33, 1, 0.68, 1] } }
              }}
              className="text-4xl md:text-[7rem] font-bold leading-[0.9] tracking-tight md:tracking-[-0.05em] uppercase"
            >
              L&apos;Excellence en
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-12">
            <motion.h1
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] } }
              }}
              className="text-4xl md:text-[7rem] font-bold leading-[0.9] tracking-tight md:tracking-[-0.05em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500"
            >
              Nutrition Sportive
            </motion.h1>
          </div>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed font-space"
          >
            Les meilleurs suppléments pour une performance inégalée.
            <span className="block italic text-green-500/80 font-bold mt-2">Livraison Express dans les 58 Wilayas.</span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 group"
            >
              Nos Produits <ShoppingCart className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.button
              onClick={() => handleWhatsAppOrder()}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 border border-white/20 backdrop-blur-md rounded-full font-bold text-lg hover:border-green-500/50 transition-all flex items-center justify-center gap-2 group"
            >
              <Phone className="w-5 h-5 text-green-500 group-hover:animate-pulse" /> Commander
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-green-500/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 px-4 relative">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[150px] animate-dynamic-glow -z-10" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight">Leurs Avis</h2>
            <p className="text-gray-400 text-lg md:text-xl font-space uppercase tracking-[0.2em]">+10,000 Athlètes Satisfaits</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Amine B.", city: "Alger", text: "Produits authentiques et livraison rapide. J'ai gagné 5kg de muscle en 2 mois!", rating: 5 },
              { name: "Karim M.", city: "Oran", text: "Le meilleur service en Algérie. Prix compétitifs et équipe très réactive sur WhatsApp.", rating: 5 },
              { name: "Yacine T.", city: "Constantine", text: "Je commande depuis 6 mois, jamais déçu. La whey est excellente!", rating: 5 },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.05] relative group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                <Quote className="absolute top-10 right-10 w-16 h-16 text-green-500/10" />
                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-space italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg uppercase tracking-tight">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 font-space">{testimonial.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    <section ref={featuresRef} id="features" className="py-32 px-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[180px] animate-dynamic-glow -z-10" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-[-0.02em]">Pourquoi Nous ?</h2>
            <p className="text-gray-400 text-lg md:text-xl font-space uppercase tracking-[0.2em]">+10k Clients Satisfaits</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.05] hover:border-green-500/40 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-500">
                  <feature.icon className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-space">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} id="products" className="py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-8xl font-bold mb-6 uppercase tracking-[-0.04em] leading-tight">Best Sellers</h2>
            <p className="text-gray-400 text-lg md:text-xl font-space uppercase tracking-[0.3em]">La Qualité Sans Compromis</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative p-8 rounded-[3rem] bg-white/[0.03] border border-white/[0.05] hover:border-green-500/40 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative">
                  <div className="aspect-square mb-10 overflow-hidden rounded-[2.5rem] bg-white flex items-center justify-center p-10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em]">{product.brand}</span>
                    <div className="flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-green-500 text-green-500" />
                      <span className="text-xs font-bold text-green-400">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-6 group-hover:text-green-400 transition-colors uppercase tracking-tight leading-[1.2] px-2">{product.name}</h3>

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
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Contactez-Nous</h2>
            <p className="text-gray-400">Une question ? Notre équipe vous répond sous 24h</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={scaleIn} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <a href="tel:+213555555555" className="text-lg font-semibold hover:text-green-400">+213 555 55 55 55</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Adresse</p>
                  <p className="text-lg font-semibold">Tipaza, Algérie</p>
                </div>
              </div>
            </motion.div>

            <motion.form variants={scaleIn} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
              <input
                type="tel"
                placeholder="Votre téléphone"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 transition-colors"
              />
              <textarea
                placeholder="Votre message"
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 transition-colors resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Envoyer le Message
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à Commencer Votre Transformation ?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-10">
            Commandez maintenant et recevez vos produits dans 2-5 jours ouvrables
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => handleWhatsAppOrder()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              Commander sur WhatsApp
            </motion.button>
            <motion.a
              href="tel:+213555555555"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-gray-600 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all"
            >
              Appeler Maintenant
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400">
            © 2026 Supplement Store Algeria. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Tipaza, Algérie</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
