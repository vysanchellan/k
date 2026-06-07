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

  if (!selectedCard) return null

  const toggleFavorite = () => setIsFavorited((v) => !v)
  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md" onClick={handleBackdropClick}>
      <div
        style={{
          position: "relative",
          width: "92vw",
          maxWidth: 500,
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: -16,
            right: -8,
            zIndex: 10,
            background: "linear-gradient(135deg, rgba(233,30,140,0.3), rgba(194,24,91,0.2))",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(233,30,140,0.5), rgba(194,24,91,0.3))";
            e.currentTarget.style.borderColor = "rgba(233,30,140,0.4)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(233,30,140,0.3), rgba(194,24,91,0.2))";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ✕
        </button>

        <div
          style={{
            width: "100%",
            borderRadius: 24,
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(25,25,35,0.96), rgba(10,10,20,0.98))",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <img
              loading="lazy"
              alt={selectedCard.alt}
              src={selectedCard.imageUrl || "/placeholder.svg"}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "68vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              padding: "14px 22px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(0deg, rgba(0,0,0,0.3), transparent)",
            }}
          >
            <h3
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.85rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                letterSpacing: "0.04em",
              }}
            >
              {selectedCard.title}
            </h3>

            <button
              type="button"
              onClick={toggleFavorite}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.4rem",
                lineHeight: 1,
                padding: "2px 6px",
                color: isFavorited ? "#E91E8C" : "rgba(255,255,255,0.25)",
                textShadow: isFavorited ? "0 0 16px rgba(233,30,140,0.5)" : "none",
                transition: "all 0.3s ease",
                borderRadius: 8,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              ♥
            </button>
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
