"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Target, Zap, ChevronRight, RotateCcw, CheckCircle2, FlaskConical, Dna, BrainCircuit } from "lucide-react";
import { products, Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";

interface QuizStep {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    icon: any;
    desc: string;
  }[];
}

const Beaker = FlaskConical; // Alias for consistency

const quizSteps: QuizStep[] = [
  {
    id: "goal",
    question: "Select Primary Objective",
    options: [
      { label: "Anabolic Mass", value: "mass", icon: Target, desc: "Explosive muscle growth & calorie surplus" },
      { label: "Metabolic Shred", value: "shred", icon: Zap, desc: "Zero-carb isolate for lean definition" },
      { label: "Cellular Recovery", value: "recovery", icon: Activity, desc: "Amino spike for minimal downtime" },
    ],
  },
  {
    id: "experience",
    question: "Experience Level",
    options: [
      { label: "Initiation", value: "beginner", icon: FlaskConical, desc: "New to laboratory protocols" },
      { label: "Specialist", value: "intermediate", icon: Beaker, desc: "Consistent training & optimization" },
      { label: "Elite Operative", value: "pro", icon: BrainCircuit, desc: "Extreme physical taxing & max demand" },
    ],
  },
];

export default function DiagnosticQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<Product | null>(null);

  const handleSelect = (value: string) => {
    const stepId = quizSteps[currentStep].id;
    setAnswers({ ...answers, [stepId]: value });
    
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      startLaboratoryAnalysis();
    }
  };

  const startLaboratoryAnalysis = () => {
    setIsScanning(true);
    // Simulate complex calculation
    setTimeout(() => {
      findRecommendedProduct();
      setIsScanning(false);
    }, 2500);
  };

  const findRecommendedProduct = () => {
    const { goal, experience } = answers;
    let recommended: Product | undefined;

    if (goal === "mass") {
      recommended = products.find(p => p.id === "muscle-fuel-anabolic");
    } else if (goal === "shred") {
      recommended = products.find(p => p.id === "anabolic-isolate");
    } else {
        recommended = products.find(p => p.id === "blue-lab-whey");
    }

    setResult(recommended || products[0]);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden" id="diagnostic">
      {/* Background Tech Grids */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6"
          >
            <Dna className="w-5 h-5 text-green-500" />
            <span className="text-[10px] font-black text-green-400 uppercase tracking-[0.4em]">Protocol Diagnostic Hub</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">Laboratory Diagnostic</h2>
          <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-xs">Determine your specific supplement stack</p>
        </div>

        <div className="min-h-[500px] p-8 md:p-16 rounded-[4rem] bg-zinc-900 border border-white/5 relative overflow-hidden shadow-2xl">
          {/* HUD scan line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-green-500/10 animate-scanner-slow z-20" />
          
          <AnimatePresence mode="wait">
            {!isScanning && !result ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest block mb-2">Step 0{currentStep + 1} / 0{quizSteps.length}</span>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">{quizSteps[currentStep].question}</h3>
                  </div>
                  <div className="flex gap-1">
                    {quizSteps.map((_, i) => (
                      <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-green-500' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {quizSteps[currentStep].options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(option.value)}
                      className="group flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-green-500/50 hover:bg-green-500/5 transition-all text-left"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                        <option.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold uppercase tracking-tight mb-1">{option.label}</h4>
                        <p className="text-sm text-gray-500 leading-tight group-hover:text-gray-400">{option.desc}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="relative w-40 h-40 mb-10">
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-dashed border-green-500/20 rounded-full"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-2 border-green-500 rounded-full border-t-transparent shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="w-12 h-12 text-green-500 animate-pulse" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-[0.2em] mb-4 animate-pulse">Running Diagnostic Protocols</h3>
                <p className="text-gray-500 font-mono text-sm max-w-xs mx-auto">Analyzing molecular requirements and outputting optimal stack...</p>
                <div className="mt-8 flex gap-2">
                    {[1, 2, 3].map(i => (
                        <motion.div 
                            key={i} 
                            animate={{ scaleY: [1, 2, 1] }} 
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                            className="w-1 h-3 bg-green-500" 
                        />
                    ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6 justify-center text-center">
                    <div className="px-6 py-2 bg-green-500 text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full">Protocol Identified</div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-square bg-black/50 rounded-[3rem] p-10 border border-white/5 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-50" />
                        <Image 
                            src={result?.image || ''} 
                            alt={result?.name || 'Result'} 
                            fill
                            className="object-contain relative z-10 drop-shadow-[0_0_40px_rgba(34,197,94,0.3)] group-hover:scale-105 transition-transform duration-700 p-10" 
                        />
                        <div className="absolute inset-0 p-6 pointer-events-none opacity-40">
                            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-green-500/30 rounded-tr-xl" />
                            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-green-500/30 rounded-bl-xl" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">{result?.brand} // Recommended Stack</span>
                            <h3 className="text-4xl font-bold uppercase tracking-tight mb-4">{result?.name}</h3>
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                <p className="text-sm text-gray-400 font-space leading-relaxed">Our diagnostic suggests this formula perfectly matches your biomass optimization goals based on current lab metrics.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link 
                                href={`/product/${result?.id}`}
                                className="w-full py-6 bg-green-500 text-black text-center rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                            >
                                View Detailed Specs
                            </Link>
                            <button 
                                onClick={resetQuiz}
                                className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" /> Recalibrate Protocol
                            </button>
                        </div>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
