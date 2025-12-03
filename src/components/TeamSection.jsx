import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Team member data
const teamMembers = [
    {
        id: 1,
        name: 'George Vareloglou',
        role: 'The Big Boss',
        quote: '"einai teleio! is my go to slack message for this project"',
        image: `${import.meta.env.BASE_URL}george.jpg`,
        color: 'from-[#2A1AFC] to-[#6366f1]',
    },
    {
        id: 2,
        name: 'Dafni Prosalika',
        role: 'Our Star',
        quote: '"We did it for our male audience!"',
        image: `${import.meta.env.BASE_URL}dafni.jpg`,
        color: 'from-[#ec4899] to-[#f472b6]',
    },
    {
        id: 3,
        name: 'Ana',
        role: 'The Real Hero',
        quote: '"My name may be wrong but my outfits are not!"',
        image: `${import.meta.env.BASE_URL}ana.jpg`,
        color: 'from-[#10b981] to-[#34d399]',
    },
    {
        id: 4,
        name: 'Jim Skoufis',
        role: 'The Creative Mastermind',
        quote: '"If not me then who?" —Plato or something',
        image: null,
        color: 'from-[#f59e0b] to-[#fbbf24]',
    },
]

// Flip card component
const FlipCard = ({ member, index }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    
    return (
        <motion.div
            className="relative w-full h-[400px] perspective-1000 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of card */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20" />
                    
                    {/* Placeholder image area */}
                    <div className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${member.color} opacity-30 flex items-center justify-center`}>
                                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white/50" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-3.13 0-6 1.65-6 4v2h12v-2c0-2.35-2.87-4-6-4z"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                    
                    {/* Info area */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.p
                            className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-2`}
                        >
                            {member.role}
                        </motion.p>
                        <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}>
                            {member.name}
                        </h3>
                        <p className="text-white/50 text-sm mt-2">Hover to reveal</p>
                    </div>
                    
                    {/* Decorative corner */}
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${member.color} opacity-50 blur-lg`} />
                </div>
                
                {/* Back of card */}
                <div
                    className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color}`} />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Quote content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <div className="text-6xl text-white/30 mb-4">"</div>
                        <p className="text-xl text-white font-medium leading-relaxed italic mb-6">
                            {member.quote}
                        </p>
                        <div className="w-16 h-1 bg-white/30 rounded-full mb-4" />
                        <p className="text-white/80 font-bold uppercase tracking-wider text-sm">
                            {member.name}
                        </p>
                        <p className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mt-1`}>
                            {member.role}
                        </p>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                </div>
            </motion.div>
            
            {/* Glow effect on hover */}
            <motion.div
                className={`absolute -inset-2 bg-gradient-to-r ${member.color} rounded-3xl opacity-0 blur-xl -z-10`}
                animate={{ opacity: isFlipped ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default function TeamSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.2 })

    return (
        <section
            ref={ref}
            id="team"
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(42, 26, 252, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                    }}
                />
            </div>
            
            {/* Floating shapes */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${15 + i * 25}%`,
                        top: `${20 + (i % 2) * 60}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                    }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#2A1AFC] to-[#6366f1] opacity-20 blur-xl rounded-lg" />
                </motion.div>
            ))}

            <div className="max-w-7xl w-full relative z-10">
                <motion.div
                    className="mb-16 text-center"
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
                        The Dream Team
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl leading-tight"
                        style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gradient-primary" style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}>Meet the Team</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/60 mt-4 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        Hover over each card to discover the masterminds behind Marketing Factories
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <FlipCard key={member.id} member={member} index={index} />
                    ))}
                </div>
                
                <motion.p
                    className="text-center text-xs text-white/30 mt-8 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.8 }}
                >
                    the quotes are for fun, don't report me to Katerina
                </motion.p>
            </div>
        </section>
    )
}

