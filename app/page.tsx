"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardBody, Image } from "@heroui/react"
import {
  CheckCircle,
  Search,
  Globe,
  Phone,
  BarChart3,
  Settings,
  Bot,
  LineChart,
  Share2,
  FileText,
  Zap,
  Target,
  Clock,
  Check,
  Scale,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  Heart,
  ThumbsUp,
  Bookmark,
  Eye,
  Star,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Youtube,
  ImageIcon,
  Twitter,
  Github,
  Codepen,
  Users,
} from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { CountUp } from "@/components/animations/count-up"
import { useState, useEffect, useRef, forwardRef, useCallback, useImperativeHandle, useMemo } from "react"
import { motion, useInView, AnimatePresence, Transition, type VariantLabels, type AnimationControls, type TargetAndTransition } from 'framer-motion';
import VantaClouds from './components/VantaClouds';
import Header from "./components/Header"
import ShinyText from "./components/ShinyText"
import TiltedCard from "./components/TiltedCard"
import StarBorder from "./components/StarBorder"
import SpotlightCard from "./components/SpotlightCard"
import { Divider } from "@heroui/divider";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardDemo } from "@/components/ui/card-demo2";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ChartLineDefault } from "@/components/ui/chart-line-default"
import { ChartRadialText } from "@/components/ui/datavisualizer/chart-radial-text";
import LettersPullUp from "@/components/animations/letters-pull-up";
import { ChartPieLabel } from "@/components/ui/datavisualizer/chart-pie-label"
import { GlareHover } from "@/components/animations/glare"
import DecryptedText from '@/components/animations/cryptic-text';
import GradientText from "./components/gradienttext"
import Particles from "./components/Particles"


const commonGlareProps = {
  width: "100%",
  height: "auto",
  background: "transparent",
  borderColor: "rgba(255,255,255,0.05)",
  glareColor: "#22c55e",
  glareOpacity: 0.15,
  glareSize: 200,
  playOnce: true

};

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | VariantLabels;
  animate?: boolean | VariantLabels | AnimationControls | TargetAndTransition;
  exit?: VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(
          segmenter.segment(text),
          (segment) => segment.segment
        );
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex];
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }

      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset]
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName
        )}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className={cn(
              splitBy === "lines"
                ? "flex flex-col w-full"
                : "flex flex-wrap whitespace-pre-wrap relative"
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              return (
                <span
                  key={wordIndex}
                  className={cn("inline-flex", splitLevelClassName)}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce(
                            (sum, word) => sum + word.characters.length,
                            0
                          )
                        ),
                      }}
                      className={cn("inline-block", elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && (
                    <span className="whitespace-pre"> </span>
                  )}
                </span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";

export default function Home() {
  const [showMoreServices, setShowMoreServices] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const lastScrollY = useRef(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const beforeInView = useInView(beforeRef, { once: true });
  const afterInView = useInView(afterRef, { once: true });
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // New ref and inView for Why Sclay section
  const whySclayRef = useRef(null);
  const whySclayInView = useInView(whySclayRef, { once: true, amount: 0.1 });

  // New ref for Chart Section
  const chartSectionRef = useRef(null);
  const chartSectionInView = useInView(chartSectionRef, { once: true, amount: 0.2 });

  // New refs and inView for individual Why Sclay cards
  const timeIsMoneyCardRef = useRef(null);
  const effortlessOrgCardRef = useRef(null);
  const inexpensiveSupportCardRef = useRef(null);

  const timeIsMoneyCardInView = useInView(timeIsMoneyCardRef, { amount: 0.3, once: true });
  const effortlessOrgCardInView = useInView(effortlessOrgCardRef, { amount: 0.3, once: true });
  const inexpensiveSupportCardInView = useInView(inexpensiveSupportCardRef, { amount: 0.3, once: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768); // Assuming 768px is the 'md' breakpoint
      }
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    console.log('whySclayInView:', whySclayInView);
  }, [whySclayInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const whySclayContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.6,
      },
    },
  }

  const whySclayTitleVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const whySclayCardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const whySclayCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1
      },
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };



  return (
    <main className="flex min-h-screen flex-col font-[Blinker,sans-serif]">
      <Header />
      <div className="relative min-h-screen">
        <VantaClouds />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-6 text-5xl md:text-6xl font-bold tracking-tight text-white font-['Quantico'] font-[700]"
              >
                Scale Your Business<br />
                <span className="text-green-500 whitespace-nowrap font-['Pixelify_Sans']">with SCLAY</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Transform your business with a tailored system and framework
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-7 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] bg-black/60 backdrop-blur-sm"
                    asChild
                  >
                    <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                      Book A Call
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SCLAY Philosophy Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-x-10 gap-y-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="md:w-1/2 w-full text-3xl md:text-4xl font-bold text-gray-400 leading-tight font-[Quantico] md:mb-0 md:mt-10"
            >
              <span className="text-white">"At SCLAY, we build systems that adapt</span> to each company's unique way of working."
              <div className="mt-5 mb-0 bg-white md:hidden max-w-3xl mx-1 h-px" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="md:w-1/2 w-full text-lg text-grey-700 font-[Electrolize] space-y-2 pt-0"
            >
              <p className="mt-6 mb-4">
                We believe smart infrastructure should amplify what makes a business strong — not add layers of complexity or generic automation.
              </p>
              <p>
                That's why every SCLAY framework is designed to fit seamlessly into your existing workflows, handling the behind-the-scenes tasks, keeping information organized, and ensuring the right actions happen at the right time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Desktop-only Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="hidden md:block bg-white max-w-4xl mx-auto h-px" />
      </motion.div>

      {/* What We Do Section */}
      <section id="services" ref={servicesRef} className="bg-black py-20">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <TextGenerateEffect
              words="What We Do"
              className="text-white font-bold text-4xl md:text-5xl font-['Quantico'] font-[700] mb-1"
              animateTrigger={servicesInView}
            />
            <p className="text-gray-400 max-w-2xl mx-auto font-Electrolize">
              Solutions simply to help businesses thrive
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8">
                <ServiceCard
                  icon={<Bot className="h-10 w-10 text-green-500" />}
                  title="Custom AI Automations"
                  description="Smoothen your business operations with intelligent automation. Save countless hours by automating repetitive tasks, data entry, and workflow processes."
                />

                <ServiceCard
                  icon={<Globe className="h-10 w-10 text-green-500" />}
                  title="Website Optimization"
                  description="Upgrade your website's design and usability in real-time. Enhance user experience, mobile access, and conversion flow to capture more leads."
                  button={
                    <Button
                      variant="outline"
                      className="mt-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
                      asChild
                    >
                      <Link href="/demo">
                        Free Website Demo
                      </Link>
                    </Button>
                  }
                />

                <ServiceCard
                  icon={<Share2 className="h-10 w-10 text-green-500" />}
                  title="Social Automation"
                  description="Upload job photos and we'll handle the rest. AI generates professional captions and posts to showcase your work automatically."
                />

                {/* These cards are conditionally displayed on mobile */}
                <div className={cn({ 'hidden md:block': !showMoreServices })}>
                  <ServiceCard
                    icon={<FileText className="h-10 w-10 text-green-500" />}
                    title="AI Content"
                    description="Generate videos, scripts, voiceovers, and posts for your business. Mix of UGC and Ai."
                  />
                </div>
                
                <div className={cn({ 'hidden md:block': !showMoreServices })}>
                  <ServiceCard
                    icon={<BarChart3 className="h-10 w-10 text-green-500" />}
                    title="Performance Tracking"
                    description="See your marketing ROI in real-time. Track leads, appointments, and jobs generated from your investment."
                  />
                </div>

                <div className={cn({ 'hidden md:block': !showMoreServices })}>
                  <ServiceCard
                    icon={<Search className="h-10 w-10 text-green-500" />}
                    title="Google My Business"
                    description="Professional setup and optimization of your Google Business Profile to dominate local search results and improve visibility."
                  />
                </div>
              </div>
              {/* Gradient overlay for mobile */}
              <div className={cn("md:hidden absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none transition-opacity duration-500", showMoreServices ? "opacity-0" : "opacity-100")}></div>
            </div>
            {/* Centered Show More button for mobile */}
            <div className="md:hidden flex justify-center w-full mt-4">
              <button 
                onClick={() => setShowMoreServices(prev => !prev)}
                className="bg-gray-900 hover:bg-gray-800 h-12 w-12 rounded-full flex items-center justify-center border border-gray-700 transition-all duration-500 transform hover:scale-110 shadow-lg"
                aria-expanded={showMoreServices}
              >
                <svg
                  className={`h-6 w-6 text-green-500 transition-transform duration-500 ${showMoreServices ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Sclay Section */}
      <section id="why-sclay" className="bg-black relative overflow-hidden py-20" ref={whySclayRef}>
        <div className="container mx-auto px-4">
          <motion.div
            variants={whySclayContainerVariants}
            initial="hidden"
            animate={whySclayInView ? "visible" : "hidden"}
            className="text-center"
          >
              <TextGenerateEffect
                key={String(whySclayInView)}
                words="Why Sclay?"
                className="text-white font-bold text-4xl md:text-5xl font-['Quantico'] font-[700] mt-5 mb-1"
                animateTrigger={whySclayInView}
              />
              <motion.p 
                variants={whySclayTitleVariants}
                className="text-gray-400 max-w-2xl mx-auto font-Electrolize mb-10"
              >
                Solutions simply to help businesses thrive
              </motion.p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5"  
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.1
                    }
                  }
                }}
              >
                <motion.div
                  ref={timeIsMoneyCardRef}
                  variants={whySclayCardVariants}
                  className="flex flex-col items-center"
                >
                  <GlareHover {...commonGlareProps} className="transition-transform duration-300 hover:-translate-y-2">
                    <CardDemo
                      title="Time is Money"
                      description="Sclay manages redundant tasks with workflows and a backend system, allowing you to focus on high-impact work and boost your company's profitability."
                      image="/assets_task_01jy0anap4frab0a6v7ta3sj1k_1750210442_img_0.webp"
                    />
                  </GlareHover>
                </motion.div>
                <motion.div
                  ref={effortlessOrgCardRef}
                  variants={whySclayCardVariants}
                  className="flex flex-col items-center"
                >
                  <GlareHover {...commonGlareProps} className="transition-transform duration-300 hover:-translate-y-2">
                    <CardDemo
                      title="Effortless Organization"
                      description="With SCLAY, you can control your tasks and workflows, bringing order, clarity, and effortless management to your operations and your business. "
                      image="/assets_task_01jy0j6qfyf5ft380q0w6780zp_1750218344_img_0.webp"
                    />
                  </GlareHover>
                </motion.div>
                <motion.div
                  ref={inexpensiveSupportCardRef}
                  variants={whySclayCardVariants}
                  className="flex flex-col items-center"
                >
                  <GlareHover {...commonGlareProps} className="transition-transform duration-300 hover:-translate-y-2">
                    <CardDemo
                      title="Inexpensive Support"
                      description="With SCLAY, you spend less on piecemeal apps One backend system does more — keeping your operations lean and your budget in check."
                      image="/assets_task_01jy0mkv22ewtbg9y3pfrzvpjs_1750220866_img_0.webp"
                    />
                  </GlareHover>
                </motion.div>
              </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Chart Section */}
      <section id="numbers" className="bg-black pt-5 pb-20" ref={chartSectionRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-2">
            <TextGenerateEffect
              words="In The Numbers"
              className="text-4xl md:text-5xl font-bold text-white mt-10 font-['Quantico'] font-[700]"
              animateTrigger={chartSectionInView}
            />
            <div className="flex justify-center">
              <p className="text-gray-400 max-w-2xl font-Electrolize mb-4 mt-0 ">
                Proven results from client case studies
              </p>
            </div>
          </div>
          <div
            className="mt-5 w-full
             flex items-center gap-4 overflow-x-auto
             md:grid md:grid-cols-3 md:gap-8 md:justify-items-center md:overflow-visible"
          >
            <div className="flex-shrink-0 md:flex-auto md:order-2">
              <ChartLineDefault inView={chartSectionInView} />
            </div>
            <ChartRadialText
              value={75}
              suffix="%"
              label="In Ai Usage"
              className="text-green-500 flex-shrink-0 md:flex-auto md:order-1"
              inView={chartSectionInView}
              animationDelay={500}
            />
            <div className="flex-shrink-0 md:flex-auto md:order-3">
              <ChartPieLabel />
            </div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-gradient-to-b from-slate-950 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <DecryptedText
              text="The Potential Is Endless"
              animateOn="view"
              revealDirection="center"
              className="text-4xl md:text:4xl font-bold text-white font-['Quantico'] font-[700]"
            />
          </div>
          <div className="border-t border-gray-800">
            <div className="grid md:grid-cols-2">
              {/* Left Column */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-800">
                <h3 className="text-1xl font-bold text-white mb-2 font-['Quantico']">Seamless App Integrations</h3>
                <p className="text-gray-400 mb-8 font-['Electrolize'] text-lg">
                Connect your favorite apps and automate workflows for a smoother operation.
                </p>
                <img 
                  src="/sclayssweb1.png" 
                  alt="Project Overview" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              {/* Right Column */}
              <div className="p-8 md:p-12">
                <h3 className="text-1xl font-bold text-white mb-2 font-['Quantico']">Custom Backend & Analytics</h3>
                <p className="text-gray-400 mb-8 font-['Electrolize'] text-lg">
                Track your business's pulse with custom analytics and tailor-made features.
                </p>
                <img 
                  src="/Unlimited3.png" 
                  alt="Project Updates" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW CTA SECTION */}
      <section className="bg-black py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Particles 
            particleCount={300}
            particleColors={["#22c55e", "#16a34a", "#15803d"]}
            speed={0.03}
            particleSpread={20}
            moveParticlesOnHover={false}
            alphaParticles={true}
            particleBaseSize={100}
            sizeRandomness={0.7}
            cameraDistance={25}
            disableRotation={false}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/30">
              <Zap className="h-4 w-4" />
              Ready to Transform?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Quantico']">
              Don't Let Your{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Competition
              </span>{" "}
              Get Ahead
            </h2>
            
            <div className="mb-6">
              <img 
                src="/sclaywhitetxt.png" 
                alt="SCLAY" 
                className="mx-auto h-8 md:h-10 w-auto"
              />
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl md:mx-auto pr-4px pl-4px font-['Electrolize']">
              Every day you wait is another day your competitors gain an edge. Our proven system helps businesses like yours grow faster and work smarter.
            </p>

            <div className="relative">
              <div className="flex gap-6 mb-10 overflow-x-auto pb-4 px-4">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center min-w-[280px] flex-shrink-0">
                  <Clock className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Quick Setup</h3>
                  <p className="text-sm text-gray-300">Get started in under 48 hours with our streamlined onboarding process</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center min-w-[280px] flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Proven Results</h3>
                  <p className="text-sm text-gray-300">Join 20+ businesses already seeing 3x growth in their operations</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center min-w-[280px] flex-shrink-0">
                  <Target className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Custom Solution</h3>
                  <p className="text-sm text-gray-300">Tailored specifically for your business needs and industry requirements</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center min-w-[280px] flex-shrink-0">
                  <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-300">Round-the-clock assistance to ensure your business operations run smoothly</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center min-w-[280px] flex-shrink-0">
                  <Scale className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Scalable Growth</h3>
                  <p className="text-sm text-gray-300">Solutions that grow with your business, adapting to your changing needs</p>
                </div>
              </div>
              
              {/* Desktop-only gradient overlays */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] border-0"
                  asChild
                >
                  <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Book Free Consultation
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-4 text-lg transition-all duration-300"
                  asChild
                >
                  <Link href="/demo">
                    <Eye className="mr-2 h-5 w-5" />
                    Free Website Demo
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No extra fees
              </span>
              <span className="mx-3">•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </span>
              <span className="mx-3">•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                30-day money back guarantee
              </span>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 justify-center items-start text-center" style={{maxWidth: '600px'}}>
            <div className="flex flex-col items-center text-center">
              <img src="/sclaylogo.png" alt="SCLAY Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-400 mb-2 text-center">
                Helping local service businesses scale through comprehensive website optimization, system upgrades, and
                task automation.
              </p>
              <p className="text-green-500 text-sm">Based in Forsyth, Ga</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <h3 className="text-white font-medium mb-4 tracking-tight">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">(678) 284-2207</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">sclayadmin@sclay.net</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SCLAY. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <a href="#" className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Component for Service Cards
function ServiceCard({ icon, title, description, button }: { icon: React.ReactNode; title: string; description: string; button?: React.ReactNode }) {
  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.05)] dark:bg-[rgba(40,40,40,0.30)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group">
      <div className="flex flex-col h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white py-2 tracking-tight">{title}</h3>
        <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm">{description}</p>
        {button}
      </div>
    </div>
  )
}

// Accordion-style FAQ Item
function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-gray-900 rounded-lg p-6 transition-all duration-300 cursor-pointer hover:bg-gray-800">
      <button
        className="flex items-center justify-between w-full text-left focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <svg
          className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-4" : "max-h-0"}`}
        style={{}}
      >
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  )
}

<style jsx global>{`
  @keyframes gradient-shift {
    0% { border-image-source: linear-gradient(45deg, #10b981, #22c55e, #65a30d, #84cc16, #a3e635); }
    50% { border-image-source: linear-gradient(135deg, #10b981, #22c55e, #65a30d, #84cc16, #a3e635); }
    100% { border-image-source: linear-gradient(45deg, #10b981, #22c55e, #65a30d, #84cc16, #a3e635); }
  }

  .animate-gradient-border {
    border-image-slice: 1;
    border-width: 2px;
    border-style: solid;
    animation: gradient-shift 3s ease infinite;
    border-image-source: linear-gradient(45deg, #10b981, #22c55e, #65a30d, #84cc16, #a3e635);
  }
`}</style>
