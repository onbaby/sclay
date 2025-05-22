"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"

export default function PrivacyPolicy() {
  return (
    <main className="flex min-h-screen flex-col bg-black font-[Blinker,sans-serif]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 group">
            <Link href="/">
              <Image src="/sclaylogo.png" alt="SCLAY Logo" width={140} height={36} className="h-9 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
              <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                  <p className="text-gray-300 mb-4">
                    SCLAY ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services for website optimization and business automation.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Name and contact information</li>
                        <li>Business information</li>
                        <li>Website analytics data</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Technical Information</h3>
                      <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>IP addresses</li>
                        <li>Browser type and version</li>
                        <li>Device information</li>
                        <li>Website usage patterns</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>To provide and maintain our website optimization services</li>
                    <li>To improve and personalize your experience</li>
                    <li>To communicate with you about our services</li>
                    <li>To analyze website performance and user behavior</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                  <p className="text-gray-300 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Regular security assessments</li>
                    <li>Access controls and authentication</li>
                    <li>Secure data storage systems</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                  <p className="text-gray-300 mb-4">
                    We may use third-party services for:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Website analytics (Google Analytics)</li>
                    <li>Payment processing</li>
                    <li>Customer relationship management</li>
                    <li>Email marketing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                  <p className="text-gray-300 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to data processing</li>
                    <li>Data portability</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                  <p className="text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-gray-300">Email: sclayadmin@sclay.net</p>
                    <p className="text-gray-300">Location: Forsyth, Georgia</p>
                  </div>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
                  asChild
                >
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800 mt-auto">
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
  )
} 