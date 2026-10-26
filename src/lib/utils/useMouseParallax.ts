'use client'

import { useRef, useEffect, useState } from 'react'

/**
 * Returns normalised mouse parallax values in [-1, 1] range.
 * `strength` controls the maximum offset.
 */
export function useMouseParallax(strength = 0.1) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2 * strength
      const y = (e.clientY / window.innerHeight - 0.5) * 2 * strength
      setTilt({ x, y })
    }
    const onDevice = (e: DeviceOrientationEvent) => {
      const x = ((e.gamma ?? 0) / 45) * strength
      const y = ((e.beta  ?? 0) / 45) * strength
      setTilt({ x, y })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('deviceorientation', onDevice, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('deviceorientation', onDevice)
    }
  }, [strength])

  return tilt
}
