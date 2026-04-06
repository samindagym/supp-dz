"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Truck, Shield, Star, Phone, MapPin, ChevronDown, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";

// Animation variants for reusable patterns
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn = {
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

  const products = [
    { name: "Muscle Fuel Anabolic (4kg)", price: "12,500 DA", image: "/products/muscle_fuel_anabolic.png", rating: 4.9, reviews: 234, brand: "Golden Body" },
    { name: "Blue Lab Whey (1kg)", price: "6,800 DA", image: "/products/blue_lab_whey.png", rating: 4.8, reviews: 189, brand: "Golden Body" },
    { name: "Pure Whey (2kg)", price: "12,700 DA", image: "/products/pure_whey.png", rating: 4.7, reviews: 156, brand: "Golden Body" },
    { name: "Anabolic Isolate (1kg)", price: "7,400 DA", image: "/products/anabolic_isolate.png", rating: 4.9, reviews: 312, brand: "Golden Body" },
    { name: "Creatine (350g)", price: "4,500 DA", image: "/products/creatine.png", rating: 4.6, reviews: 98, brand: "Golden Body" },
    { name: "Citrulline Malate (250g)", price: "3,000 DA", image: "/products/citrulline_malate.png", rating: 4.8, reviews: 267, brand: "Golden Body" },
  ];

  const features = [
    { icon: Truck, title: "Livraison 58 Wilayas", desc: "Livraison rapide partout en Algérie" },
    { icon: Shield, title: "Produits 100% Authentiques", desc: "Certifiés et vérifiés" },
    { icon: ShoppingCart, title: "Paiement à la Livraison", desc: "Payez quand vous recevez" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-green-500/30">
      <Navbar />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600 origin-left z-50"
        style={{ scaleX: productsProgress }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
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
          className="relative z-20 text-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.span
              animate={{
                boxShadow: ["0 0 0px rgba(74, 222, 128, 0)", "0 0 20px rgba(74, 222, 128, 0.2)", "0 0 0px rgba(74, 222, 128, 0)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block px-6 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-bold tracking-widest uppercase"
            >
              🇩🇿 N°1 en Algérie - PERFORMANCE PREMIUM
            </motion.span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-[5.5rem] font-black leading-tight mb-8 tracking-tighter"
          >
            L&apos;Excellence en
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">
              Nutrition Sportive
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Les meilleurs suppléments pour atteindre vos objectifs fitness.
            Livraison dans les 58 wilayas. Paiement à la réception.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Nos Produits <ShoppingCart className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://wa.me/213555555555"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 border border-white/20 backdrop-blur-md rounded-full font-bold text-lg hover:border-green-500/50 transition-all flex items-center justify-center gap-2 group"
            >
              <Phone className="w-5 h-5 text-green-500 group-hover:animate-pulse" /> Commander
            </motion.a>
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

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ce Que Disent Nos Clients</h2>
            <p className="text-gray-400">+10,000 clients satisfaits à travers l'Algérie</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Amine B.", city: "Alger", text: "Produits authentiques et livraison rapide. J'ai gagné 5kg de muscle en 2 mois!", rating: 5 },
              { name: "Karim M.", city: "Oran", text: "Le meilleur service en Algérie. Prix compétitifs et équipe très réactive sur WhatsApp.", rating: 5 },
              { name: "Yacine T.", city: "Constantine", text: "Je commande depuis 6 mois, jamais déçu. La whey est excellente!", rating: 5 },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-green-500/30 mb-4" />
                <p className="text-gray-300 mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-24 px-4 bg-gradient-to-b from-black to-gray-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pourquoi Nous Choisir ?</h2>
            <p className="text-gray-400">La confiance de +10,000 clients à travers l'Algérie</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all"
              >
                <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
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
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Meilleurs Ventes</h2>
            <p className="text-gray-400">Les suppléments les plus populaires en Algérie</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-black/40 flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">{product.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors uppercase tracking-tight">{product.name}</h3>
                  <p className="text-2xl font-black text-white mb-6">{product.price}</p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all"
                  >
                    Commander
                  </motion.button>
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
            <motion.a
              href="https://wa.me/213555555555"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all"
            >
              Commander sur WhatsApp
            </motion.a>
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
