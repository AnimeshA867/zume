"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PresentationControls } from "@react-three/drei"
import type { Group } from "three"

function ResumeModel() {
  const group = useRef<Group>(null)

  // Create a simple resume-like model with floating blocks
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  return (
    <group ref={group}>
      {/* Main resume paper */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Header section */}
      <mesh position={[0, 1.5, 0.1]} castShadow>
        <boxGeometry args={[2.5, 0.4, 0.05]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>

      {/* Content blocks */}
      {[0.5, 0, -0.5, -1].map((y, i) => (
        <mesh key={i} position={[0, y, 0.1]} castShadow>
          <boxGeometry args={[2.5, 0.2, 0.05]} />
          <meshStandardMaterial color="#e5e7eb" />
        </mesh>
      ))}

      {/* Floating skill blocks */}
      {[
        [-1.5, 0.8, 0.5],
        [1.5, 0.3, 0.7],
        [-1.2, -0.8, 0.3],
        [1.3, -1.2, 0.6],
      ].map((pos, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={pos} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.1]} />
            <meshStandardMaterial color="#818cf8" />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function Hero3D() {
  return (
    <div className="h-[400px] w-full md:h-[500px]">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-0.2, 0.2]}
          azimuth={[-0.5, 0.5]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <ResumeModel />
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
