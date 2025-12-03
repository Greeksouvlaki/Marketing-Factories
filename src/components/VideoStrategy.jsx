import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const Card = ({ title, subtitle, items, isRecommended, index, delay }) => {
    return (
        <motion.div
            className={`relative p-8 pt-10 rounded-2xl backdrop-blur-xl border transition-all duration-300 group h-full ${
                isRecommended
                    ? 'bg-gradient-to-br from-[#2A1AFC]/20 to-[#6366f1]/10 border-[#2A1AFC]/50 shadow-2xl shadow-[#2A1AFC]/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
            }`}
            style={{ overflow: 'visible' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: delay, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -5 }}
        >
            {/* Glow effect for recommended */}
            {isRecommended && (
                <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] rounded-2xl opacity-20 blur-xl -z-10"
                    animate={{ opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            )}

            {/* Top accent line - inside the box */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
                isRecommended 
                    ? 'bg-gradient-to-r from-[#2A1AFC] to-[#6366f1]' 
                    : 'bg-white/20'
            }`} />

            {isRecommended && (
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2A1AFC] to-[#6366f1] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-[#2A1AFC]/50 z-20 whitespace-nowrap"
                    initial={{ scale: 0, y: 10 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.3, type: 'spring', stiffness: 200 }}
                >
                    ⭐ Recommended
                </motion.div>
            )}

            <motion.h3
                className="text-xs text-white/50 uppercase tracking-[0.2em] mb-3 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: delay + 0.1 }}
            >
                {title}
            </motion.h3>

            <motion.h4
                className={`text-2xl font-bold mb-6 ${
                    isRecommended ? 'text-gradient-primary' : 'text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: delay + 0.2 }}
            >
                {subtitle}
            </motion.h4>

            <motion.ul
                className="space-y-3 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: delay + 0.3 }}
            >
                {items.map((item, i) => (
                    <motion.li
                        key={i}
                        className="text-white/80 text-sm flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: delay + 0.4 + i * 0.1 }}
                    >
                        <span className={`mt-1 ${isRecommended ? 'text-[#6366f1]' : 'text-white/40'}`}>
                            →
                        </span>
                        <span>{item}</span>
                    </motion.li>
                ))}
            </motion.ul>

            {index === 0 && (
                <motion.p
                    className="text-xs text-white/40 italic border-t border-white/10 pt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.5 }}
                >
                    "Too basic for production standards."
                </motion.p>
            )}

            {index === 1 && (
                <motion.div
                    className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.5 }}
                >
                    <p className="text-xs text-white/50 mb-2 font-semibold uppercase tracking-wider">Financial Impact</p>
                    <p className="text-xs text-white/70">Purchase: <span className="text-[#6366f1] font-semibold">+2,000€</span></p>
                    <p className="text-xs text-white/70">Rental: <span className="text-[#6366f1] font-semibold">~100€/day</span></p>
                </motion.div>
            )}

            {isRecommended && (
                <motion.div
                    className="mt-6 space-y-2 pt-6 border-t border-[#2A1AFC]/30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: delay + 0.5 }}
                >
                    <p className="text-sm text-[#6366f1] font-semibold flex items-center gap-2">
                        <span>✓</span> Matching aesthetics
                    </p>
                    <p className="text-sm text-[#6366f1] font-semibold flex items-center gap-2">
                        <span>✓</span> High mobility
                    </p>
                    <p className="text-xs text-white/60 italic mt-2">
                        *2nd iPhone available after Belgium trip
                    </p>
                </motion.div>
            )}
        </motion.div>
    )
}

export default function VideoStrategy() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.2 })

    const options = [
        {
            title: 'Option 01',
            subtitle: 'The Minimalist',
            items: ['1x Sony A7C II (Main)', '1x iPhone 17 Pro (Guest)'],
        },
        {
            title: 'Option 02',
            subtitle: 'The Hybrid',
            items: ['2x Cameras (Sony + Borrowed)', '1x iPhone 17 Pro (Tight)'],
        },
        {
            title: 'Option 03',
            subtitle: 'The Symmetrical',
            items: ['1x Sony A7C II (Wide Master)', '2x iPhone 17 Pro (Wings)'],
            isRecommended: true,
        },
    ]

    return (
        <section
            ref={ref}
            id="visual"
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(42, 26, 252, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(42, 26, 252, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
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
                        Section A
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl leading-tight"
                        style={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gradient-primary" style={{ fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>Visual Strategy</span>
                    </motion.h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {options.map((option, index) => (
                        <Card
                            key={index}
                            title={option.title}
                            subtitle={option.subtitle}
                            items={option.items}
                            isRecommended={option.isRecommended}
                            index={index}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
