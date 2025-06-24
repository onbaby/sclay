"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { trackFacebookLead } from "@/lib/facebook-events"
import Script from "next/script"
import ShinyText from '../components/ShinyText'
import TiltedCard from '../components/TiltedCard'

declare global {
  interface Window {
    gtag_report_conversion?: (url: string) => void;
  }
}

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
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const beforeInView = useInView(beforeRef, { once: true });
  const afterInView = useInView(afterRef, { once: true });

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
    if (window.gtag_report_conversion) {
      window.gtag_report_conversion("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true");
    } else {
      window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true", "_blank");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFacebookLead();
    if (window.gtag_report_conversion) {
      window.gtag_report_conversion("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true");
    } else {
      window.open("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true", "_blank");
    }
  }

  return (
    <>
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location.href = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17106698477/cWR5CKq5gcwaEO2Bjt0_',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
            });
            return false;
          }
        `}
      </Script>
      <Script id="google-form" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17106698477');
        `}
      </Script>
      <Script id="cal-floating" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "30min", {origin:"https://cal.com"});

          Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>
      <main className="flex min-h-screen flex-col bg-black font-[Blinker,sans-serif]">
        {/* Navigation */}
        <header className={`sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur transition-transform duration-500 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/sclaylogo.png" alt="SCLAY Logo" width={140} height={36} className="h-9 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hidden md:flex border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
                onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
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
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' });
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
              <source src="/optimized-hero-video.mp4" type="video/mp4" />
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
                onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Call
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-gray-900 p-6 rounded-lg flex flex-col h-full"
                >
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Submit Your Information</h3>
                    <p className="text-gray-400">
                      You'll fill out the form provided with your business details and schedule a consultation call. 
                      We'll use this information to build your custom demo website.
                    </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-gray-900 p-6 rounded-lg flex flex-col h-full"
                >
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Review Your Custom Demo</h3>
                    <p className="text-gray-400">
                      During our consultation call, we'll present your custom-built demo website. 
                      You'll see exactly how your business would look with our professional design.
                    </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-gray-900 p-6 rounded-lg flex flex-col h-full"
                >
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gray-900 border-2 border-green-500 flex items-center justify-center text-xl font-bold text-green-500 hidden md:flex">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Launch Your Website</h3>
                    <p className="text-gray-400">
                      If you're impressed with the demo, you can proceed with our 3-month partnership 
                      to fully launch and maintain your new website. No obligation if you decide it's not for you.
                    </p>
                </motion.div>
              </div>

              {/* CTA below the steps */}
              <FadeIn delay={800}>
                <div className="mt-16 text-center">
                  <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Ready to get started?
                  </div>
                  <p className="text-xl text-white mb-3">What Do You Have To Lose?</p>
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
                      onClick={() => document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Fill Form
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="bg-black py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <ShinyText text="See the Difference" speed={3} className="text-4xl md:text-5xl" />
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Compare the before and after results of our optimization process
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, bounce: 0.8 }}
                className="flex flex-col h-full items-center"
              >
                <div className="bg-red-500/20 text-red-500 px-3 py-1 rounded text-sm font-medium mb-4">BEFORE</div>
                <div className="w-full max-w-[600px]">
                  <TiltedCard
                    imageSrc="/b4.png"
                    altText="Before optimization"
                    captionText="Before optimization"
                    containerHeight="350px"
                    containerWidth="100%"
                    imageHeight="350px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={false}
                  />
                </div>
                <p className="text-gray-300 text-center mt-4">This is how your website currently looks before our optimization and scaling process.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, bounce: 0.8 }}
                className="flex flex-col h-full items-center"
              >
                <div className="bg-green-500/20 text-green-500 px-3 py-1 rounded text-sm font-medium mb-4">AFTER</div>
                <div className="w-full max-w-[600px]">
                  <TiltedCard
                    imageSrc="/after.png"
                    altText="After optimization"
                    captionText="After optimization"
                    containerHeight="350px"
                    containerWidth="100%"
                    imageHeight="350px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={false}
                  />
                </div>
                <p className="text-gray-300 text-center mt-4">This is the improved result after our optimization and scaling process.</p>
              </motion.div>
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

        {/* Additional CTA Section */}
        <section className="bg-gradient-to-b from-black to-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <FadeIn>
                <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  Book Your Consultation
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Schedule Your Free Demo Call</h2>
                <p className="text-gray-300 mb-8">
                  Choose a time that works best for you. We'll discuss your business needs and create a custom website demo.
                </p>

                {/* Calendar Section */}
                <div id="calendar-section" className="w-full mt-8">
                  <div style={{width:"100%", height:"100%", overflow:"scroll"}} id="my-cal-inline"></div>
                  <Script id="cal-embed" strategy="afterInteractive">
                    {`
                      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
                      Cal("init", "30min", {origin:"https://cal.com"});

                      Cal.ns["30min"]("inline", {
                        elementOrSelector:"#my-cal-inline",
                        config: {"layout":"month_view"},
                        calLink: "sadiq-rasheed-bqedad/30min",
                      });

                      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
                    `}
                  </Script>
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
      <style jsx>{`
        @media (max-width: 768px) {
          .cal-widget {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
} 