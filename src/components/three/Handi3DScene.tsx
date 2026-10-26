'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

interface Handi3DSceneProps {
  type: 'veg' | 'nonveg'
}

/**
 * 3D Clay Handi / Karahi Scene for the Veg & Non-Veg Split section.
 * Renders an authentic rotating Indian culinary pot with rising aroma & heat sparks.
 */
export default function Handi3DScene({ type }: Handi3DSceneProps) {
  const isVeg = type === 'veg'

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 relative select-none">
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[2, 2, 2]} intensity={2.0} color={isVeg ? '#76E4F7' : '#FFAA00'} />
        <pointLight position={[-2, -1, 1]} intensity={1.5} color={isVeg ? '#48BB78' : '#FF3300'} />

        <Suspense fallback={null}>
          <RotatingHandi isVeg={isVeg} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function RotatingHandi({ isVeg }: { isVeg: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.9
      groupRef.current.rotation.x = 0.25 + Math.sin(elapsed * 1.5) * 0.08
    }
  })

  const bodyColor = isVeg ? '#2D3748' : '#7B341E' // Dark iron / copper clay
  const rimColor = isVeg ? '#48BB78' : '#FF6B1A'
  const soupColor = isVeg ? '#38A169' : '#C53030'

  return (
    <group ref={groupRef} scale={[0.72, 0.72, 0.72]} position={[0, -0.1, 0]}>
      {/* Handi Main Spherical Bowl */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Handi Thick Flared Rim */}
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.62, 0.06, 16, 48]} />
        <meshStandardMaterial color={rimColor} metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Inner Rich Curry / Gravy Surface */}
      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.58, 32]} />
        <meshStandardMaterial
          color={soupColor}
          emissive={isVeg ? '#22543D' : '#9B2C2C'}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Floating Garnishes / Embers above Handi */}
      {[-0.15, 0, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.28 + (i % 2) * 0.04, (i - 1) * 0.1]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color={isVeg ? '#FFF5C2' : '#FFD700'}
            emissive={isVeg ? '#48BB78' : '#FF4500'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Glowing Orbital Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.92, 0.015, 12, 48]} />
        <meshStandardMaterial
          color={rimColor}
          emissive={rimColor}
          emissiveIntensity={0.7}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
