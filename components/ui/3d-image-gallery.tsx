"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X } from "lucide-react"

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { id: "1",  imageUrl: "https://i.ibb.co/7JTDZWN1/Whats-App-Image-2026-06-07-at-20-09-27-3.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "2",  imageUrl: "https://i.ibb.co/4Rmckx6h/Whats-App-Image-2026-06-07-at-20-09-28.jpg",    alt: "Kairos", title: "Kairos" },
    { id: "3",  imageUrl: "https://i.ibb.co/czx4nG9/Whats-App-Image-2026-06-07-at-20-09-28-1.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "4",  imageUrl: "https://i.ibb.co/JwtYbDJ2/Whats-App-Image-2026-06-07-at-20-09-28-2.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "5",  imageUrl: "https://i.ibb.co/999NVryS/Whats-App-Image-2026-06-07-at-20-09-29-2.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "6",  imageUrl: "https://i.ibb.co/ZRKYz1Px/Whats-App-Image-2026-06-07-at-20-09-29-3.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "7",  imageUrl: "https://i.ibb.co/G3GhDZfS/Whats-App-Image-2026-06-07-at-20-09-30.jpg",    alt: "Kairos", title: "Kairos" },
    { id: "8",  imageUrl: "https://i.ibb.co/M554VkDm/Whats-App-Image-2026-06-07-at-20-09-30-1.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "9",  imageUrl: "https://i.ibb.co/ksDvvCHR/Whats-App-Image-2026-06-07-at-20-09-30-2.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "10", imageUrl: "https://i.ibb.co/5WV1bYd6/Whats-App-Image-2026-06-07-at-20-09-31-2.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "11", imageUrl: "https://i.ibb.co/tMmqYf3z/Whats-App-Image-2026-06-07-at-20-09-32.jpg",    alt: "Kairos", title: "Kairos" },
    { id: "12", imageUrl: "https://i.ibb.co/ZzcsY5mG/Whats-App-Image-2026-06-07-at-20-09-31-1.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "13", imageUrl: "https://i.ibb.co/vCm7Ln8F/Whats-App-Image-2026-06-07-at-20-09-29.jpg",    alt: "Kairos", title: "Kairos" },
    { id: "14", imageUrl: "https://i.ibb.co/3yJ7MP9x/Whats-App-Image-2026-06-07-at-20-09-27-1.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "15", imageUrl: "https://i.ibb.co/5Xq4LtW0/Whats-App-Image-2026-06-07-at-20-09-27.jpg",   alt: "Kairos", title: "Kairos" },
    { id: "16", imageUrl: "https://i.ibb.co/Zp2h4P2Q/Whats-App-Image-2026-06-07-at-20-09-29-1.jpg",  alt: "Kairos", title: "Kairos" },
    { id: "17", imageUrl: "https://i.ibb.co/gMrqpmvL/Whats-App-Image-2026-06-07-at-20-09-31.jpg",    alt: "Kairos", title: "Kairos" },
    { id: "18", imageUrl: "https://i.ibb.co/DHBpfVjP/Whats-App-Image-2026-06-07-at-20-09-27-2.jpg",  alt: "Kairos", title: "Kairos" },
  ]

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.5, 6]}
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer" }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "auto" }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#1F2121] p-3 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(233,30,140,0.5), 0 0 30px rgba(233,30,140,0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(233,30,140,0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const [isFavorited, setIsFavorited] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="relative max-w-md w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[16px] bg-[#1F2121] p-4 transition-all duration-500 ease-out w-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-4" style={{ aspectRatio: "3 / 4" }}>
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px", opacity: 1 }}
              />
            </div>

            <h3 className="text-white text-lg font-semibold mb-4 text-center">{selectedCard.title}</h3>

            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl text-sm font-medium text-white outline-none transition duration-300 ease-out hover:scale-[1.02] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, rgba(233,30,140,0.6), rgba(194,24,91,0.4))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 4px 24px rgba(233,30,140,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-50%",
                    width: "200%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                />
                <div className="flex items-center gap-1.5" style={{ position: "relative", zIndex: 1 }}>
                  <Download className="h-4 w-4" strokeWidth={1.8} />
                  <span>Download</span>
                </div>
              </button>
              <button
                type="button"
                onClick={toggleFavorite}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white outline-none transition duration-300 ease-out hover:scale-105 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, rgba(233,30,140,0.6), rgba(194,24,91,0.4))",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 4px 24px rgba(233,30,140,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-50%",
                    width: "200%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                />
                <Heart className="h-4 w-4" strokeWidth={1.8} fill={isFavorited ? "currentColor" : "none"} style={{ position: "relative", zIndex: 1 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number; y: number; z: number
      rotationX: number; rotationY: number; rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E91E8C" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E91E8C" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E91E8C" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-full relative overflow-hidden bg-black" style={{ height: "100vh" }}>
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={40}
              autoRotate={true}
              autoRotateSpeed={0.8}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.7rem",
              fontFamily: "'Fira Code', monospace",
              letterSpacing: "0.1em",
            }}
          >
            drag to look around &bull; scroll to zoom &bull; click a card
          </p>
        </div>
      </div>
    </CardProvider>
  )
}
