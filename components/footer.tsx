"use client"

import Link from "next/link"
import { Cloud, Github, Mail, Twitter, Linkedin, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <footer className="border-t border-gray-800 pt-16 pb-8 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <Cloud className="h-7 w-7 text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 blur-sm bg-blue-400 opacity-50 rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-white">Jakarta Weather AI</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Advanced AI-powered weather prediction for Jakarta, providing accurate classifications based on dates or
              specific parameters using machine learning models.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/predict"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  Prediction Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/#ai-models"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  AI Technology
                </Link>
              </li>
              
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-block"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} Jakarta Weather AI. All rights reserved.</p>
        </motion.div>
      </div>

      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </footer>
  )
}
