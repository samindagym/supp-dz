"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();
  
  // HUD only active in "Product Analysis" mode (Product Detail Pages)
  const isProductPage = pathname?.startsWith("/product/");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

  // Separate effect strictly for body cursor management
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    
    if (isProductPage && isDesktop) {
      document.body.classList.add("lab-focus-mode");
      document.body.style.cursor = "none";
    } else {
      document.body.classList.remove("lab-focus-mode");
      document.body.style.cursor = "default";
      if (!isDesktop) setIsVisible(false);
    }
    
    return () => {
      document.body.style.cursor = "default";
      document.body.classList.remove("lab-focus-mode");
    };
  }, [isProductPage]);

  useEffect(() => {
    if (!isProductPage) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('button, a, .group')) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY, isProductPage, isVisible]);

  if (!isProductPage || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "rgba(34, 197, 94, 0.8)" : "rgba(34, 197, 94, 0.3)",
        }}
        className="absolute w-8 h-8 rounded-full border-2 transition-colors duration-300"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-500 rounded-full" />
        <motion.div 
            animate={{ rotate: isHovering ? 90 : 0 }}
            className="absolute inset-[-4px]"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-green-500/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-2 bg-green-500/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-2 bg-green-500/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-2 bg-green-500/50" />
        </motion.div>
        {isHovering && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-[-20px] rounded-full border border-green-500/10 [background:radial-gradient(circle,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:4px_4px]"
            />
        )}
      </motion.div>
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "20px",
          translateY: "20px",
        }}
        animate={{
          opacity: isHovering ? 0.8 : 0,
        }}
        className="absolute bg-green-500/10 backdrop-blur-sm border border-green-500/20 px-2 py-1 rounded text-[8px] font-black font-mono text-green-500 flex flex-col"
      >
        <span>STATUS: LOCK_ON</span>
        <span>ID: SUPP-PRX</span>
      </motion.div>
    </div>
  );
}
