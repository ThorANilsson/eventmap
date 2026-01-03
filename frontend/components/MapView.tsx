"use client";

import { useEffect } from "react";
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
import { SimpleEvent } from "@/types/simpleEvent";
import TicketmasterIcon from "./TicketmasterIcon";

interface MapViewProps {
  events: SimpleEvent[];
  onMapReady: (map: L.Map) => void;
  onChange: (center: L.LatLng, zoom: number) => void;
}

interface MapEventsProps {
  onChange: (center: L.LatLng, zoom: number) => void;
}

function getMapState(map: L.Map) {
  const c = map.getCenter();
  return {
    center: L.latLng(Number(c.lat.toFixed(3)), Number(c.lng.toFixed(3))),
    zoom: map.getZoom(),
  };
}

function MapEvents({ onChange }: MapEventsProps) {
  const handle = (map: L.Map) => {
    let mapState = getMapState(map);
    onChange(mapState.center, mapState.zoom);
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

function MapInitializer({ onMapReady, onChange }) {
  const map = useMap();

  useEffect(() => {
    onMapReady(map);
    let mapState = getMapState(map);
    onChange(mapState.center, mapState.zoom);
  }, [map, onMapReady]);

  return null;
}

export default function MapView({
  events,
  onMapReady,
  onChange,
}: MapViewProps) {
  return (
    <MapContainer
      center={[55.5963028544093, 13.010988504445788]}
      zoom={13}
      minZoom={8}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      <MapInitializer onChange={onChange} onMapReady={onMapReady} />
      <MapEvents onChange={onChange} />

      {events.map((event: SimpleEvent) => {
        if (event.location == null) {
          return;
        }

        const latitude = parseFloat(event.location.latitude);
        const longitude = parseFloat(event.location.longitude);

        return (
          <Marker
            key={Math.random()}
            position={[latitude, longitude]}
            icon={TicketmasterIcon}
          >
            <Popup>{event.name ?? "Unknown event name"}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
