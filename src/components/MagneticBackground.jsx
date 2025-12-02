import React, { useEffect, useState } from 'react'

export default function MagneticBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [orbs, setOrbs] = useState([
        { id: 1, x: 20, y: 30, size: 400, color: 'bg-yellow-500', strength: 0.15 },
        { id: 2, x: 70, y: 60, size: 350, color: 'bg-blue-500', strength: 0.12 },
        { id: 3, x: 50, y: 20, size: 300, color: 'bg-purple-500', strength: 0.18 },
        { id: 4, x: 30, y: 80, size: 280, color: 'bg-red-500', strength: 0.1 },
        { id: 5, x: 80, y: 40, size: 320, color: 'bg-green-500', strength: 0.14 },
    ])

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
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {orbs.map((orb) => {
                // Calculate magnetic pull towards mouse
                const dx = mousePosition.x - orb.x
                const dy = mousePosition.y - orb.y
                const offsetX = dx * orb.strength
                const offsetY = dy * orb.strength

                return (
                    <div
                        key={orb.id}
                        className={`absolute ${orb.color} rounded-full opacity-30 blur-[80px] transition-all duration-700 ease-out`}
                        style={{
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            left: `calc(${orb.x}% + ${offsetX}px)`,
                            top: `calc(${orb.y}% + ${offsetY}px)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )
            })}
        </div>
    )
}
