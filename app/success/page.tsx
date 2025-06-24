"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import Script from "next/script"
import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void;
    dataLayer: any[];
  }
}

export default function SuccessPage() {
  useEffect(() => {
    // Wait for gtag to be available
    const checkGtag = setInterval(() => {
      if (typeof window !== 'undefined' && window.gtag) {
        clearInterval(checkGtag);
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17106698477/cWR5CKq5gcwaEO2Bjt0_',
          'value': 1.0,
          'currency': 'USD',
          'transaction_id': Date.now().toString()
        });
      }
    }, 100);

    // Cleanup interval after 5 seconds if gtag never loads
    setTimeout(() => {
      clearInterval(checkGtag);
    }, 5000);

    return () => {
      clearInterval(checkGtag);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-black font-[Blinker,sans-serif]">
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            gtag('event', 'conversion', {
                'send_to': 'AW-17106698477/cWR5CKq5gcwaEO2Bjt0_',
                'value': 1.0,
                'currency': 'USD'
            });
          }
        `}
      </Script>
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Booking Confirmed!
            </h1>
            
            <p className="text-gray-300 text-lg mb-8">
              Thank you for scheduling your demo call. We're excited to discuss your business needs and create a custom website solution for you.
            </p>

            <div className="space-y-4">
              <p className="text-gray-400">
                We've sent a confirmation email with all the details.
              </p>
              
              <div className="pt-4">
                <Link href="/#services">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  >
                    See More Services
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  )
} 