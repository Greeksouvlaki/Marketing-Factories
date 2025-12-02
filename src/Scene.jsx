import React from 'react'
import { ScrollControls, Scroll, useScroll, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import TitleSlide from './components/TitleSlide'
import VideoStrategy from './components/VideoStrategy'
import AudioStrategy from './components/AudioStrategy'
import LayoutStrategy from './components/LayoutStrategy'
import SummarySlide from './components/SummarySlide'

function CameraRig() {
    const scroll = useScroll()
    useFrame((state) => {
        const offset = scroll.offset

        // Smooth camera movement
        // We want to visit y=0, -10, -20, -30, -40
        const targetY = -offset * 40

        // We can also add some sway or zoom
        // Zoom out a bit on the layout slide (index 3, offset ~0.75) to see both

        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + 5, 0.1) // +5 offset for camera height
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.1)
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10, 0.1)

        state.camera.lookAt(0, targetY, 0)
    })
    return null
}

export default function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <Environment preset="city" />

            <ScrollControls pages={5} damping={0.2}>
                <CameraRig />

                <Scroll>
                    {/* Desk Surface - Long vertical strip */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, -2]} receiveShadow>
                        <planeGeometry args={[50, 100]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
                    </mesh>

                    <TitleSlide position={[0, 0, 0]} />
                    <VideoStrategy position={[0, -10, 0]} />
                    <AudioStrategy position={[0, -20, 0]} />
                    <LayoutStrategy position={[0, -30, 0]} />
                    <SummarySlide position={[0, -40, 0]} />
                </Scroll>
            </ScrollControls>
        </>
    )
}
