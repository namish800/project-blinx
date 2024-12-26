"use client"

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3 } from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uScatter;
  attribute vec3 originalPosition;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    
    if (uScatter > 0.0) {
      pos = originalPosition + normalize(originalPosition) * uScatter * 2.0;
    }

    float angle = uTime * 0.2;
    mat3 rotationMatrix = mat3(
      cos(angle), 0.0, sin(angle),
      0.0, 1.0, 0.0,
      -sin(angle), 0.0, cos(angle)
    );
    pos = rotationMatrix * pos;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 4.0 / -mvPosition.z;

    vColor = vec3(0.984, 0.369, 0.373);
  }
`

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    float alpha = 1.0 - smoothstep(0.75, 1.0, r);
    gl_FragColor = vec4(vColor, alpha * 0.5);  // Reduced opacity
  }
`

function Globe() {
  const meshRef = useRef<THREE.Points>(null)
  const hoverRef = useRef(false)
  const scatterRef = useRef(0)
  const { size, camera } = useThree()
  
  const [positions, colors] = useMemo(() => {
    const positions = []
    const colors = []
    const numPoints = 3000  // Reduced number of points
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)
      positions.push(x, y, z)
      colors.push(1, 1, 1)
    }
    return [new Float32Array(positions), new Float32Array(colors)]
  }, [])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScatter: { value: 0 },
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime
      
      if (hoverRef.current) {
        scatterRef.current = Math.min(scatterRef.current + 0.01, 1)
      } else {
        scatterRef.current = Math.max(scatterRef.current - 0.01, 0)
      }
      uniforms.uScatter.value = scatterRef.current
    }
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouse = new Vector3(
        (event.clientX / size.width) * 2 - 1,
        -(event.clientY / size.height) * 2 + 1,
        0.5
      )
      mouse.unproject(camera)
      const raycaster = new THREE.Raycaster(camera.position, mouse.sub(camera.position).normalize())
      const intersects = raycaster.intersectObject(meshRef.current!)
      hoverRef.current = intersects.length > 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [camera, size])

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-originalPosition"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        vertexColors
      />
    </points>
  )
}

export default function GlobeScatter() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} color="#fb5e5f" intensity={0.5} />
        <Globe />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

