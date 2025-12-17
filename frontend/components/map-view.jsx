"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { getEvents } from "./getEvents"

// Fix for default markers not showing up (Apperently a common bug in react-leaflet where it fails to load)
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

function LocationPin() {
    const [position, setPosition] = useState(null)
    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 12)
        })
    }, [map])

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>I have found u :)</Popup>
        </Marker>
    )
}

function TrackCenter({ onCenterChange }) {
    const map = useMap()

    useEffect(() => {
        onCenterChange?.(map.getCenter())
    }, [map, onCenterChange])

    useMapEvents({
        moveend: () => onCenterChange?.(map.getCenter()),
        zoomend: () => onCenterChange?.(map.getCenter()),
    })

    return null
}

export default function MapView() {
    const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 })
    const [isCalling, setIsCalling] = useState(false)

    async function handleTestApi() {
        try {
            setIsCalling(true)
            await getEvents(center.lat, center.lng)
        } finally {
            setIsCalling(false)
        }
    }

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <TrackCenter onCenterChange={setCenter} />
                <LocationPin />
            </MapContainer>

            <div
                style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    zIndex: 1000,
                    background: "rgba(0,0,0,0.65)",
                    padding: 10,
                    borderRadius: 10,
                    color: "white",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                }}
            >
                <button
                    onClick={handleTestApi}
                    disabled={isCalling}
                    style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.25)",
                        background: isCalling ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.18)",
                        color: "white",
                        cursor: isCalling ? "not-allowed" : "pointer",
                    }}
                >
                    {isCalling ? "Calling..." : "Test API (map center)"}
                </button>

                <span style={{ fontSize: 12, opacity: 0.9 }}>
          lat: {center.lat.toFixed(5)}, lng: {center.lng.toFixed(5)}
        </span>
            </div>
        </div>
    )
}