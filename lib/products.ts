export interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    rating: number;
    reviews: number;
    brand: string;
    category: string;
    description: string;
    labStats: {
        label: string;
        value: string;
        desc: string;
    }[];
    nutrition: {
        calories: string;
        protein: string;
        carbs: string;
        fat: string;
        creatine?: string;
        bcaa?: string;
        glutamine?: string;
    };
    science: string;
}

export const products: Product[] = [
    {
        id: "muscle-fuel-anabolic",
        name: "Muscle Fuel Anabolic (4kg)",
        price: "12,500 DA",
        image: "/products/muscle_fuel_anabolic.png",
        rating: 4.9,
        reviews: 234,
        brand: "USN Performance",
        category: "All-In-One Gainer",
        description: "The ultimate all-in-one muscle-building supplement. Designed for athletes looking to gain serious mass and power.",
        labStats: [
            { label: "PROTEIN", value: "54g", desc: "Multi-stage release matrix" },
            { label: "CREATINE", value: "5g", desc: "Pure Monohydrate for ATP" },
            { label: "BCAA", value: "8g", desc: "Leucine-heavy recovery" },
            { label: "HMB", value: "1.5g", desc: "Muscle protection" }
        ],
        nutrition: {
            calories: "565 kcal",
            protein: "54g",
            carbs: "78g",
            fat: "3.2g",
            creatine: "5g",
            bcaa: "8.2g",
            glutamine: "4g"
        },
        science: "The Hyperbolic Stack uses a precise 2:1 ratio of carbohydrates to protein, optimized for post-workout glycogen replenishment and protein synthesis. The Tolerase™ L inclusion ensures maximum absorption."
    },
    {
        id: "blue-lab-whey",
        name: "Blue Lab Whey (1kg)",
        price: "6,800 DA",
        image: "/products/blue_lab_whey.png",
        rating: 4.8,
        reviews: 189,
        brand: "USN Elite",
        category: "Premium Whey",
        description: "The gold standard of whey protein. Formulated with input from professional athletes for maximum performance.",
        labStats: [
            { label: "ISOLATE", value: "90%", desc: "Ultra-pure protein source" },
            { label: "GLUTAMINE", value: "5.1g", desc: "Critical recovery acid" },
            { label: "BCAA", value: "5.3g", desc: "Essential growth aminos" },
            { label: "DIGEST", value: "100%", desc: "Added enzyme blend" }
        ],
        nutrition: {
            calories: "120 kcal",
            protein: "24g",
            carbs: "1.8g",
            fat: "1.5g",
            bcaa: "5.3g",
            glutamine: "5.1g"
        },
        science: "USN Blue Lab™ Whey is the first consumer-led R&D product in the global nutrition industry. It utilizes premium whey isolate, hydrolysate, and concentrate for immediate and sustained amino acid delivery."
    },
    {
        id: "pure-whey",
        name: "Pure Whey (2kg)",
        price: "12,700 DA",
        image: "/products/pure_whey.png",
        rating: 4.7,
        reviews: 156,
        brand: "Golden Body",
        category: "Classic Whey",
        description: "High-quality, pure whey protein for daily muscle maintenance and growth. No fillers, just pure performance.",
        labStats: [
            { label: "PROTEIN", value: "25g", desc: "Per 30g serving" },
            { label: "CALORIES", value: "115", desc: "Low-calorie formula" },
            { label: "SUGAR", value: "0.5g", desc: "Zero weight gain risk" },
            { label: "MIX", value: "Fast", desc: "No clumps guarantee" }
        ],
        nutrition: {
            calories: "115 kcal",
            protein: "25g",
            carbs: "2g",
            fat: "1.2g"
        },
        science: "Micro-filtered at low temperatures to ensure the protein fractions remain intact, preserving the natural immune-boosting properties of pure whey."
    },
    {
        id: "anabolic-isolate",
        name: "Anabolic Isolate (1kg)",
        price: "7,400 DA",
        image: "/products/anabolic_isolate.png",
        rating: 4.9,
        reviews: 312,
        brand: "USN Premium",
        category: "Isolate Protein",
        description: "The purest form of protein available. Zero fat, zero sugar, 100% anabolic potential.",
        labStats: [
            { label: "PROTEIN", value: "28g", desc: "Isolate excellence" },
            { label: "SUGAR", value: "0g", desc: "Zero carb formula" },
            { label: "FAT", value: "0g", desc: "Pure muscle fuel" },
            { label: "LACTOSE", value: "Zero", desc: "Friendly for digestion" }
        ],
        nutrition: {
            calories: "110 kcal",
            protein: "28g",
            carbs: "0g",
            fat: "0g",
            bcaa: "6g"
        },
        science: "Ionic-exchange isolation technology removes every trace of fat and carbohydrate, leaving only the bioactive protein molecules perfectly intact."
    },
    {
        id: "creatine",
        name: "Creatine (350g)",
        price: "4,500 DA",
        image: "/products/creatine.png",
        rating: 4.6,
        reviews: 98,
        brand: "USN Basic",
        category: "Performance Amino",
        description: "Pure micronized creatine monohydrate for explosive power and strength during high-intensity training.",
        labStats: [
            { label: "CREATINE", value: "100%", desc: "Micronized 200 Mesh" },
            { label: "SERVINGS", value: "70", desc: "Full 2 months supply" },
            { label: "PURITY", value: "Lab", desc: "99.9% Pure batch" },
            { label: "POWER", value: "Max", desc: "ATP Molecule boost" }
        ],
        nutrition: {
            calories: "0 kcal",
            protein: "0g",
            carbs: "0g",
            fat: "0g",
            creatine: "5000mg"
        },
        science: "Phosphocreatine is the primary source of anaerobic energy. Our 200 Mesh micronization ensures 20x better absorption than standard creatine powders."
    },
    {
        id: "citrulline-malate",
        name: "Citrulline Malate (250g)",
        price: "3,000 DA",
        image: "/products/citrulline_malate.png",
        rating: 4.8,
        reviews: 267,
        brand: "USN Core",
        category: "Pump & Recovery",
        description: "The ultimate pump amplifier. Increase nitric oxide and delay fatigue for the most intense workouts ever.",
        labStats: [
            { label: "CITRULLINE", value: "2:1", desc: "Malate optimal ratio" },
            { label: "PUMP", value: "Extreme", desc: "Nitric Oxide boost" },
            { label: "FATIGUE", value: "Low", desc: "Delayed lactic acid" },
            { label: "VEIN", value: "Max", desc: "Vascularity enhancement" }
        ],
        nutrition: {
            calories: "2 kcal",
            protein: "0g",
            carbs: "0.5g",
            fat: "0g"
        },
        science: "L-Citrulline Malate is a precursor to Arginine, providing a superior and more sustained increase in oxygen delivery to working muscles."
    }
];
