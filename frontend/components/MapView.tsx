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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
            key={event.id}
            position={[latitude, longitude]}
            icon={TicketmasterIcon}
          >
            <Popup className="min-w-[300px] p-0 border-none rounded-xl overflow-hidden">
              <Card className="w-64 border-none shadow-none rounded-none">
                
                {event.imageUrl && (
                  <div className="h-32 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={event.imageUrl}
                      alt={event.name ?? "Event"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">
                    {event.name ?? "Unknown Event"}
                  </CardTitle>
                  
                  <CardDescription>
                    <div className="font-medium text-black dark:text-white">
                      {event.venueName ?? "Unknown Venue"}
                    </div>
                    {event.date && (
                      <div className="text-xs mt-1">
                        {new Date(event.date).toLocaleString()}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0 flex gap-2">
                  {event.category && (
                    <Badge variant="secondary">{event.category}</Badge>
                  )}
                  {event.genre && (
                    <Badge variant="outline">{event.genre}</Badge>
                  )}
                </CardContent>

                {event.eventUrl && (
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      asChild 
                      className="w-full text-white" 
                      size="sm"
                    >
                      <a href={event.eventUrl} target="_blank" className="!text-white" >
                        Book Ticket
                      </a>
                    </Button>
                  </CardFooter>
                )}

              </Card>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}