import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// Static waveform that reacts to mouse position
const StaticWaveform = ({ mouseX, containerWidth }) => {
    const bars = 80
    const barWidth = containerWidth / bars
    
    return (
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="flex items-center w-full px-8">
                {[...Array(bars)].map((_, i) => {
                    const barCenterX = (i / bars) * containerWidth
                    const distance = Math.abs(barCenterX - mouseX)
                    const maxDistance = 150
                    const intensity = Math.max(0, 1 - distance / maxDistance)
                    const height = 4 + intensity * 80
                    
                    return (
                        <motion.div
                            key={i}
                            className="flex-1 mx-[1px] rounded-full bg-gradient-to-t from-[#2A1AFC] to-[#6366f1]"
                            animate={{
                                height: height,
                                opacity: 0.2 + intensity * 0.5,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                            }}
                            style={{
                                minHeight: 4,
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default function TitleSlide() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const [mouseX, setMouseX] = useState(0)
    const [containerWidth, setContainerWidth] = useState(1200)
    const [isHoveringTitle, setIsHoveringTitle] = useState(false)
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                setMouseX(e.clientX - rect.left)
            }
        }
        
        const handleResize = () => {
            if (ref.current) {
                setContainerWidth(ref.current.offsetWidth)
            }
        }
        
        handleResize()
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <section
            ref={ref}
            id="title"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
            {/* Static waveform that reacts to mouse */}
            <StaticWaveform mouseX={mouseX} containerWidth={containerWidth} />
            
            {/* Animated gradient background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        background: 'radial-gradient(circle at 20% 50%, rgba(42, 26, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                    }}
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(42, 26, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(42, 26, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(42, 26, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Floating geometric shapes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + (i % 3) * 30}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                >
                    <div 
                        className={`w-20 h-20 ${
                            i % 2 === 0 
                                ? 'bg-gradient-to-br from-[#2A1AFC] to-[#6366f1]' 
                                : 'bg-gradient-to-br from-[#6366f1] to-[#818cf8]'
                        } opacity-20 blur-xl rounded-full`}
                    />
                </motion.div>
            ))}

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.p
                    className="text-sm md:text-base text-white/60 tracking-[0.3em] uppercase mb-6 font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    Production Strategy
                </motion.p>

                <motion.h1
                    className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] mb-8 tracking-tight"
                    style={{ fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    onMouseEnter={() => setIsHoveringTitle(true)}
                    onMouseLeave={() => setIsHoveringTitle(false)}
                >
                    <motion.span
                        className="block mb-2 text-white cursor-pointer"
                        style={{ 
                            fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                            transition: 'font-weight 0.3s ease',
                        }}
                        animate={{
                            fontWeight: isHoveringTitle ? 900 : 700,
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        MARKETING
                    </motion.span>
                    <motion.span
                        className="block text-gradient-primary cursor-pointer"
                        style={{ 
                            fontFamily: "'Proxima Nova', 'Montserrat', sans-serif",
                            transition: 'font-weight 0.3s ease',
                        }}
                        animate={{
                            fontWeight: isHoveringTitle ? 900 : 700,
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        FACTORIES
                    </motion.span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    Strategic production solutions for modern marketing teams. 
                    From concept to execution, we build the infrastructure you need.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                >
                    <motion.button
                        className="px-10 py-4 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] text-white font-semibold rounded-lg shadow-lg shadow-[#2A1AFC]/50 hover:shadow-[#2A1AFC]/70 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Strategy
                    </motion.button>
                    <motion.button
                        className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/50 hover:bg-white/5 transition-all backdrop-blur-sm"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </motion.svg>
                </div>
            </motion.div>
        </section>
    )
}
