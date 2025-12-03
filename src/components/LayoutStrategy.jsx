import React, { useState, useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'

// Canvas center coordinates
const CANVAS_CENTER_X = 400
const CANVAS_CENTER_Y = 300

// Calculate angle from element position to center
const getAngleToCenter = (x, y, width, height) => {
    const elementCenterX = x + width / 2
    const elementCenterY = y + height / 2
    const deltaX = CANVAS_CENTER_X - elementCenterX
    const deltaY = CANVAS_CENTER_Y - elementCenterY
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI)
}

// Background options for the canvas
const BACKGROUNDS = {
    blueprint: {
        label: 'Blueprint',
        style: {
            backgroundImage: `url("${import.meta.env.BASE_URL}blueprint.png")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        pattern: 'none',
        patternSize: '0',
    },
    studio: {
        label: 'Studio',
        style: {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        },
        pattern: `
            linear-gradient(rgba(42, 26, 252, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42, 26, 252, 0.1) 1px, transparent 1px)
        `,
        patternSize: '40px 40px',
    },
    livingRoom: {
        label: 'Living Room',
        style: {
            background: 'linear-gradient(135deg, #3d2914 0%, #5c4023 50%, #2d1f0f 100%)',
        },
        pattern: `
            radial-gradient(circle at 20% 30%, rgba(255, 200, 100, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 180, 80, 0.08) 0%, transparent 40%)
        `,
        patternSize: '100% 100%',
    },
    podcast: {
        label: 'Podcast Booth',
        style: {
            background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #0f0505 100%)',
        },
        pattern: `
            repeating-linear-gradient(0deg, rgba(100, 50, 50, 0.1) 0px, rgba(100, 50, 50, 0.1) 2px, transparent 2px, transparent 20px),
            repeating-linear-gradient(90deg, rgba(100, 50, 50, 0.1) 0px, rgba(100, 50, 50, 0.1) 2px, transparent 2px, transparent 20px)
        `,
        patternSize: '20px 20px',
    },
    greenScreen: {
        label: 'Green Screen',
        style: {
            background: 'linear-gradient(135deg, #0a3d0a 0%, #1a5c1a 50%, #0a2d0a 100%)',
        },
        pattern: 'none',
        patternSize: '40px 40px',
    },
    outdoor: {
        label: 'Outdoor',
        style: {
            background: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 40%, #7CB342 100%)',
        },
        pattern: `
            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 20%),
            radial-gradient(circle at 70% 15%, rgba(255, 255, 255, 0.2) 0%, transparent 15%)
        `,
        patternSize: '100% 100%',
    },
}

// Icons for elements (SVG paths)
const ICONS = {
    host: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
            <circle cx="12" cy="8" r="2" fill="rgba(255,255,255,0.3)" />
        </svg>
    ),
    guest: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
        </svg>
    ),
    iphone: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <circle cx="12" cy="18" r="1.5" fill="rgba(0,0,0,0.3)" />
            <rect x="9" y="4" width="6" height="1" rx="0.5" fill="rgba(0,0,0,0.2)" />
        </svg>
    ),
    sony: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="8" cy="12" r="4" fill="rgba(0,0,0,0.3)" />
            <circle cx="8" cy="12" r="2.5" fill="rgba(255,255,255,0.2)" />
            <rect x="14" y="9" width="5" height="3" rx="0.5" fill="rgba(0,0,0,0.2)" />
            <circle cx="18" cy="8" r="1" fill="#ff0000" />
        </svg>
    ),
    keyLight: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <circle cx="12" cy="12" r="6" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    ),
    fillLight: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    ),
    chair: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M7 13h10v2H7zM8 15v5M16 15v5M6 8h12v5H6z" />
            <rect x="6" y="6" width="12" height="7" rx="1" />
        </svg>
    ),
    table: (
        <svg viewBox="0 0 32 24" fill="currentColor" className="w-10 h-6">
            <rect x="2" y="8" width="28" height="4" rx="1" />
            <rect x="5" y="12" width="3" height="8" />
            <rect x="24" y="12" width="3" height="8" />
        </svg>
    ),
}

// Element types with their configurations
const ELEMENT_TYPES = {
    host: {
        label: 'HOST',
        width: 70,
        height: 70,
        color: 'bg-gradient-to-br from-[#2A1AFC] to-[#6366f1]',
        textColor: 'text-white',
        hasFOV: false,
        icon: ICONS.host,
    },
    guest: {
        label: 'GUEST',
        width: 70,
        height: 70,
        color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
        textColor: 'text-white',
        hasFOV: false,
        icon: ICONS.guest,
    },
    iphone: {
        label: 'iPhone',
        width: 50,
        height: 50,
        color: 'bg-white',
        textColor: 'text-black',
        hasFOV: true,
        fovType: 'telephoto',
        icon: ICONS.iphone,
    },
    sony: {
        label: 'SONY',
        width: 60,
        height: 60,
        color: 'bg-gradient-to-br from-[#2A1AFC] to-[#6366f1]',
        textColor: 'text-white',
        hasFOV: true,
        fovType: 'wide',
        icon: ICONS.sony,
    },
    keyLight: {
        label: 'KEY',
        width: 50,
        height: 50,
        color: 'bg-yellow-400',
        textColor: 'text-black',
        hasFOV: true,
        fovType: 'light',
        icon: ICONS.keyLight,
    },
    fillLight: {
        label: 'FILL',
        width: 50,
        height: 50,
        color: 'bg-yellow-300',
        textColor: 'text-black',
        hasFOV: true,
        fovType: 'light',
        icon: ICONS.fillLight,
    },
    chair: {
        label: 'CHAIR',
        width: 70,
        height: 70,
        color: 'bg-gradient-to-br from-white/30 to-white/10',
        textColor: 'text-white',
        hasFOV: false,
        icon: ICONS.chair,
    },
    table: {
        label: 'TABLE',
        width: 150,
        height: 80,
        color: 'bg-gradient-to-br from-white/25 to-white/10',
        textColor: 'text-white',
        hasFOV: false,
        icon: ICONS.table,
    }
}

// FOV configurations
const FOV_CONFIGS = {
    telephoto: {
        size: 250,
        points: '125,125 250,110 250,140',
        gradient: ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']
    },
    wide: {
        size: 400,
        points: '200,200 400,80 400,320',
        gradient: ['rgba(42,26,252,0.5)', 'rgba(99,102,241,0.2)', 'rgba(99,102,241,0)']
    },
    light: {
        size: 300,
        points: '150,150 300,100 300,200',
        gradient: ['rgba(255,220,100,0.5)', 'rgba(255,220,100,0.2)', 'rgba(255,220,100,0)']
    }
}

// Draggable canvas element with integrated FOV
const CanvasElement = ({ element, onPositionChange, canvasRef }) => {
    const config = ELEMENT_TYPES[element.type]
    const fovConfig = config.hasFOV ? FOV_CONFIGS[config.fovType] : null
    
    // Use motion values for real-time position tracking
    const x = useMotionValue(element.x)
    const y = useMotionValue(element.y)
    
    // Calculate angle reactively based on current position
    const angle = useTransform([x, y], ([latestX, latestY]) => {
        const elementCenterX = latestX + config.width / 2
        const elementCenterY = latestY + config.height / 2
        const deltaX = CANVAS_CENTER_X - elementCenterX
        const deltaY = CANVAS_CENTER_Y - elementCenterY
        return Math.atan2(deltaY, deltaX) * (180 / Math.PI)
    })
    
    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={canvasRef}
            style={{ 
                x,
                y,
                width: config.width, 
                height: config.height,
                zIndex: 20,
                overflow: 'visible',
            }}
            className="absolute cursor-grab active:cursor-grabbing"
            onDragEnd={() => {
                onPositionChange(element.id, x.get(), y.get())
            }}
            whileDrag={{ scale: 1.1, zIndex: 100 }}
            whileHover={{ scale: 1.05 }}
        >
            {/* FOV cone - rendered behind the element */}
            {fovConfig && (
                <motion.svg 
                    className="absolute pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        width: fovConfig.size,
                        height: fovConfig.size,
                        rotate: angle,
                        x: '-50%',
                        y: '-50%',
                        overflow: 'visible',
                        zIndex: -1,
                    }}
                    viewBox={`0 0 ${fovConfig.size} ${fovConfig.size}`}
                >
                    <defs>
                        <linearGradient id={`fovGrad-${element.id}`} x1="0%" y1="50%" x2="100%" y2="50%">
                            <stop offset="0%" stopColor={fovConfig.gradient[0]} />
                            <stop offset="50%" stopColor={fovConfig.gradient[1]} />
                            <stop offset="100%" stopColor={fovConfig.gradient[2]} />
                        </linearGradient>
                    </defs>
                    <polygon 
                        points={fovConfig.points}
                        fill={`url(#fovGrad-${element.id})`}
                    />
                </motion.svg>
            )}
            
            {/* Element box with icon */}
            <div className={`w-full h-full ${config.color} border-2 border-white/50 rounded-xl flex flex-col items-center justify-center shadow-lg relative z-10 ${config.textColor}`}>
                {config.icon}
                <span className="text-[8px] font-bold mt-0.5 opacity-80">{config.label}</span>
            </div>
        </motion.div>
    )
}

// Palette item for selecting elements
const PaletteItem = ({ type, onAdd }) => {
    const config = ELEMENT_TYPES[type]
    
    return (
        <motion.button
            onClick={() => onAdd(type)}
            className={`${config.color} border-2 border-white/40 rounded-lg flex flex-col items-center justify-center shadow-lg hover:border-[#2A1AFC] transition-colors ${config.textColor}`}
            style={{ width: 55, height: 50 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="w-5 h-5 flex items-center justify-center">
                {config.icon}
            </div>
            <span className="text-[8px] font-bold mt-0.5">{config.label}</span>
        </motion.button>
    )
}

// Background selector button
const BackgroundButton = ({ bgKey, bg, isSelected, onSelect }) => (
    <motion.button
        onClick={() => onSelect(bgKey)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isSelected 
                ? 'bg-[#2A1AFC] text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {bg.label}
    </motion.button>
)

export default function LayoutStrategy() {
    const ref = useRef(null)
    const canvasRef = useRef(null)
    const isInView = useInView(ref, { once: false, amount: 0.2 })
    const [elements, setElements] = useState([])
    const [nextId, setNextId] = useState(1)
    const [selectedBg, setSelectedBg] = useState('blueprint')

    const addElement = useCallback((type) => {
        const config = ELEMENT_TYPES[type]
        // Place new element near center with slight random offset
        const newElement = {
            id: nextId,
            type,
            x: CANVAS_CENTER_X - config.width / 2 + (Math.random() - 0.5) * 100,
            y: CANVAS_CENTER_Y - config.height / 2 + (Math.random() - 0.5) * 100,
        }
        setElements(prev => [...prev, newElement])
        setNextId(prev => prev + 1)
    }, [nextId])

    const updatePosition = useCallback((id, x, y) => {
        setElements(prev => prev.map(el => 
            el.id === id ? { ...el, x, y } : el
        ))
    }, [])

    const resetCanvas = useCallback(() => {
        setElements([])
        setNextId(1)
    }, [])

    return (
        <section
            ref={ref}
            id="layout"
            className="min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative"
        >
            <div className="max-w-5xl w-full relative z-10">
                <motion.div
                    className="mb-12"
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
                        Section C
                    </motion.p>
                    <motion.h2
                        className="text-5xl md:text-7xl leading-tight"
                        style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gradient-primary" style={{ fontWeight: 700, fontFamily: "'Proxima Nova', 'Montserrat', sans-serif" }}>Studio Planner</span>
                    </motion.h2>
                    <p className="text-white/60 mt-4 text-lg">
                        Click elements below to add them to the canvas. Drag to position. FOVs always point to center.
                    </p>
                </motion.div>

                {/* Background Selector */}
                <motion.div
                    className="mb-4 flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 }}
                >
                    <span className="text-white/50 text-sm mr-2">Background:</span>
                    {Object.entries(BACKGROUNDS).map(([key, bg]) => (
                        <BackgroundButton
                            key={key}
                            bgKey={key}
                            bg={bg}
                            isSelected={selectedBg === key}
                            onSelect={setSelectedBg}
                        />
                    ))}
                </motion.div>

                {/* Element Palette */}
                <motion.div
                    className="mb-6 flex flex-wrap gap-2 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <span className="text-white/50 text-sm mr-1">People:</span>
                    <PaletteItem type="host" onAdd={addElement} />
                    <PaletteItem type="guest" onAdd={addElement} />
                    <span className="text-white/30 mx-1">|</span>
                    <span className="text-white/50 text-sm">Cameras:</span>
                    <PaletteItem type="sony" onAdd={addElement} />
                    <PaletteItem type="iphone" onAdd={addElement} />
                    <span className="text-white/30 mx-1">|</span>
                    <span className="text-white/50 text-sm">Lights:</span>
                    <PaletteItem type="keyLight" onAdd={addElement} />
                    <PaletteItem type="fillLight" onAdd={addElement} />
                    <span className="text-white/30 mx-1">|</span>
                    <span className="text-white/50 text-sm">Furniture:</span>
                    <PaletteItem type="chair" onAdd={addElement} />
                    <PaletteItem type="table" onAdd={addElement} />
                </motion.div>

                {/* Canvas */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Reset Button */}
                    <motion.button
                        onClick={resetCanvas}
                        className="absolute top-4 right-4 z-50 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset
                    </motion.button>

                    <div 
                        ref={canvasRef}
                        className="relative w-full h-[600px] border border-white/20 rounded-2xl overflow-visible shadow-2xl transition-all duration-500"
                        style={{ 
                            maxWidth: 800, 
                            margin: '0 auto',
                            ...BACKGROUNDS[selectedBg].style,
                        }}
                    >
                        {/* Background pattern */}
                        {BACKGROUNDS[selectedBg].pattern !== 'none' && (
                            <div 
                                className="absolute inset-0 pointer-events-none rounded-2xl"
                                style={{
                                    backgroundImage: BACKGROUNDS[selectedBg].pattern,
                                    backgroundSize: BACKGROUNDS[selectedBg].patternSize,
                                }}
                            />
                        )}

                        {/* Instruction overlay when empty */}
                        {elements.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <p className="text-white/30 text-lg">Click elements above to add them here</p>
                                    <p className="text-white/20 text-sm mt-2">Then drag to position</p>
                                </div>
                            </div>
                        )}

                        {/* Render elements with integrated FOVs */}
                        {elements.map(element => (
                            <CanvasElement
                                key={element.id}
                                element={element}
                                onPositionChange={updatePosition}
                                canvasRef={canvasRef}
                            />
                        ))}
                    </div>

                    {/* Element count */}
                    <div className="text-center mt-4 text-white/40 text-sm">
                        {elements.length} element{elements.length !== 1 ? 's' : ''} placed
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
