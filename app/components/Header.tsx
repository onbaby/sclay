"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/80 border-b border-gray-800/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/sclaylogo.png" alt="SCLAY Logo" width={120} height={30} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                What We Do
              </button>
              <button 
                onClick={() => scrollToSection('why-sclay')}
                className="text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                Why Sclay
              </button>
              <button 
                onClick={() => scrollToSection('numbers')}
                className="text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                Results
              </button>
              <Link href="/demo" className="text-gray-300 hover:text-green-500 font-medium transition-colors">
                Demo
              </Link>
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Button 
              variant="outline" 
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
              asChild
            >
              <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                Book A Call
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2 border border-gray-800/20">
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                What We Do
              </button>
              <button
                onClick={() => scrollToSection('why-sclay')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                Why Sclay
              </button>
              <button
                onClick={() => scrollToSection('numbers')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-green-500 font-medium transition-colors"
              >
                Results
              </button>
              <Link
                href="/demo"
                className="block px-3 py-2 text-gray-300 hover:text-green-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button 
                  variant="outline" 
                  className="justify-start border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
                  asChild
                >
                  <Link href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3vEa9YOGgizLfitsLgDxTwSKbqnevZCOfoN71De4Ka2GV-D3E2gDwQD5UlV8hiAiitjIHWFlnO?gv=true" target="_blank" rel="noopener noreferrer">
                    Book A Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 