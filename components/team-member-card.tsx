"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  image: string
  delay?: number
  github?: string
  linkedin?: string
  email?: string
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  image,
  delay = 0,
  github,
  linkedin,
  email,
}: TeamMemberProps) {
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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.2 + 0.2,
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
        delay: delay * 0.2 + 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      className="glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 group"
    >
      <div className="relative overflow-hidden">
        <motion.div variants={imageVariants} className="aspect-[4/3] relative">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white">{name}</h3>
              <p className="text-blue-400 text-sm">{role}</p>
            </div>
            <div className="flex space-x-2">
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/50 p-2 rounded-full hover:bg-blue-600/80 transition-colors duration-300"
                  aria-label={`${name}'s GitHub`}
                >
                  <Github className="h-4 w-4 text-white" />
                </Link>
              )}
              {linkedin && (
                <Link
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/50 p-2 rounded-full hover:bg-blue-600/80 transition-colors duration-300"
                  aria-label={`${name}'s LinkedIn`}
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </Link>
              )}
              {email && (
                <Link
                  href={`mailto:${email}`}
                  className="bg-black/50 p-2 rounded-full hover:bg-blue-600/80 transition-colors duration-300"
                  aria-label={`Email ${name}`}
                >
                  <Mail className="h-4 w-4 text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <motion.div variants={contentVariants} className="p-6">
        <p className="text-gray-300">{bio}</p>
      </motion.div>
    </motion.div>
  )
}
