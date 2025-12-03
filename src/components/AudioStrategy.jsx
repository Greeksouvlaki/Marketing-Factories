import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AudioCard = ({ title, subtitle, features, isApproved, delay }) => {
    return (
        <motion.div
            className={`relative p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
                isApproved
                    ? 'bg-gradient-to-br from-[#2A1AFC]/20 to-[#6366f1]/10 border-[#2A1AFC]/50 shadow-2xl shadow-[#2A1AFC]/20'
                    : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
            }`}
            initial={{ opacity: 0, x: isApproved ? -100 : 100 }}
            whileInView={{ opacity: isApproved ? 1 : 0.7, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: delay, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            {/* Top accent line - inside the box */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${
                isApproved 
                    ? 'bg-gradient-to-r from-[#2A1AFC] to-[#6366f1]' 
                    : 'bg-white/20'
            }`} style={{ borderRadius: '0.75rem 0.75rem 0 0' }} />

            <div className="flex justify-between items-start mb-6">
                <motion.h3
                    className={`text-3xl font-bold ${
                        isApproved ? 'text-white' : 'text-white/50'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.1 }}
                >
                    {title}
                </motion.h3>
            </div>

            <motion.p
                className={`text-xl font-mono mb-8 ${
                    isApproved ? 'text-gradient-primary' : 'text-white/30'
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: delay + 0.3 }}
            >
                {subtitle}
            </motion.p>

            <div className="space-y-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: isApproved ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: delay + 0.4 + index * 0.1 }}
                    >
                        <span
                            className={`text-xl font-bold mt-1 ${
                                isApproved ? 'text-[#6366f1]' : 'text-white/30'
                            }`}
                        >
                            {isApproved ? '✓' : '✗'}
                        </span>
                        <div>
                            <strong
                                className={`text-base block mb-1 ${
                                    isApproved ? 'text-white' : 'text-white/50'
                                }`}
                            >
                                {feature.title}
                            </strong>
                            <p className="text-sm text-white/50">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {!isApproved && (
                <motion.div
                    className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.7 }}
                >
                    <p className="text-xs text-white/50 mb-2 font-semibold uppercase tracking-wider">Extra Budget Required</p>
                    <p className="text-sm text-white/80">Audio Expert: <span className="text-[#6366f1] font-bold">+500€</span></p>
                    <p className="text-sm text-white/80">Equipment Setup: <span className="text-[#6366f1] font-bold">+300€</span></p>
                    <p className="text-sm text-white font-bold mt-2">Total Extra: <span className="text-[#6366f1]">+800€</span></p>
                </motion.div>
            )}

            <motion.div
                className={`mt-8 text-center p-6 border-2 border-dashed rounded-xl ${
                    isApproved
                        ? 'border-[#2A1AFC]/30 bg-[#2A1AFC]/5'
                        : 'border-white/10 bg-white/5'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: delay + 0.8 }}
            >
                <div className="text-3xl mb-2">{isApproved ? '🪶' : '🏋️'}</div>
                <div
                    className={`text-xs font-medium uppercase tracking-wider ${
                        isApproved ? 'text-[#6366f1]' : 'text-white/30'
                    }`}
                >
                    {isApproved ? 'Travel Light, Sound Heavy' : 'Overweight Baggage'}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function AudioStrategy() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.2 })

    const approvedFeatures = [
        {
            title: '4-Channel Internal Recording',
            description: 'No interference, no signal dropouts.',
        },
        {
            title: '32-bit Float Audio',
            description: 'Impossible to "clip" or distort audio.',
        },
        {
            title: 'Zero Logistics',
            description: 'Fits in a single charging case. No cables.',
        },
    ]

    const rejectedFeatures = [
        {
            title: 'Requires Audio Expert',
            description: 'We need an audio expert for complex gain staging & software management.',
        },
        {
            title: 'Software Dependency',
            description: 'Needs Laptop + DAW. High risk of crash/latency.',
        },
        {
            title: 'Logistical Nightmare',
            description: 'Heavy stands & XLR cables to every country.',
        },
    ]

    return (
        <section
            ref={ref}
            id="audio"
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(42, 26, 252, 0.1) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="max-w-7xl w-full relative z-10">
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
                        Section B
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl leading-tight"
                        style={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gradient-primary" style={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Audio Strategy</span>
                    </motion.h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AudioCard
                        title="The Agile"
                        subtitle="DJI MIC 3 QUADRAPHONIC"
                        features={approvedFeatures}
                        isApproved={true}
                        delay={0.1}
                    />
                    <AudioCard
                        title="The Studio"
                        subtitle="RODE PODMICS + INTERFACE"
                        features={rejectedFeatures}
                        isApproved={false}
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    )
}
