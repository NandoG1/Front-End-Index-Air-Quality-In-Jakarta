"use client"

import { useEffect, useCallback, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

interface AnimationProviderProps {
  children: ReactNode
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const pathname = usePathname()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    window.prefersReducedMotion = prefersReducedMotion
  }, [prefersReducedMotion])

  const initializeAnimations = useCallback(() => {
    const revealElements = document.querySelectorAll(".reveal")

    revealElements.forEach((el) => {
      el.classList.remove("active")
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    requestAnimationFrame(() => {
      revealElements.forEach((el) => {
        observer.observe(el)
      })
    })

    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
        }
      }, 100)
    }

    return () => {
      observer.disconnect()
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const cleanup = initializeAnimations()

    let timeoutId: NodeJS.Timeout
    const handleNavigation = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(initializeAnimations, 100)
    }

    window.addEventListener("popstate", handleNavigation)

    return () => {
      cleanup()
      clearTimeout(timeoutId)
      window.removeEventListener("popstate", handleNavigation)
    }
  }, [pathname, initializeAnimations])

  return <>{children}</>
}
