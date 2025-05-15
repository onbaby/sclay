"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerChildren } from "@/components/animations/stagger-children"
import { CountUp } from "@/components/animations/count-up"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [showMoreServices, setShowMoreServices] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)

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

  return (
    <main className="flex min-h-screen flex-col font-[Blinker,sans-serif]">
      {/* Navigation */}
      <header className={`sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur transition-transform duration-500 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Image src="/sclaylogo.png" alt="SCLAY Logo" width={140} height={36} className="h-9 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#services" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              Services
            </Link>
            <Link
              href="#advantage"
              className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors"
            >
              Our Advantage
            </Link>
            <Link href="#process" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
              asChild
            >
              <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                Book A Call
              </Link>
            </Button>
            
            {/* Mobile Menu Button - Moved to right side */}
            <button
              ref={hamburgerButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-200 hover:text-green-400 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute left-0 right-0 bg-black/95 backdrop-blur border-b border-gray-800 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col items-center space-y-4">
            <Link
              href="#services"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#advantage"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Advantage
            </Link>
            <Link
              href="#process"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/vecteezy_vertical-neon-green-gradient-wave-looping-background_2018600-optimized.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 animate-hero-gradient bg-gradient-to-br from-black via-black to-green-950 opacity-90"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeIn delay={200} duration={1000}>
            <h1 className="mb-6 text-5xl md:text-6xl font-bold tracking-tight text-white">
              Scale Your Service Business<br />
              <span className="text-green-500 whitespace-nowrap">with SCLAY</span>
            </h1>
          </FadeIn>
          <FadeIn delay={600} duration={1000}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Comprehensive website optimization, system upgrades, and task automation designed specifically for local
              service businesses.
            </p>
          </FadeIn>
          <FadeIn delay={1000} duration={1000} direction="none">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-8 text-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                  Book A Call
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Solutions simply to help local service businesses scale and thrive
            </p>
          </FadeIn>

          <FadeIn delay={200} duration={1000}>
            {/* First row of services - always visible */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Bot className="h-10 w-10 text-green-500" />}
                title="Custom AI Automations"
                description="Smoothen your business operations with intelligent automation. Save countless hours by automating repetitive tasks, data entry, and workflow processes."
              />

              <ServiceCard
                icon={<LineChart className="h-10 w-10 text-green-500" />}
                title="Ad Management"
                description="Places your business in front of ideal customers exactly when they need your services. Delivers qualified leads directly to your business."
              />

              <ServiceCard
                icon={<Globe className="h-10 w-10 text-green-500" />}
                title="Website Optimization"
                description="Upgrade your website's design and usability in real-time. Enhance user experience, mobile access, and conversion flow to capture more leads."
              />
            </div>

            {/* Container with gradient overlay and expand button */}
            <div className="relative mt-8">
              {/* This is the container that will be masked with fade effect */}
              <div className={`relative transition-all duration-1000 overflow-hidden will-change-[max-height] ${
                showMoreServices ? "max-h-[3000px] ease-in-out" : "max-h-[150px] md:max-h-[120px] ease-in-out"
              }`}>
                {/* Gradient overlay that fades out the content */}
                <div className={`absolute left-0 right-0 h-[120px] bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none will-change-[opacity,transform] transition-all duration-1000 ease-in-out ${
                  showMoreServices ? "translate-y-20 opacity-0 delay-200" : "translate-y-0 opacity-100 delay-0"
                }`} style={{bottom: 0}}></div>
                
                {/* Remaining service cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ServiceCard
                    icon={<Share2 className="h-10 w-10 text-green-500" />}
                    title="Social Automation"
                    description="Upload job photos and we'll handle the rest. AI generates professional captions and posts to showcase your work automatically."
                  />

                  <ServiceCard
                    icon={<FileText className="h-10 w-10 text-green-500" />}
                    title="AI Content"
                    description="Generate videos, scripts, voiceovers, and post ideas tailored to your business. Create realistic, top-notch AI images and videos for FGIS ads."
                  />

                  <ServiceCard
                    icon={<BarChart3 className="h-10 w-10 text-green-500" />}
                    title="Performance Tracking"
                    description="See your marketing ROI in real-time. Track leads, appointments, and jobs generated from your investment."
                  />

                  <ServiceCard
                    icon={<Search className="h-10 w-10 text-green-500" />}
                    title="Google My Business"
                    description="Professional setup and optimization of your Google Business Profile to dominate local search results and improve visibility."
                  />

                  <ServiceCard
                    icon={<Phone className="h-10 w-10 text-green-500" />}
                    title="Click-to-Call & Maps"
                    description="Seamless Google Maps integration and click-to-call functionality to make it easy for customers to find and contact you."
                  />

                  <ServiceCard
                    icon={<Zap className="h-10 w-10 text-green-500" />}
                    title="Creative Services"
                    description="Professional marketing materials creation including brochures, business cards, and promotional content to enhance your brand."
                  />
                </div>
              </div>

              {/* Show More Button - positioned over the gradient */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 z-20 transition-all ${
                showMoreServices ? "bottom-[-50px] duration-700 ease-out" : "bottom-0 translate-y-1/2 duration-500 ease-in-out"
              }`}>
                <button 
                  onClick={() => setShowMoreServices(prev => !prev)}
                  className="bg-gray-900 hover:bg-gray-800 h-12 w-12 rounded-full flex items-center justify-center border border-gray-700 transition-all duration-500 transform hover:scale-110 shadow-lg"
                  aria-expanded={showMoreServices}
                  aria-controls="more-services"
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
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See The Difference</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real results from our optimization and scaling process</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Before Card */}
            <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full items-center shadow-lg">
              <div className="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm font-medium mb-4">BEFORE</div>
              <Image
                src="/b4.png"
                alt="Before optimization"
                width={500}
                height={300}
                className="w-full h-auto rounded-md mb-4 object-cover"
              />
              <p className="text-gray-300 text-center flex-1">This is what your system looked like before our optimization process.</p>
            </div>
            {/* After Card */}
            <div className="bg-gray-900 p-6 rounded-lg flex flex-col h-full items-center shadow-lg shadow-[0_0_24px_4px_rgba(34,197,94,0.5)] border border-green-500">
              <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded text-sm font-medium mb-4">AFTER</div>
              <Image
                src="/after.png"
                alt="After optimization"
                width={500}
                height={300}
                className="w-full h-auto rounded-md mb-4 object-cover"
              />
              <p className="text-gray-300 text-center flex-1">This is the improved result after our optimization and scaling process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The SCLAY Advantage Section */}
      <section id="advantage" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The SCLAY Advantage: Scale Your Business with Confidence
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              What sets us apart is our commitment to delivering measurable results for local service businesses
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            {/* Main advantages grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-16">
              <FadeIn direction="left" delay={200}>
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110">
                      <LineChart className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      <CountUp end={240} suffix="%" className="text-green-500" /> Performance Lift
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4 text-center">
                    Our clients consistently report <strong className="text-green-400">over 2x growth</strong> in
                    appointments, jobs, and revenue after implementing our solutions.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Average <CountUp end={83} suffix="%" /> increase in qualified leads</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><CountUp end={156} suffix="%" /> improvement in search rankings</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={300}>
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110">
                      <Bot className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">5-Minute Response Time</h3>
                  </div>
                  <p className="text-gray-300 mb-4 text-center">
                    Our AI concierge responds to <strong className="text-green-400">every lead within 5 minutes</strong>,
                    24/7, qualifying prospects and booking appointments while you focus on your work.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><CountUp end={99} suffix="%" /> client coverage across all platforms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><CountUp end={70} suffix="%" /> higher conversion rate than manual follow-up</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={400}>
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110">
                      <Share2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Automated Marketing</h3>
                  </div>
                  <p className="text-gray-300 mb-4 text-center">
                    Our system <strong className="text-green-400">transforms your job photos</strong> into engaging social
                    media content with AI-generated captions and strategic posting schedules.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Save 10+ hours per week on content creation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>3x higher engagement than industry average</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={500}>
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4 transform transition-all duration-500 hover:scale-110">
                      <Target className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Precision Targeting</h3>
                  </div>
                  <p className="text-gray-300 mb-4 text-center">
                    Our AI-powered ad management delivers{" "}
                    <strong className="text-green-400">qualified leads at the exact moment</strong> they need your
                    services, optimizing every marketing dollar.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><CountUp end={32} suffix="M+" /> combined monthly digital reach</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><CountUp end={42} suffix="%" /> lower cost per acquisition than traditional methods</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* Why Choose SCLAY section */}
            <FadeIn direction="up" delay={600}>
              <div className="bg-gray-900 p-8 rounded-lg border border-green-800 transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose SCLAY?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="h-10 w-10 text-green-500 mx-auto mb-4 transform transition-all duration-500 hover:scale-110" />
                    <h4 className="text-lg font-bold text-white mb-2">Save Time</h4>
                    <p className="text-gray-300">
                      Reduce administrative work by <strong className="text-green-400">13+ hours per week</strong>
                    </p>
                  </div>
                  <div className="text-center">
                    <Zap className="h-10 w-10 text-green-500 mx-auto mb-4 transform transition-all duration-500 hover:scale-110" />
                    <h4 className="text-lg font-bold text-white mb-2">Increase Efficiency</h4>
                    <p className="text-gray-300">
                      Streamline operations with <strong className="text-green-400">automated systems</strong> that never
                      sleep
                    </p>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-green-500 mx-auto mb-4 transform transition-all duration-500 hover:scale-110" />
                    <h4 className="text-lg font-bold text-white mb-2">Grow Revenue</h4>
                    <p className="text-gray-300">
                      Our clients see an average <strong className="text-green-400">37% revenue increase</strong> within 6
                      months
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn direction="up" delay={800} className="text-center mt-12">
              <Button className="bg-green-500 text-black hover:bg-green-400 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
                <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                  Experience The SCLAY Advantage
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our streamlined process to transform and scale your business
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={200}>
              <div className="bg-gray-900 p-8 rounded-lg relative transform transition-all duration-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:translate-y-[-5px]">
                <div className="absolute -top-4 -left-4 bg-green-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transform transition-all duration-500 hover:scale-110">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-4">Assess</h3>
                <p className="text-gray-400 mb-4">
                  We analyze your current systems, identify bottlenecks, and develop a customized scaling strategy.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Business process analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Website performance audit</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Competitor research</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Growth opportunity assessment</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={400}>
              <div className="bg-gray-900 p-8 rounded-lg relative transform transition-all duration-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:translate-y-[-5px]">
                <div className="absolute -top-4 -left-4 bg-green-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transform transition-all duration-500 hover:scale-110">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-4">Optimize</h3>
                <p className="text-gray-400 mb-4">
                  We implement proven optimization techniques and automation to improve efficiency and performance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Website and SEO optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">AI system integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Task automation setup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Marketing system implementation</span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={600}>
              <div className="bg-gray-900 p-8 rounded-lg relative transform transition-all duration-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:translate-y-[-5px]">
                <div className="absolute -top-4 -left-4 bg-green-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transform transition-all duration-500 hover:scale-110">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-4">Scale</h3>
                <p className="text-gray-400 mb-4">
                  We help you grow your business with ongoing support, monitoring, and continuous improvement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Performance monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">System refinement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Growth strategy adjustment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Ongoing optimization and support</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Results in Numbers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real metrics from businesses we've helped scale</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeIn direction="up" delay={200}>
              <div className="p-8 transform transition-all duration-500 hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold text-green-500 mb-4">
                  <CountUp end={99} suffix="%" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Client Coverage</h3>
                <p className="text-gray-400">New leads and inquiries resolved — no matter the time or platform.</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={400}>
              <div className="p-8 transform transition-all duration-500 hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold text-green-500 mb-4">
                  <CountUp end={32} suffix="M" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Digital Reach</h3>
                <p className="text-gray-400">Combined monthly from campaigns, site visits, and search traffic.</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={600}>
              <div className="p-8 transform transition-all duration-500 hover:scale-105">
                <div className="text-5xl md:text-6xl font-bold text-green-500 mb-4">
                  <CountUp end={240} suffix="%" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Performance Lift</h3>
                <p className="text-gray-400">Clients report over 2x growth in appointments, jobs, and revenue.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-black py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Affordable solutions to scale your business</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="h-full">
              <FadeIn direction="left" delay={300} className="h-full">
                <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 flex flex-col h-full shadow-lg">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Website Setup</h3>
                    <div className="text-4xl font-bold text-white">$497<span className="text-xl text-gray-400">/One-time</span></div>
                    <p className="text-gray-400 mt-2">3-Month Optimization Partnership</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Bi-weekly website & SEO updates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Google My Business optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Maps & click-to-call setup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Monthly performance reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">No monthly retainer — pay once, stay supported</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Delivered within 1-3 Business Days</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-green-500 text-black hover:bg-green-400 py-6 transition-all duration-300 hover:shadow-lg mt-auto" asChild>
                    <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            <div className="h-full relative">
              <div className="absolute top-0 left-0 right-0 flex justify-center -mt-6 z-10">
                <div className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-medium">
                  RECOMMENDED
                </div>
              </div>
              <FadeIn direction="right" delay={500} className="h-full">
                <div className="bg-gray-900 p-8 rounded-lg border border-green-500 flex flex-col h-full shadow-lg">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Monthly Scaling Plan</h3>
                    <div className="text-4xl font-bold text-white">
                      $349<span className="text-xl text-gray-400">/mo</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 mb-1">3-month minimum commitment</p>
                    <p className="text-gray-400 mt-2">Continuous growth and optimization</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Everything in the Website Setup Plan</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Social media automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Content updates (10+ per month)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Ad management & optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">AI system maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Priority support</span>
                    </li>
                  </ul>

                  <Button className="w-full bg-green-500 text-black hover:bg-green-400 py-6 transition-all duration-300 hover:shadow-lg mt-auto" asChild>
                    <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            * Prices are negotiable based on specific business needs
          </p>

          
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to know about our services</p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-8">
            <FaqAccordionItem
              question="How long does it take to set up your system?"
              answer="Most system setups are completed within 2-3 weeks. This includes the initial assessment, optimization implementation, and launch. The exact timeline depends on the complexity of your business and specific requirements."
            />
            <FaqAccordionItem
              question="Do I need to rebuild my entire website?"
              answer="Not necessarily. We can often optimize your existing website without a complete rebuild. During our initial assessment, we'll evaluate your current site and recommend the most efficient approach to achieve your goals."
            />
            <FaqAccordionItem
              question="How will I know if the optimization is working?"
              answer="We provide detailed weekly reports showing key metrics such as search rankings, website traffic, lead generation, conversion rates, and time saved. You'll see clear evidence of improvement compared to your pre-optimization performance."
            />
            <FaqAccordionItem
              question="Do I need the monthly scaling plan?"
              answer="While not required, the monthly scaling plan is highly recommended for businesses looking to continuously grow. It ensures your systems stay optimized, your content remains fresh, and your marketing efforts are constantly refined for maximum performance."
            />
            <FaqAccordionItem
              question="What types of businesses do you work with?"
              answer="We specialize in helping local service businesses such as roofing contractors, HVAC professionals, plumbers, electricians, auto detailers, landscapers, and similar trades. Our solutions are tailored specifically for these industries."
            />
            <FaqAccordionItem
              question="How does the AI concierge work?"
              answer="Our AI concierge integrates with your website and phone systems to respond to inquiries within 5 minutes, 24/7. It qualifies leads, answers common questions, schedules appointments, and ensures no opportunity falls through the cracks, all while maintaining a natural, professional interaction."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-green-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn direction="up" delay={300}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Scale Your Business?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join the hundreds of local service businesses that have transformed their operations with SCLAY.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                asChild
              >
                <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 justify-center items-start text-center" style={{maxWidth: '900px'}}>
            <div className="flex flex-col items-center text-center">
              <Image src="/sclaylogo.png" alt="SCLAY Logo" width={120} height={30} className="h-8 w-auto mb-4" />
              <p className="text-gray-400 mb-2 text-center">
                Helping local service businesses scale through comprehensive website optimization, system upgrades, and
                task automation.
              </p>
              <p className="text-green-500 text-sm">Based in Forsyth, Ga</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <h3 className="text-white font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                    Website Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                    AI Concierge
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                    Social Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                    Ad Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-500 transition-colors duration-300">
                    Content Creation
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center">
              <h3 className="text-white font-medium mb-4">Contact</h3>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
              <a href="#" className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-300">
                Terms of Service
              </a>
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
function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-900 border-gray-800 rounded-lg h-full transform transition-all duration-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:translate-y-[-5px]">
      <div className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
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
