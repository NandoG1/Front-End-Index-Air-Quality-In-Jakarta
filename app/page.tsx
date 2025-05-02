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

  const features = React.useMemo(
    () => [
      // {
      //   icon: <Thermometer className="h-10 w-10 text-white" />,
      //   title: "Date-Based Prediction",
      //   description:
      //     "Input any date to get accurate weather classification predictions for Jakarta based on historical patterns.",
      // },
      // {
      //   icon: <Wind className="h-10 w-10 text-white" />,
      //   title: "Parameter-Based Analysis",
      //   description:
      //     "Enter specific weather parameters like PM10, CO2, O2 levels for detailed classification and analysis.",
      // },
      // {
      //   icon: <CloudRain className="h-10 w-10 text-white" />,
      //   title: "Real-time Processing",
      //   description:
      //     "Get instant results powered by our advanced machine learning models with minimal processing time.",
      // },
      // {
      //   icon: <BarChart className="h-10 w-10 text-white" />,
      //   title: "Data Visualization",
      //   description: "View comprehensive data visualizations to understand weather patterns and predictions better.",
      // },
      // {
      //   icon: <CloudLightning className="h-10 w-10 text-white" />,
      //   title: "Extreme Weather Alerts",
      //   description: "Receive alerts for potential extreme weather conditions based on our predictive models.",
      // },
      // {
      //   icon: <Database className="h-10 w-10 text-white" />,
      //   title: "Historical Data Analysis",
      //   description: "Access and analyze historical weather data to understand trends and patterns over time.",
      // },
    ],
    [],
  )

  const aboutItems = React.useMemo(
    () => [
      // {
      //   title: "Precision & Accuracy",
      //   subtitle: "Trained on extensive Jakarta weather data",
      //   description:
      //     "Our models have been trained on years of Jakarta-specific weather data, providing highly accurate predictions tailored to the unique climate patterns of the region.",
      // },
      // {
      //   title: "Dual Prediction Methods",
      //   subtitle: "Flexible input options for your needs",
      //   description:
      //     "Choose between date-based predictions for planning ahead or parameter-based analysis for understanding specific weather conditions and their classifications.",
      // },
      // {
      //   title: "User-Friendly Interface",
      //   subtitle: "Simple, elegant, and easy to use",
      //   description:
      //     "Our modern interface makes accessing complex weather predictions simple for everyone, from weather enthusiasts to professionals requiring accurate data.",
      // },
      // {
      //   title: "Powered by Advanced AI",
      //   subtitle: "Cutting-edge machine learning models",
      //   description:
      //     "Our platform leverages sophisticated machine learning algorithms to process complex weather patterns and deliver reliable predictions with high confidence levels.",
      // },
    ],
    [],
  )

  const teamMembers = React.useMemo(
    () => [
      {
        name: "Fernando Gunawan",
        role: "Student at BINUS University",
        bio: "Fernando is a Computer Science student in BINUS University, focusing on Inteligent System and Machine Learning.",
        image: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/NandoG1",
        linkedin: "https://www.linkedin.com/in/fernando-gunawan-bo/",
        email: "fernando.gunawan003@binus.ac.id",
      },
      {
        name: "Akmal Hendrian Malik",
        role: "Student at BINUS University",
        bio: "Akmal Hendrian Malik is a Computer Science student in BINUS University, focusing on Inteligent System and Machine Learning.",
        image: "/placeholder.svg?height=400&width=600",
        github: "https://github.com/akmalhen",
        linkedin: "",
        email: "akmal.malik@binus.ac.id",
      },
      {
        name: "Ignatius Kevin Wijaya",
        role: "Student at BINUS University",
        bio: "Ignatius Kevin Wijaya is a Computer Science student in BINUS University, focusing on Inteligent System and Machine Learning.",
        image: "/placeholder.svg?height=400&width=600",
        github: "",
        linkedin: "",
        email: "ignatius.wijaya001@binus.ac.id",
      },
    ],
    [],
  )

  const aiModels = React.useMemo(
    () => [
      {
        title: "LSTM Forecaster",
        description:
          "Long Short-Term Memory neural network that excels at capturing long-term dependencies in sequential weather data for improved predictions.",
        accuracy: "89.5% accuracy",
        features: [
          "Sequential data processing",
          "Long-term pattern memory",
          "Gradient flow optimization",
          "Specialized for seasonal transitions",
        ],
        icon: <Network className="h-8 w-8 text-blue-400" />,
      },
      {
        title: "XGBoost Classifier",
        description:
          "Gradient boosting ensemble model that combines multiple decision trees to provide robust classification of weather conditions.",
        accuracy: "94.1% accuracy",
        features: [
          "Feature importance ranking",
          "Robust to outliers",
          "Handles missing data",
          "Optimized for classification tasks",
        ],
        icon: <Cpu className="h-8 w-8 text-blue-400" />,
      },
    ],
    [],
  )

  // Memoized function to render feature icons with proper type checking
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
                  Our AI predicts with 92% accuracy based on historical Jakarta weather data
                </p>
              </OptimizedMotion>
            </OptimizedMotion>
          </div>
        </section>

        {/* Features Section */}
        {/* <section id="features" ref={featuresRef} className="py-20 relative">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="Advanced Prediction Features"
              subtitle="Our AI-powered platform provides accurate and reliable weather predictions for Jakarta using cutting-edge machine learning models."
              centered={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 card-hover"
                >
                  <div className="mb-4 relative">
                    {renderIcon(feature.icon)}
                    <div className="absolute inset-0 blur-sm bg-blue-400 opacity-30 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
                <Link href="/predict">
                  Try Our Prediction Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section> */}

        {/* Team Members Section */}
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

        {/* AI Models Section */}
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

            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 p-6 glass-effect rounded-xl border border-white/10 max-w-3xl mx-auto"
            >
              <h3 className="text-xl font-bold mb-4 text-white">Technical Implementation</h3>
              <p className="text-gray-300 mb-4">
                Our AI system combines multiple models in an ensemble approach to achieve the highest possible accuracy.
                The prediction pipeline processes historical weather data, satellite imagery, and real-time sensor
                readings through our proprietary preprocessing algorithms before feeding them into our neural network
                architecture.
              </p>
              <p className="text-gray-300">
                The system is continuously trained on new data, with regular model evaluations and updates to ensure
                optimal performance as weather patterns evolve. All models are deployed using TensorFlow Serving for
                efficient inference and seamless integration with our web application.
              </p>
            </motion.div> */}
          </div>
        </section>

        {/* Why Use This Website Section
        <section id="about" ref={aboutRef} className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black/80"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <SectionHeading
              title="Why Choose Our Platform"
              subtitle="Our AI-powered weather prediction service offers unique advantages for Jakarta residents and visitors."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover-glow"
                >
                  <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
                  <p className="text-blue-400 mb-4 text-sm">{item.subtitle}</p>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
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
