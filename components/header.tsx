"use client"

import type React from "react"
import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cloud, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Header = memo(function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Predict", href: "/predict" },
    { name: "AI Models", href: "/#ai-models" },
  ]

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 + i * 0.1 },
    }),
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  }

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname !== "/" && href.startsWith("/#")) {
        e.preventDefault()
        window.location.href = href
      }
    },
    [pathname],
  )

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/"
      }
      if (href.startsWith("/#")) {
        return pathname === "/" && window.location.hash === href.substring(1)
      }
      return pathname.startsWith(href)
    },
    [pathname],
  )

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={headerVariants}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "glass-effect py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Cloud className="h-7 w-7 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 blur-sm bg-blue-400 opacity-50 rounded-full animate-pulse-slow"></div>
          </div>
          <span className="text-xl font-bold text-white">Jakarta Weather AI</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {navItems.map((item, i) => (
            <motion.div key={item.name} custom={i} variants={navItemVariants}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(item.href) ? "text-blue-400 after:w-full" : "text-gray-300 hover:text-blue-400"
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <motion.div variants={navItemVariants} custom={4}>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 hover:text-white border-gray-700 hover:border-white transition-colors duration-300"
            >
              <Link href="/predict">Try Now</Link>
            </Button>
          </motion.div>
          <motion.div variants={navItemVariants} custom={5}>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
              <Link href="/predict">Get Started</Link>
            </Button>
          </motion.div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden glass-effect overflow-hidden"
          >
            <div className="px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-medium py-2 transition-colors duration-300 ${
                      isActive(item.href) ? "text-blue-400" : "text-gray-300 hover:text-white"
                    }`}
                    onClick={(e) => {
                      setIsMenuOpen(false)
                      handleNavClick(e, item.href)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="bg-blue-600 text-white hover:bg-blue-700 w-full mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/predict">Get Started</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
})

export default Header
