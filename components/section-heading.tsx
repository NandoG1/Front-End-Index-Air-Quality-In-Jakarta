"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({ title, subtitle, centered = false, light = false }: SectionHeadingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const titleVariants = {
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

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={`mb-16 ${centered ? "text-center" : ""}`}
    >
      <motion.h2
        variants={titleVariants}
        className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "" : "text-gradient"}`}
      >
        {title}
      </motion.h2>
      <motion.div
        variants={lineVariants}
        className={`h-1 w-16 bg-blue-500 mb-6 origin-left ${centered ? "mx-auto" : ""}`}
      ></motion.div>
      <motion.p variants={subtitleVariants} className={`text-gray-300 md:w-3/4 max-w-3xl ${centered ? "text-center mx-auto" : ""}`}>
        {subtitle}
      </motion.p>
    </motion.div>
  )
}
