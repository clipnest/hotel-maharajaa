'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { useMouseParallax } from '@/lib/utils/useMouseParallax'

/**
 * 3D Thali Scene — ember particles + rotating steel plate.
 * Lazy-loaded via dynamic import. Poster shown on low-end devices.
 */
export default function ThaliScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 3, 2]} intensity={3} color="#FF6B1A" />
      <pointLight position={[-2, -1, 1]} intensity={1.5} color="#F5B82E" />
      <Suspense fallback={null}>
        <ThaliMesh />
        <EmberParticles />
      </Suspense>
    </Canvas>
  )
}

function ThaliMesh() {
  const groupRef = useRef<THREE.Group>(null!)
  const tilt = useMouseParallax(0.08)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.21
    groupRef.current.rotation.x = tilt.y * 0.4
    groupRef.current.rotation.z = -tilt.x * 0.2
  })

  return (
    <group ref={groupRef}>
      {/* Steel thali (plate) */}
      <mesh>
        <cylinderGeometry args={[1.4, 1.4, 0.08, 64]} />
        <meshStandardMaterial
          color="#c0bdb0"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
      {/* Rim */}
      <mesh position={[0, 0.06, 0]}>
        <torusGeometry args={[1.4, 0.04, 16, 80]} />
        <meshStandardMaterial color="#d4d0c0" metalness={1} roughness={0.1} />
      </mesh>
      {/* Bowl 1 */}
      <Bowl position={[-0.55, 0.18, 0]} />
      {/* Bowl 2 */}
      <Bowl position={[0.55, 0.18, 0]} />
      {/* Small bowl */}
      <SmallBowl position={[0, 0.18, -0.45]} />
      {/* Orange glow fill (emission) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.38, 1.38, 0.01, 64]} />
        <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={0.12} metalness={0} roughness={1} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function Bowl({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      <meshStandardMaterial color="#b0ada0" metalness={0.85} roughness={0.25} side={THREE.BackSide} />
    </mesh>
  )
}

function SmallBowl({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.18, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      <meshStandardMaterial color="#b8b5a5" metalness={0.85} roughness={0.25} side={THREE.BackSide} />
    </mesh>
  )
}

function EmberParticles() {
  const count   = 120
  const meshRef = useRef<THREE.Points>(null!)

  const [positions, velocities] = (() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 4
      pos[i * 3 + 1] = Math.random() * 3 - 1
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      vel[i * 3]     = (Math.random() - 0.5) * 0.004
      vel[i * 3 + 1] = Math.random() * 0.012 + 0.004
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004
    }
    return [pos, vel]
  })()

  useFrame(() => {
    const p = meshRef.current?.geometry.attributes.position
    if (!p) return
    for (let i = 0; i < count; i++) {
      p.array[i * 3]     += velocities[i * 3]
      p.array[i * 3 + 1] += velocities[i * 3 + 1]
      p.array[i * 3 + 2] += velocities[i * 3 + 2]
      // Wrap upward
      if (p.array[i * 3 + 1] > 3) {
        p.array[i * 3 + 1] = -1
        p.array[i * 3]     = (Math.random() - 0.5) * 4
        p.array[i * 3 + 2] = (Math.random() - 0.5) * 4
      }
    }
    p.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF8C3A"
        size={0.04}
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  )
}
