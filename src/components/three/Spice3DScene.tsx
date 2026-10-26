'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { useMouseParallax } from '@/lib/utils/useMouseParallax'

interface Spice3DSceneProps {
  level: number // 1 to 5
}

/**
 * Interactive 3D Spice Element that transforms and erupts with fire
 * as the user adjusts the Spice-O-Meter slider.
 */
export default function Spice3DScene({ level }: Spice3DSceneProps) {
  return (
    <div className="w-full h-48 sm:h-56 relative flex items-center justify-center select-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[2, 3, 2]} intensity={2.2} color="#FFAA00" />
        <pointLight position={[-2, -1, 2]} intensity={1.5} color="#FF3300" />

        <Suspense fallback={null}>
          <Chilli3D level={level} />
          <SpiceEmbers level={level} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Chilli3D({ level }: { level: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const tilt = useMouseParallax(0.06)

  // Color and glow map based on spice level
  const { bodyColor, emissiveColor, emissiveIntensity, spinSpeed, scale } = useMemo(() => {
    switch (level) {
      case 1:
        return {
          bodyColor: '#38A169', // fresh green
          emissiveColor: '#22543D',
          emissiveIntensity: 0.2,
          spinSpeed: 0.6,
          scale: 0.85,
        }
      case 2:
        return {
          bodyColor: '#D69E2E', // golden amber
          emissiveColor: '#744210',
          emissiveIntensity: 0.35,
          spinSpeed: 0.9,
          scale: 0.9,
        }
      case 3:
        return {
          bodyColor: '#DD6B20', // spicy orange
          emissiveColor: '#C05621',
          emissiveIntensity: 0.55,
          spinSpeed: 1.3,
          scale: 0.96,
        }
      case 4:
        return {
          bodyColor: '#E53E3E', // fiery red
          emissiveColor: '#9B2C2C',
          emissiveIntensity: 0.8,
          spinSpeed: 1.8,
          scale: 1.02,
        }
      case 5:
      default:
        return {
          bodyColor: '#FF1133', // inferno crimson
          emissiveColor: '#FF0000',
          emissiveIntensity: 1.2,
          spinSpeed: 2.5,
          scale: 1.1,
        }
    }
  }, [level])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * spinSpeed
      groupRef.current.rotation.x = Math.sin(elapsed * 2) * 0.15 + tilt.y * 0.3
      groupRef.current.rotation.z = Math.cos(elapsed * 1.5) * 0.1 - tilt.x * 0.2
      // Pulsing flame vibration on highest level
      if (level >= 4) {
        const jitter = Math.sin(elapsed * 25) * 0.02
        groupRef.current.position.y = jitter
      } else {
        groupRef.current.position.y = Math.sin(elapsed * 2) * 0.05
      }
    }
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Chilli Stem (Green Cap) */}
      <group position={[0, 0.72, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.22, 16]} />
          <meshStandardMaterial color="#276749" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.22, 0.14, 16]} />
          <meshStandardMaterial color="#2F855A" roughness={0.3} />
        </mesh>
      </group>

      {/* Main Chilli Curved Body */}
      <mesh position={[0, 0.28, 0]}>
        <coneGeometry args={[0.24, 0.7, 32]} />
        <meshStandardMaterial
          color={bodyColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Middle curved section */}
      <mesh position={[0.04, -0.22, 0]} rotation={[0, 0, -0.15]}>
        <coneGeometry args={[0.2, 0.65, 32]} />
        <meshStandardMaterial
          color={bodyColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Tapered bottom curved tip */}
      <mesh position={[0.16, -0.62, 0]} rotation={[0, 0, -0.42]}>
        <coneGeometry args={[0.13, 0.5, 32]} />
        <meshStandardMaterial
          color={bodyColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.5}
          roughness={0.15}
        />
      </mesh>

      {/* Swirling Flame Heat Ring around Chilli */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.65, 0.02, 16, 48]} />
        <meshStandardMaterial
          color={level >= 4 ? '#FF2200' : level >= 3 ? '#FF8800' : '#48BB78'}
          emissive={level >= 4 ? '#FF0000' : '#FF9900'}
          emissiveIntensity={emissiveIntensity * 1.5}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  )
}

function SpiceEmbers({ level }: { level: number }) {
  const count = level * 14 + 10
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.2
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
      spd[i] = 0.01 + Math.random() * 0.02 * (level / 2)
    }
    return [pos, spd]
  }, [count, level])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 1.8) {
        arr[i * 3 + 1] = -1.5
        arr[i * 3] = (Math.random() - 0.5) * 2.0
      }
    }
    posAttr.needsUpdate = true
  })

  const emberColor = level >= 4 ? '#FF1E00' : level >= 3 ? '#FF8400' : '#48BB78'

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color={emberColor}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
