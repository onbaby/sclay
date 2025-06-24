"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"

export default function TermsOfService() {
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

      {/* Terms of Service Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
              <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                  <p className="text-gray-300 mb-4">
                    By accessing or using SCLAY's website optimization and business automation services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
                  <p className="text-gray-300 mb-4">
                    SCLAY provides the following services:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Website optimization and performance enhancement</li>
                    <li>Business process automation</li>
                    <li>System upgrades and integration</li>
                    <li>Technical consulting and support</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Payment Terms</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Our services are provided under the following payment terms:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>One-time payment of $497 for the 3-month partnership package</li>
                      <li>Payment is due upon agreement to proceed with services</li>
                      <li>No refunds are provided once services have commenced</li>
                      <li>Additional services may be subject to separate pricing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Client Responsibilities</h2>
                  <p className="text-gray-300 mb-4">
                    As a client, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Cooperate with our team for service delivery</li>
                    <li>Provide timely feedback and approvals</li>
                    <li>Maintain necessary licenses and permissions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Service Delivery</h2>
                  <p className="text-gray-300 mb-4">
                    We commit to:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Delivering services within agreed timeframes</li>
                    <li>Maintaining professional standards</li>
                    <li>Providing regular updates on progress</li>
                    <li>Ensuring quality and performance standards</li>
                    <li>Maintaining confidentiality of client information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-300 mb-4">
                    Intellectual property rights are handled as follows:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Client retains ownership of their existing content and materials</li>
                    <li>SCLAY retains rights to our methodologies and tools</li>
                    <li>Deliverables are licensed to the client for their use</li>
                    <li>Custom code and solutions become client property upon completion</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-300 mb-4">
                    SCLAY's liability is limited to:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>The amount paid for the services in question</li>
                    <li>Direct damages only</li>
                    <li>Claims made within 30 days of service completion</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
                  <p className="text-gray-300 mb-4">
                    Either party may terminate services:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>With 30 days written notice</li>
                    <li>For material breach of these terms</li>
                    <li>Upon mutual agreement</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
                  <p className="text-gray-300 mb-4">
                    For questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <p className="text-gray-300">Email: sclayadmin@sclay.com</p>
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