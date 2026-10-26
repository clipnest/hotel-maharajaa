'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { useMouseParallax } from '@/lib/utils/useMouseParallax'

/**
 * 3D Rotating Maharaja Typography & Royal Icon Scene.
 * Continuously rotates 360 degrees showcasing the royal Maharaja crest
 * with bold 3D embossed "MAHARAJA" lettering.
 */
export default function MaharajaScene() {
  return (
    <div className="w-full h-full flex items-center justify-center select-none">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        aria-hidden="true"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.5} color="#FFF5D6" />
        <pointLight position={[-3, 2, 3]} intensity={2.2} color="#FF9900" />
        <pointLight position={[3, -2, 2]} intensity={1.8} color="#FFD700" />
        <pointLight position={[0, -3, -2]} intensity={1.5} color="#FF6600" />

        <Suspense fallback={null}>
          <RotatingMaharajaGroup />
          <FloatingEmbers />
        </Suspense>
      </Canvas>
    </div>
  )
}

function RotatingMaharajaGroup() {
  const groupRef = useRef<THREE.Group>(null!)
  const tilt = useMouseParallax(0.08)

  // Generate crisp textures for front (English "MAHARAJA") and back (Marathi "महाराजा")
  const { frontTexture, backTexture } = useMemo(() => {
    return {
      frontTexture: createMaharajaTextTexture(false),
      backTexture: createMaharajaTextTexture(true),
    }
  }, [])

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    if (groupRef.current) {
      // 360-degree smooth continuous rotation
      groupRef.current.rotation.y = elapsed * 0.85
      // Gentle breathing hover
      groupRef.current.position.y = Math.sin(elapsed * 1.6) * 0.07
      // Interactive mouse tilt response
      groupRef.current.rotation.x = Math.sin(elapsed * 0.6) * 0.04 + tilt.y * 0.3
      groupRef.current.rotation.z = Math.cos(elapsed * 0.6) * 0.03 - tilt.x * 0.2
    }
  })

  // Gold metallic materials
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F5B82E',
        metalness: 0.95,
        roughness: 0.18,
      }),
    []
  )

  const rimGoldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFD700',
        metalness: 0.96,
        roughness: 0.12,
      }),
    []
  )

  return (
    <group ref={groupRef} scale={[0.88, 0.88, 0.88]}>
      {/* 1. Main 3D Royal Shield / Medallion Body (properly oriented along Z) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.12, 64]} />
        <primitive object={goldMaterial} attach="material" />
      </mesh>

      {/* Front Face: English 3D "MAHARAJA" + Royal Crest */}
      <mesh position={[0, 0, 0.065]}>
        <circleGeometry args={[1.31, 64]} />
        <meshBasicMaterial map={frontTexture} transparent />
      </mesh>

      {/* Back Face: Marathi 3D "हॉटेल महाराजा" + Royal Crest */}
      <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.31, 64]} />
        <meshBasicMaterial map={backTexture} transparent />
      </mesh>

      {/* Front Outer Gold Beveled Rim */}
      <mesh position={[0, 0, 0.065]}>
        <torusGeometry args={[1.33, 0.035, 16, 64]} />
        <primitive object={rimGoldMaterial} attach="material" />
      </mesh>

      {/* Back Outer Gold Beveled Rim */}
      <mesh position={[0, 0, -0.065]}>
        <torusGeometry args={[1.33, 0.035, 16, 64]} />
        <primitive object={rimGoldMaterial} attach="material" />
      </mesh>

      {/* 3D Coin Edge Studs / Ridges (40 ridges) */}
      <EdgeRidges radius={1.35} count={40} />

      {/* 2. 3D Royal Crown mounted on top of the medallion */}
      <RoyalCrown position={[0, 1.38, 0]} />
    </group>
  )
}

/**
 * 3D Ridges along the rim of the medallion.
 */
function EdgeRidges({ radius, count }: { radius: number; count: number }) {
  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      arr.push({ x, y, angle })
    }
    return arr
  }, [radius, count])

  return (
    <group>
      {items.map((r, i) => (
        <mesh key={i} position={[r.x, r.y, 0]} rotation={[0, 0, r.angle]}>
          <boxGeometry args={[0.018, 0.018, 0.11]} />
          <meshStandardMaterial color="#FFD700" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * 3D Royal Crown sitting on top of the rotating emblem.
 */
function RoyalCrown({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={[0.55, 0.55, 0.55]}>
      {/* Crown Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 0.1, 32]} />
        <meshStandardMaterial color="#FFB800" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* 5 Crown Peaks */}
      {[-0.36, -0.18, 0, 0.18, 0.36].map((x, i) => {
        const height = i === 2 ? 0.42 : i === 1 || i === 3 ? 0.32 : 0.24
        const y = 0.1 + height / 2
        return (
          <group key={i} position={[x, y, 0]}>
            <mesh>
              <coneGeometry args={[0.07, height, 16]} />
              <meshStandardMaterial color="#FFC820" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Jewel Top */}
            <mesh position={[0, height / 2 + 0.035, 0]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshStandardMaterial
                color={i === 2 ? '#FF1133' : '#FFF090'}
                emissive={i === 2 ? '#FF0022' : '#FFAA00'}
                emissiveIntensity={0.7}
                metalness={0.3}
                roughness={0.1}
              />
            </mesh>
          </group>
        )
      })}

      {/* Center Crown Ruby */}
      <mesh position={[0, 0.05, 0.58]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#FF0033"
          emissive="#FF0033"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

/**
 * Floating Golden Ember Sparkles.
 */
function FloatingEmbers() {
  const count = 35
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.0
      spd[i] = 0.007 + Math.random() * 0.012
    }
    return [pos, spd]
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 2.0) {
        arr[i * 3 + 1] = -2.0
        arr[i * 3] = (Math.random() - 0.5) * 3.8
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFA820"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * High-definition Texture for the 3D Rotating Maharaja Face.
 * Draws rich golden background, royal Maharaja turban & moustache crest,
 * and high-contrast bold 3D "MAHARAJA" text.
 */
function createMaharajaTextTexture(isHindi: boolean): THREE.CanvasTexture {
  if (typeof document === 'undefined') {
    return new THREE.Texture() as unknown as THREE.CanvasTexture
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  const cx = 512
  const cy = 512

  // 1. Rich Warm Dark Amber Vignette (warm, radiant, not pitch black)
  const bgGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, 500)
  bgGrad.addColorStop(0, '#3A1E08')
  bgGrad.addColorStop(0.5, '#221004')
  bgGrad.addColorStop(0.85, '#120702')
  bgGrad.addColorStop(1, '#0A0401')
  ctx.fillStyle = bgGrad
  ctx.beginPath()
  ctx.arc(cx, cy, 504, 0, Math.PI * 2)
  ctx.fill()

  // 2. Concentric Gold Borders
  ctx.lineWidth = 8
  ctx.strokeStyle = '#F5B82E'
  ctx.beginPath()
  ctx.arc(cx, cy, 480, 0, Math.PI * 2)
  ctx.stroke()

  ctx.lineWidth = 2.5
  ctx.strokeStyle = '#FFF099'
  ctx.beginPath()
  ctx.arc(cx, cy, 464, 0, Math.PI * 2)
  ctx.stroke()

  // Decorative Golden Studs
  for (let i = 0; i < 48; i++) {
    const angle = (i / 48) * Math.PI * 2
    const dx = cx + Math.cos(angle) * 448
    const dy = cy + Math.sin(angle) * 448
    ctx.fillStyle = i % 2 === 0 ? '#FFEAA7' : '#D49012'
    ctx.beginPath()
    ctx.arc(dx, dy, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  // 3. Royal Maharaja Safaa (Turban) & Feather Crest at top
  drawMaharajaIcon(ctx, cx, 300)

  // 4. "HOTEL" / "हॉटेल"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '700 42px "Outfit", "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = '#FFCA42'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 10
  ctx.letterSpacing = '12px'
  ctx.fillText(isHindi ? 'हॉटेल' : 'HOTEL', cx, 445)

  // 5. Huge, Bold Minimal 3D "MAHARAJA" Typography
  const primaryText = isHindi ? 'महाराजा' : 'MAHARAJA'
  const mainFont = isHindi
    ? '900 135px "Outfit", "Plus Jakarta Sans", sans-serif'
    : '900 128px "Outfit", "Plus Jakarta Sans", sans-serif'

  ctx.font = mainFont
  ctx.letterSpacing = isHindi ? '6px' : '10px'

  // Deep 3D Raised Extrusion Shadow Layers (gives unmistakable 3D relief)
  const extrusionLayers = 10
  for (let s = extrusionLayers; s >= 1; s--) {
    ctx.fillStyle = `rgb(${75 - s * 4}, ${38 - s * 2}, ${8})`
    ctx.fillText(primaryText, cx, 555 + s * 2.4)
  }

  // Gleaming Gold Metallic Gradient Face
  const textGrad = ctx.createLinearGradient(0, 480, 0, 600)
  textGrad.addColorStop(0, '#FFFFFF')
  textGrad.addColorStop(0.2, '#FFEFA8')
  textGrad.addColorStop(0.45, '#F5B82E')
  textGrad.addColorStop(0.75, '#FFF2B2')
  textGrad.addColorStop(1, '#C77D0A')

  ctx.fillStyle = textGrad
  ctx.shadowColor = 'rgba(255, 215, 0, 0.75)'
  ctx.shadowBlur = 24
  ctx.fillText(primaryText, cx, 555)

  // Crisp Golden Stroke Outline
  ctx.lineWidth = 3
  ctx.strokeStyle = '#FFF8D6'
  ctx.strokeText(primaryText, cx, 555)

  // 6. Ornamental Gold Star Divider
  ctx.shadowBlur = 0
  ctx.strokeStyle = '#F5B82E'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo(cx - 220, 640)
  ctx.lineTo(cx - 40, 640)
  ctx.moveTo(cx + 40, 640)
  ctx.lineTo(cx + 220, 640)
  ctx.stroke()

  ctx.fillStyle = '#FFE27A'
  ctx.font = '28px serif'
  ctx.fillText('★', cx, 642)

  // 7. Subtitle
  const subText = isHindi ? 'तृप्त मन, स्वादिष्ट क्षण..!' : 'VEG & NON-VEG DHABA'
  ctx.font = '600 32px "Plus Jakarta Sans", "Outfit", sans-serif'
  ctx.letterSpacing = '4px'
  ctx.fillStyle = '#FFDE7A'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 6
  ctx.fillText(subText, cx, 705)

  // 8. Location Tag
  const locText = isHindi ? 'गुरेवाडी फाटा • सिन्नर' : 'SINNAR • NASHIK HIGHWAY'
  ctx.font = '600 22px "Plus Jakarta Sans", "Outfit", sans-serif'
  ctx.letterSpacing = '5px'
  ctx.fillStyle = '#BA8730'
  ctx.shadowBlur = 4
  ctx.fillText(locText, cx, 775)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Draws the Royal Maharaja Safaa (Turban), Kalgi Feather & Curled Moustache.
 */
function drawMaharajaIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save()
  ctx.translate(cx, cy)

  // 1. Royal Kalgi Plume (Feather)
  const kalgiGrad = ctx.createLinearGradient(0, -110, 0, -50)
  kalgiGrad.addColorStop(0, '#FFF2A6')
  kalgiGrad.addColorStop(0.5, '#FF9900')
  kalgiGrad.addColorStop(1, '#D94400')
  ctx.fillStyle = kalgiGrad
  ctx.beginPath()
  ctx.moveTo(0, -110)
  ctx.quadraticCurveTo(22, -80, 0, -50)
  ctx.quadraticCurveTo(-22, -80, 0, -110)
  ctx.fill()

  // Kalgi Brooch Ruby
  ctx.fillStyle = '#FF0033'
  ctx.beginPath()
  ctx.arc(0, -50, 9, 0, Math.PI * 2)
  ctx.fill()

  // 2. Royal Safaa / Pheta (Turban)
  const safaaGrad = ctx.createLinearGradient(-80, -45, 80, 20)
  safaaGrad.addColorStop(0, '#FFD15C')
  safaaGrad.addColorStop(0.35, '#F5A018')
  safaaGrad.addColorStop(0.7, '#D46B08')
  safaaGrad.addColorStop(1, '#8C3500')
  ctx.fillStyle = safaaGrad
  ctx.beginPath()
  ctx.ellipse(0, -16, 80, 42, 0, 0, Math.PI * 2)
  ctx.fill()

  // Gold Folds / Zari Borders
  ctx.strokeStyle = '#FFF0A0'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(0, -14, 62, 0.25, Math.PI - 0.25)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, -24, 52, 0.35, Math.PI - 0.35)
  ctx.stroke()

  // 3. Royal Curled Moustache (Maharashtrian Peshwa Style)
  const moustGrad = ctx.createLinearGradient(-75, 25, 75, 25)
  moustGrad.addColorStop(0, '#FFE066')
  moustGrad.addColorStop(0.5, '#FFF6CC')
  moustGrad.addColorStop(1, '#FFE066')
  ctx.fillStyle = moustGrad

  // Left curl
  ctx.beginPath()
  ctx.moveTo(0, 18)
  ctx.bezierCurveTo(-25, 8, -55, 8, -75, -5)
  ctx.bezierCurveTo(-80, 12, -55, 32, 0, 32)
  ctx.fill()

  // Right curl
  ctx.beginPath()
  ctx.moveTo(0, 18)
  ctx.bezierCurveTo(25, 8, 55, 8, 75, -5)
  ctx.bezierCurveTo(80, 12, 55, 32, 0, 32)
  ctx.fill()

  ctx.restore()
}
