"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapViewProps {
  onMapReady: (map: L.Map) => void;
  onChange: (center: L.LatLng, zoom: number) => void;
}

interface MapEventsProps {
  onChange: (center: L.LatLng, zoom: number) => void;
}

function MapEvents({ onChange }: MapEventsProps) {
  const handle = (map: L.Map) => {
    const c = map.getCenter();
    const center = L.latLng(Number(c.lat.toFixed(3)), Number(c.lng.toFixed(3)));
    const zoom = map.getZoom();
    onChange(center, zoom);
  };

  useMapEvents({
    moveend() {
      handle(this);
    },
    zoomend() {
      handle(this);
    },
  });

  return null;
}

function MapInitializer({ onMapReady }) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  return null;
}

export default function MapView({ onMapReady, onChange }: MapViewProps) {
  return (
    <MapContainer
      center={[55.5963028544093, 13.010988504445788]}
      zoom={13}
      minZoom={8}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      <MapInitializer onMapReady={onMapReady} />
      <MapEvents onChange={onChange} />
    </MapContainer>
  );
}
