import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50)
    })

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const navItems = [
        { label: 'Home', to: 'title' },
        { label: 'Team', to: 'team' },
        { label: 'Visual', to: 'visual' },
        { label: 'Audio', to: 'audio' },
        { label: 'Layout', to: 'layout' },
        { label: 'Summary', to: 'summary' },
    ]

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-lg' 
                    : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-6">
                <motion.div
                    className="text-2xl font-bold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('title')}
                >
                    <span className="text-gradient-primary font-space-grotesk">MF</span>
                </motion.div>
                
                <ul className="hidden md:flex space-x-8 items-center">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.to}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => scrollToSection(item.to)}
                                className="relative text-white/70 hover:text-white transition-colors cursor-pointer text-sm font-medium uppercase tracking-wider group"
                            >
                                {item.label}
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] group-hover:w-full transition-all duration-300"
                                    initial={false}
                                />
                            </button>
                        </motion.li>
                    ))}
                </ul>

                <motion.button
                    className="md:hidden text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </motion.button>
            </div>
        </motion.nav>
    )
}
