"use client"

import dynamic from "next/dynamic"

// Loads in Leaflet in Next.js
const MapView = dynamic(() => import("@/components/map-view"), { ssr: false })

export default function Home() {
  return (
    <div className="h-screen w-full bg-black">
      <MapView />
    </div>
  )
}