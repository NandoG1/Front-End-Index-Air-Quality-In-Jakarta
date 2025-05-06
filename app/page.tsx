"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CloudRain,
  Thermometer,
  Wind,
  BarChart,
  CloudLightning,
  Database,
  Brain,
  Cpu,
  Network,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import OptimizedMotion from "@/components/optimized-motion"
import TeamMemberCard from "@/components/team-member-card"
import AIModelCard from "@/components/ai-model-card"
import SectionHeading from "@/components/section-heading"
import { motion } from "framer-motion"

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const aiModelsRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("scroll"))
      })
    }, 100)

    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1)
        const element = document.getElementById(id)
        if (element) {
          requestAnimationFrame(() => {
            element.scrollIntoView({
              behavior: window.prefersReducedMotion ? "auto" : "smooth",
            })
          })
        }
      }
    }

    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [isClient])

  const fadeInUp = React.useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }),
    [],
  )

  const staggerContainer = React.useMemo(
    () => ({
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  )

  const teamMembers = React.useMemo(
    () => [
      {
        name: "Fernando Gunawan",
        role: "Student at University",
        bio: "Fernando is a Computer Science student in University, focusing on Inteligent System and Machine Learning.",
        image: "/Avatar2.png",
        github: "https://github.com/NandoG1",
        linkedin: "https://www.linkedin.com/in/fernando-gunawan-bo/",
        email: "fernandogunawan291105@gmail.com",
      },
      {
        name: "Maxwell Garrick Tonisee",
        role: "Student at University",
        bio: "Maxwell Garrick Tonisee is a Computer Science student in University, focusing on Inteligent System and Machine Learning.",
        image: "/Avatar3.png",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
        email: "",
      },
      {
        name: "Christian Kenneth Muliadi",
        role: "Student at University",
        bio: "Christian Kenneth Muliadi is a Computer Science student in BINUS University, focusing on Inteligent System and Machine Learning.",
        image: "/Avatar1.png",
        github: "",
        linkedin: "https://www.linkedin.com/",
        email: "",
      },
    ],
    [],
  )

  const aiModels = React.useMemo(
    () => [
      {
        title: "Random Forest Classifier",
        description:
          "Ensemble learning method that constructs multiple decision trees to improve the accuracy and stability of weather condition predictions.",
        accuracy: "99.8% accuracy",
        features: [
          "Bagging-based ensemble method",
          "Reduces overfitting",
          "Handles high-dimensional data",
          "Works well with both categorical and numerical features",
        ],
        icon: <Network className="h-8 w-8 text-blue-400" />,
      },
      {
        title: "LightGBM Classifier",
        description:
          "A highly efficient gradient boosting framework that uses histogram-based algorithms for fast and accurate weather classification.",
        accuracy: "71.2% accuracy",
        features: [
          "Histogram-based decision tree learning",
          "Faster training speed and lower memory usage",
          "Efficient with large datasets",
          "Supports categorical features natively",
        ],
        icon: <Cpu className="h-8 w-8 text-blue-400" />,
      },
    ],
    [],
  )

  const renderIcon = useCallback((icon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: "h-10 w-10 text-blue-400" })
    }
    return icon
  }, [])

  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <OptimizedMotion variants={fadeInUp} className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
                AI-Powered Weather Prediction
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Advanced machine learning models for accurate Jakarta weather classification.
              </p>
              <OptimizedMotion className="flex flex-col sm:flex-row gap-4 justify-center" variants={staggerContainer}>
                <OptimizedMotion variants={fadeInUp}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                  >
                    <Link href="/predict">
                      Try Prediction Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </OptimizedMotion>
                <OptimizedMotion variants={fadeInUp}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </OptimizedMotion>
              </OptimizedMotion>
            </OptimizedMotion>

            <OptimizedMotion
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mt-16 max-w-5xl mx-auto"
            >
              <div className="glass-effect rounded-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <img
                  src="/Jakarta2.jpg"
                  alt="Jakarta Weather AI"
                  className="w-full h-full object-cover opacity-90"
                  loading="lazy"
                />
              </div>
              <OptimizedMotion
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 glass-effect p-4 rounded-lg max-w-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow"></div>
                  <p className="font-medium text-white">Weather Prediction</p>
                </div>
                <p className="text-sm text-gray-300">
                  Our AI predicts with 99% accuracy based on historical Jakarta weather data
                </p>
              </OptimizedMotion>
            </OptimizedMotion>
          </div>
        </section>


        <section id="team" ref={teamRef} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="Our Team"
              subtitle="The team behind Jakarta Weather AI, responsible for building the prediction model and deploying the platform."
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  delay={index}
                  github={member.github}
                  linkedin={member.linkedin}
                  email={member.email}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="ai-models" ref={aiModelsRef} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black/90"></div>
          <div className="absolute inset-0 grid-pattern opacity-10"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="Our Models"
              subtitle="Explore the Machine Learning models behind our weather predicti"
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiModels.map((model, index) => (
                <AIModelCard
                  key={index}
                  title={model.title}
                  description={model.description}
                  accuracy={model.accuracy}
                  features={model.features}
                  icon={model.icon}
                  delay={index}
                />
              ))}
            </div>

          </div>
        </section>

        <section className="py-20 relative">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="container relative z-10 px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto glass-effect rounded-2xl p-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Ready to Predict Jakarta's Weather?</h2>
              <p className="text-gray-300 mb-8 md:w-2/3 mx-auto">
                Try our AI-powered prediction tool now and get accurate weather classifications based on dates or
                specific parameters.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                <Link href="/predict">
                  Start Predicting Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
