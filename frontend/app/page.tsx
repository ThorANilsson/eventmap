"use client";

import { SimpleEvent } from "@/types/simpleEvent";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import EventDrawer from "@/components/EventDrawer/EventDrawer";
import {RightHandMenu} from "@/components/RightHandMenu";
import {filterEvents} from "@/lib/eventUtils";


const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [center, setCenter] = useState<L.LatLng | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("ALL");
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (newCenter: L.LatLng, newZoom: number) => {
    setCenter(newCenter);
    setZoom(newZoom);
  };
  
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubCategory(null);
  };

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSubCategory(newSubCategory);
  }
  
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  }

  function getCurrentRadius() {
    if(!map) return 0;
    const mapBoundNorthEast = map.getBounds().getNorthEast();
    const mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
    return Math.ceil(mapDistance / 1000);
  }

  const fetchEvents = async () => {
    try {
      /* setLoading(true);
      setError(null); */
      const res = await fetch(
        `http://localhost:5120/Events?Radius=${getCurrentRadius()}
                &Latitude=${center.lat}
                &Longitude=${center.lng}`
      );
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setEvents(data.events);
    } catch (err: any) {
      console.log(err);
      /* setError(err.message); */
    } finally {
      /* setLoading(false); */
    }
  };

  useEffect(() => {
    if (!map) return;

    fetchEvents();
  }, [map, center, zoom]);

  function handleMarkerClick(eventId: string) {
    setSelectedEventId(eventId);
    setDrawerOpen(true);
  }

  return (
      <div>
        <EventDrawer
            isOpen={drawerOpen}
            onOpenChange={setDrawerOpen}
            selectedEventId={selectedEventId}
        />
        <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
          <RightHandMenu
              center={center}
              zoom={zoom}
              radius={getCurrentRadius()}
              filterMenuProps={{
                selectedCategory: category,
                selectedSubCategory: subCategory || "",
                onCategoryChange: handleCategoryChange,
                onSubCategoryChange: handleSubCategoryChange,
              }}
              datePickerProps={{
                selectedDate: date,
                onDateChange: handleDateChange,
              }}
          />
          <div style={{ flex: 1 }}>
            <MapView
                events={filterEvents(events, category, subCategory, date)}
                onMapReady={setMap}
                onChange={handleChange}
                onEventClick={handleMarkerClick}
            />
          </div>
        </div>
      </div>
  );
}
