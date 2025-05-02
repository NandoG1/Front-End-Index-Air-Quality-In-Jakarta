"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface AIModelCardProps {
  title: string
  description: string
  accuracy: string
  features: string[]
  icon: React.ReactNode
  delay?: number
}

export default function AIModelCard({ title, description, accuracy, features, icon, delay = 0 }: AIModelCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.2 + 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.2 + 0.2,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 h-full"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            variants={iconVariants}
            className="p-3 bg-blue-600/20 rounded-lg relative flex items-center justify-center"
          >
            {icon}
            <div className="absolute inset-0 blur-md bg-blue-400 opacity-20 rounded-lg"></div>
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-400 mr-2">Accuracy:</span>
              <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                {accuracy}
              </Badge>
            </div>
          </div>
        </div>

        <motion.div variants={contentVariants} className="flex flex-col flex-grow">
          <p className="text-gray-300 mb-4">{description}</p>

          <h4 className="text-sm font-medium text-white mb-2">Key Features:</h4>
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-center text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}
