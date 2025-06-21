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
  Calendar,
  Plus, 
  Minus
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
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            element.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
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

   const faqData = React.useMemo(
    () => [
      {
        question: "How accurate are the weather predictions?",
        answer: "Our Random Forest Classifier achieves 99.8% accuracy on historical Jakarta weather data, while our LightGBM model reaches 71.2% accuracy. We continuously train our models with the latest weather data to maintain high precision."
      },
      {
        question: "What weather parameters can I use for prediction?",
        answer: "You can input various air quality and atmospheric parameters including PM2.5, PM10, SO2, NO2, O3, CO levels, temperature, humidity, and wind speed. Our AI models analyze these parameters to predict weather conditions."
      },
      {
        question: "Can I predict weather for specific dates?",
        answer: "Yes! Our platform offers two prediction methods: date-based predictions for future dates and parameter-based classifications where you can adjust specific atmospheric conditions using our intuitive sliders."
      },
      {
        question: "What types of weather conditions can be predicted?",
        answer: "Our AI models can classify weather into various categories including sunny, cloudy, rainy, stormy, and other weather patterns specific to Jakarta's tropical climate. The predictions include confidence scores and detailed explanations."
      },
      {
        question: "Is the service free to use?",
        answer: "Yes, our Jakarta Weather AI prediction tool is completely free to use. We believe in making accurate weather information accessible to everyone in the Jakarta community."
      },
      {
        question: "How often is the model updated?",
        answer: "We continuously update our models with fresh weather data from Jakarta. Our machine learning pipeline automatically retrains the models weekly to ensure they adapt to changing weather patterns and maintain accuracy."
      }
    ],
    []
  )

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }, [openFAQ])

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
        name: "Akmal Hendrian Malik",
        role: "Student at University",
        bio: "Akmal Hendrian Malik is a Computer Science student in University, focusing on Inteligent System and Machine Learning.",
        image: "/Avatar3.png",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
        email: "",
      },
      {
        name: "Ignaitus Kevin Wijaya",
        role: "Student at University",
        bio: "Ignaitus Kevin Wijaya is a Computer Science student in BINUS University, focusing on Inteligent System and Machine Learning.",
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
        accuracy: "65.2% accuracy",
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
      return React.cloneElement(icon as React.ReactElement<any>, { className: "h-10 w-10 text-blue-400" })
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
              variants={{
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 }
              }}
              initial="initial"
              animate="animate"
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
                variants={{
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate="animate"
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

        {/* How It Works Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black"></div>
          <div className="absolute inset-0 grid-pattern opacity-10"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="How It Works"
              subtitle="Experience our AI-powered weather prediction in three simple steps"
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <OptimizedMotion
                variants={fadeInUp}
                className="relative group"
              >
                <div className="glass-effect rounded-xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-3">Choose Prediction Method</h3>
                    <p className="text-gray-300">
                      Select between date-based prediction or parameter-based classification based on your needs.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Calendar className="h-16 w-16 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </OptimizedMotion>

              <OptimizedMotion
                variants={fadeInUp}
                className="relative group"
              >
                <div className="glass-effect rounded-xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-3">Input Parameters</h3>
                    <p className="text-gray-300">
                      Enter your desired date or adjust the air quality parameters using our intuitive sliders.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <BarChart className="h-16 w-16 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </OptimizedMotion>

              <OptimizedMotion
                variants={fadeInUp}
                className="relative group"
              >
                <div className="glass-effect rounded-xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-3">Get Results</h3>
                    <p className="text-gray-300">
                      Receive detailed predictions with visualizations and actionable recommendations.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Brain className="h-16 w-16 text-blue-400 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </OptimizedMotion>
            </div>

            <OptimizedMotion
              variants={fadeInUp}
              className="mt-16 text-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                <Link href="/predict">
                  Start Predicting Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </OptimizedMotion>
          </div>
        </section>

        {/* <section id="team" ref={teamRef} className="py-20 relative">
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
        </section> */}

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

         {/* FAQ Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black"></div>
          <div className="absolute inset-0 grid-pattern opacity-10"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our AI-powered weather prediction platform"
              centered={true}
            />

            <div className="max-w-4xl mx-auto mt-16">
              <OptimizedMotion variants={staggerContainer} className="space-y-4">
                {faqData.map((faq, index) => (
                  <OptimizedMotion
                    key={index}
                    variants={fadeInUp}
                    className="group"
                  >
                    <div className="glass-effect rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between group-hover:bg-white/5 transition-all duration-300"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <OptimizedMotion
                            variants={{
                              initial: { rotate: 0 },
                              animate: { rotate: openFAQ === index ? 180 : 0 }
                            }}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.3 }}
                            className="text-blue-400"
                          >
                            {openFAQ === index ? (
                              <Minus className="h-5 w-5" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </OptimizedMotion>
                        </div>
                      </button>
                      
                      <OptimizedMotion
                        variants={{
                          initial: {
                            height: 0,
                            opacity: 0
                          },
                          animate: {
                            height: openFAQ === index ? "auto" : 0,
                            opacity: openFAQ === index ? 1 : 0
                          }
                        }}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-4"></div>
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </OptimizedMotion>
                    </div>
                  </OptimizedMotion>
                ))}
              </OptimizedMotion>
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
