import React, { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import NavBar from './components/NavBar'
import TitleSlide from './components/TitleSlide'
import VideoStrategy from './components/VideoStrategy'
import AudioStrategy from './components/AudioStrategy'
import LayoutStrategy from './components/LayoutStrategy'
import SummarySlide from './components/SummarySlide'

function App() {
    const { scrollYProgress } = useScroll()
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="relative w-full min-h-screen overflow-x-hidden">
            {/* Global mouse follower effect */}
            <motion.div
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
                style={{
                    background: `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(42, 26, 252, 0.1), transparent 60%)`,
                }}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Navigation Bar */}
            <NavBar />

            {/* Main content */}
            <div className="relative z-10">
                <TitleSlide />
                <VideoStrategy />
                <AudioStrategy />
                <LayoutStrategy />
                <SummarySlide />
            </div>

            {/* Scroll progress indicator */}
            <motion.div
                className="fixed bottom-0 left-0 h-1 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] z-50"
                style={{
                    scaleX: scrollYProgress,
                    transformOrigin: 'left',
                }}
            />
        </div>
    )
}

export default App
