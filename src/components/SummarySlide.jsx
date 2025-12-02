import React, { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function SummarySlide() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.3 })
    const cardRef = useRef(null)

    const [selections, setSelections] = useState({
        video: 'option3',
        audio: 'dji',
    })

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg'])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg'])

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return
            const rect = cardRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distanceX = e.clientX - centerX
            const distanceY = e.clientY - centerY
            x.set(distanceX / 40)
            y.set(distanceY / 40)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [x, y])

    const videoOptions = [
        { id: 'option1', label: 'Option 01: The Minimalist', value: '1 Sony + 1 iPhone', price: 0 },
        { id: 'option2', label: 'Option 02: The Hybrid', value: '2 Cameras + 1 iPhone', price: 2000 },
        { id: 'option3', label: 'Option 03: The Symmetrical', value: '1 Sony + 2 iPhones', price: 0 },
    ]

    const audioOptions = [
        { id: 'dji', label: 'DJI Mic 3 (Quad)', price: 0 },
        { id: 'rode', label: 'RODE Podmics + Interface', price: 500 },
    ]

    const supportPrice = 200
    const totalPrice = 
        (videoOptions.find(opt => opt.id === selections.video)?.price || 0) +
        (audioOptions.find(opt => opt.id === selections.audio)?.price || 0) +
        supportPrice

    const handleVideoChange = (optionId) => {
        setSelections(prev => ({ ...prev, video: optionId }))
    }

    const handleAudioChange = (optionId) => {
        setSelections(prev => ({ ...prev, audio: optionId }))
    }

    return (
        <section
            ref={ref}
            id="summary"
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-20">
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(42, 26, 252, 0.2) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="max-w-4xl w-full text-center relative z-10">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.p
                        className="text-sm text-white/50 uppercase tracking-[0.3em] mb-4 font-medium"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Final Loadout
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl leading-tight"
                        style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gradient-primary" style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}>The Final Loadout</span>
                    </motion.h2>
                </motion.div>

                <motion.div
                    ref={cardRef}
                    className="relative bg-gradient-to-br from-white to-white/95 text-black p-8 md:p-12 max-w-xl mx-auto rounded-2xl border-2 border-white/20 shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Glow effect */}
                    <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] rounded-2xl opacity-20 blur-xl -z-10"
                        animate={{ opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Top accent line - inside the box */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1]" style={{ borderRadius: '0.75rem 0.75rem 0 0' }} />

                    <motion.h3
                        className="text-2xl md:text-3xl font-black border-b-2 border-black/10 pb-6 mb-8"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        BELGIUM KIT
                    </motion.h3>

                    <div className="text-left space-y-6">
                        {/* Video Selection */}
                        <motion.div
                            className="pb-4 border-b border-black/10"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.7 }}
                        >
                            <span className="font-bold text-lg text-black block mb-3">VIDEO:</span>
                            <div className="space-y-2">
                                {videoOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            name="video"
                                            value={option.id}
                                            checked={selections.video === option.id}
                                            onChange={() => handleVideoChange(option.id)}
                                            className="w-4 h-4 text-[#2A1AFC] focus:ring-[#2A1AFC]"
                                        />
                                        <span className="text-sm group-hover:text-[#2A1AFC] transition-colors">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-2 text-sm font-semibold bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] text-white px-4 py-2 rounded-lg inline-block">
                                {videoOptions.find(opt => opt.id === selections.video)?.value}
                            </div>
                        </motion.div>

                        {/* Audio Selection */}
                        <motion.div
                            className="pb-4 border-b border-black/10"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.8 }}
                        >
                            <span className="font-bold text-lg text-black block mb-3">AUDIO:</span>
                            <div className="space-y-2">
                                {audioOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            name="audio"
                                            value={option.id}
                                            checked={selections.audio === option.id}
                                            onChange={() => handleAudioChange(option.id)}
                                            className="w-4 h-4 text-[#2A1AFC] focus:ring-[#2A1AFC]"
                                        />
                                        <span className="text-sm group-hover:text-[#2A1AFC] transition-colors">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-2 text-sm font-semibold bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] text-white px-4 py-2 rounded-lg inline-block">
                                {audioOptions.find(opt => opt.id === selections.audio)?.label}
                            </div>
                        </motion.div>

                        {/* Support */}
                        <motion.div
                            className="pb-4 border-b border-black/10"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.9 }}
                        >
                            <span className="font-bold text-lg text-black">SUPPORT:</span>
                            <span className="ml-2 text-sm font-semibold bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] text-white px-4 py-2 rounded-lg inline-block">
                                2x Tripods + Lights
                            </span>
                        </motion.div>

                        {/* Total */}
                        <motion.div
                            className="flex justify-between items-center pt-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1 }}
                        >
                            <span className="font-bold text-lg">TOTAL EST:</span>
                            <span className="font-black text-2xl text-gradient-primary">~{totalPrice}€</span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-20 text-white/60 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                >
                    <p className="font-semibold">Jim Skoufis 2025</p>
                </motion.div>
            </div>
        </section>
    )
}
