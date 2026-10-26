'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

/**
 * 3D Clay Tandoor Model with interior fire glow and rising heat waves.
 */
export default function Tandoor3DScene() {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 relative select-none">
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.0} />
        <pointLight position={[0, 1, 1]} intensity={2.5} color="#FF7A00" />
        <pointLight position={[0, 0, 0]} intensity={3.0} color="#FF3300" />

        <Suspense fallback={null}>
          <RotatingTandoor />
        </Suspense>
      </Canvas>
    </div>
  )
}

function RotatingTandoor() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.8
      groupRef.current.rotation.x = 0.35 + Math.sin(elapsed * 2) * 0.05
    }
  })

  return (
    <group ref={groupRef} scale={[0.82, 0.82, 0.82]} position={[0, -0.15, 0]}>
      {/* Terracotta Clay Tandoor Barrel Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.42, 0.85, 32, 1, true]} />
        <meshStandardMaterial
          color="#B2552B" // Terracotta clay
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tandoor Lip / Ring Top */}
      <mesh position={[0, 0.43, 0]}>
        <torusGeometry args={[0.54, 0.045, 16, 48]} />
        <meshStandardMaterial color="#8C3B17" roughness={0.7} />
      </mesh>

      {/* Interior Blazing Fire Coal Bed */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 0.1, 24]} />
        <meshStandardMaterial
          color="#FF3300"
          emissive="#FF2200"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>

      {/* Golden Bread / Roti on the inner wall */}
      <mesh position={[0.35, 0.1, 0.2]} rotation={[0, -0.8, 0]}>
        <circleGeometry args={[0.16, 16]} />
        <meshStandardMaterial
          color="#F6E05E"
          emissive="#D69E2E"
          emissiveIntensity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Swirling Ember Glow Ring */}
      <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.015, 12, 32]} />
        <meshStandardMaterial
          color="#FF8400"
          emissive="#FF8400"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}
