"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { trackFacebookLead } from "@/lib/facebook-events"

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    business: "",
    googleUrl: ""
  })

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

  const handleBookCall = () => {
    trackFacebookLead();
    window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true", "_blank");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFacebookLead();
    window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true", "_blank")
  }

  return (
    <main className="flex min-h-screen flex-col bg-black font-[Blinker,sans-serif]">
      {/* Navigation */}
      <header className={`sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur transition-transform duration-500 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Image src="/sclaylogo.png" alt="SCLAY Logo" width={140} height={36} className="h-9 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#services" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              Services
            </Link>
            <Link
              href="/#advantage"
              className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors"
            >
              Our Advantage
            </Link>
            <Link href="/#process" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              Pricing
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-gray-200 hover:text-green-400 transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
              onClick={handleBookCall}
            >
              Book A Call
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
              href="/#services"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/#advantage"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Advantage
            </Link>
            <Link
              href="/#process"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-base font-medium text-gray-200 hover:text-green-400 transition-colors w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Button
              variant="outline"
              className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 mt-2"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleBookCall();
              }}
            >
              Book A Call
            </Button>
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
            <h1 className="mb-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Custom Website Demo <br className="hidden md:block" />
              <span className="text-green-500 whitespace-nowrap">Try Before You Invest</span>
            </h1>
          </FadeIn>
          <FadeIn delay={600} duration={1000}>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              We'll create a custom demo website based on your information below. If you love what we build, you can launch it with our 3-month partnership package.
            </p>
          </FadeIn>
          <FadeIn delay={800} duration={1000}>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-10 py-8 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
              asChild
            >
              <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                Book a Call
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-gray-950 py-20 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-96 before:bg-gradient-to-b before:from-transparent before:via-gray-950/90 before:to-black before:pointer-events-none">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How This Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See the value and quality of our work before committing to a partnership
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {/* Process steps with numbers on the left */}
            <div className="relative space-y-8">
              {/* Step 1 */}
              <FadeIn delay={200}>
                <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Submit Your Information</h3>
                  <p className="text-gray-400">
                    Fill out the form below with your business details and schedule a consultation call. 
                    We'll use this information to build your custom demo website.
                  </p>
                </div>
              </FadeIn>

              {/* Step 2 */}
              <FadeIn delay={400}>
                <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Review Your Custom Demo</h3>
                  <p className="text-gray-400">
                    During our consultation call, we'll present your custom-built demo website. 
                    You'll see exactly how your business would look with our professional design.
                  </p>
                </div>
              </FadeIn>

              {/* Step 3 */}
              <FadeIn delay={600}>
                <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Launch Your Website</h3>
                  <p className="text-gray-400">
                    If you're impressed with the demo, you can proceed with our 3-month partnership 
                    to fully launch and maintain your new website. No obligation if you decide it's not for you.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* CTA below the steps */}
            <FadeIn delay={800}>
              <div className="mt-16 text-center">
                <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Ready to get started?
                </div>
                <p className="text-xl text-white mb-3">Then what are you waiting for?</p>
                <svg 
                  className="w-8 h-8 text-green-500 mx-auto mb-2 animate-bounce" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-10 py-8 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    asChild
                  >
                    <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                      Book a Call
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">See The Difference</h2>
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

      {/* What's Included Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What's Included in Your Demo</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to see the potential of your new website
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto justify-items-center text-center md:justify-items-center md:text-center">
              <FadeIn delay={200}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Custom Design</h3>
                    <p className="text-gray-400">Tailored to your brand and industry</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Mobile Optimization</h3>
                    <p className="text-gray-400">Perfect display on all devices</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Lead Generation</h3>
                    <p className="text-gray-400">Contact forms and call-to-actions</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={500}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">SEO Setup</h3>
                    <p className="text-gray-400">Basic optimization for search engines</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={600}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Google Maps Integration</h3>
                    <p className="text-gray-400">Easy location finding for customers</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={700}>
                <div className="flex items-start justify-center flex-col items-center text-center md:items-center md:flex-col md:text-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                    className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </motion.span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Click-to-Call</h3>
                    <p className="text-gray-400">One-tap calling from mobile devices</p>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            {/* What We Don't Do Section */}
            <div className="mt-16 bg-gray-900 p-8 rounded-lg border border-red-900/30">
              <h3 className="text-xl font-bold text-white mb-6 text-center">What We <span className="text-red-500">Don't</span> Do:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FadeIn delay={200}>
                  <div className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.span>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white mb-1">Use Generic Templates</h3>
                      <p className="text-gray-400">Every website is custom built from scratch for your business</p>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn delay={300}>
                  <div className="flex md:flex-row-reverse items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center ml-3 flex-shrink-0 mt-1"
                    >
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.span>
                    <div className="md:text-right text-left">
                      <h3 className="text-lg font-bold text-white mb-1">Outsource Development</h3>
                      <p className="text-gray-400">We build everything in-house to ensure quality</p>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn delay={400}>
                  <div className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.span>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white mb-1">Monthly Retainer</h3>
                      <p className="text-gray-400">One transparent price for the full 3-month partnership</p>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn delay={500}>
                  <div className="flex md:flex-row-reverse items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center ml-3 flex-shrink-0 mt-1"
                    >
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.span>
                    <div className="md:text-right text-left">
                      <h3 className="text-lg font-bold text-white mb-1">Use Slow Page Builders</h3>
                      <p className="text-gray-400">Custom-coded for maximum speed and performance</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Investment If You Proceed</h2>
              <p className="text-gray-400 mb-8">
                If you love your demo website, here's what the 3-month partnership includes. Remember, you only pay if you decide to move forward.
              </p>
              <div className="bg-gray-900 p-8 rounded-lg border border-green-500 max-w-md mx-auto">
                <h3 className="text-4xl font-bold text-white mb-2">$497<span className="text-xl text-gray-400 ml-2">/Once In Your Life</span></h3>
                <p className="text-gray-500 text-s mb-4 mt-0">*Three month partnership</p>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </motion.span>
                    <span className="text-gray-300">Bi-weekly website & SEO updates</span>
                  </li>
                  <li className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </motion.span>
                    <span className="text-gray-300">Google My Business optimization</span>
                  </li>
                  <li className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </motion.span>
                    <span className="text-gray-300">Maps & click-to-call setup</span>
                  </li>
                  <li className="flex items-start">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', bounce: 0.7, duration: 0.8 }}
                      className="w-8 flex justify-center mr-3 flex-shrink-0 mt-1"
                    >
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </motion.span>
                    <span className="text-green-300 font-semibold">No obligation to proceed if you're not 100% satisfied with the demo</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-300 text-center">
                    You only pay if you decide to move forward with our partnership after seeing your custom demo
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to See Your Custom Demo?</h2>
              <p className="text-gray-300 mb-8">
                Book your consultation call now and get a personalized website demo tailored specifically for your business.
                No commitment required - see the value before you invest.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] w-full md:w-auto"
                  asChild
                >
                  <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                    Book a Call <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <div className="text-gray-400 text-sm mt-4 md:mt-0">
                  <span className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    No obligation or commitment
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
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
                  <Link href="/#services" className="text-gray-400 hover:text-green-500 transition-colors">
                    Website Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-400 hover:text-green-500 transition-colors">
                    System Upgrades
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-400 hover:text-green-500 transition-colors">
                    Task Automation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center">
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#advantage" className="text-gray-400 hover:text-green-500 transition-colors">
                    Our Advantage
                  </Link>
                </li>
                <li>
                  <Link href="/#process" className="text-gray-400 hover:text-green-500 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-gray-400 hover:text-green-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-gray-400 hover:text-green-500 transition-colors">
                    FAQ
                  </Link>
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