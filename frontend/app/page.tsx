"use client";

import { SimpleEvent } from "@/types/simpleEvent";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import EventDrawer from "@/components/EventDrawer/EventDrawer";
import { filterEvents } from "@/lib/eventUtils";
import { AppSidebar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { baseUrl } from "@/lib/apiConfig";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [center, setCenter] = useState<L.LatLng | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("All");
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
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  function getCurrentRadius() {
    if (!map) return 0;
    const mapBoundNorthEast = map.getBounds().getNorthEast();
    const mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
    return Math.ceil(mapDistance / 1000);
  }

  const fetchEvents = async () => {
    try {
      /* setLoading(true);
      setError(null); */
      const res = await fetch(
        `${baseUrl}/Events?Radius=${getCurrentRadius()}
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
    <SidebarProvider>
      <div>
        <EventDrawer
          isOpen={drawerOpen}
          onOpenChange={setDrawerOpen}
          selectedEventId={selectedEventId}
        />
        <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
          <div>
            <AppSidebar
              selectedCategory={category}
              selectedSubCategory={subCategory || ""}
              onCategoryChange={handleCategoryChange}
              onSubCategoryChange={handleSubCategoryChange}
              datePickerProps={{
                selectedDate: date,
                onDateChange: handleDateChange,
              }}
            />
          </div>
          <main className="flex-1 relative flex flex-col min-w-0">
            <div className="absolute top-4 left-4 z-1000">
              <SidebarTrigger className="bg-zinc-100 shadow-md hover:bg-zinc-400" />
            </div>

            <div className="flex flex-1 h-full">
              <MapView
                events={filterEvents(events, category, subCategory, date)}
                onMapReady={setMap}
                onChange={handleChange}
                onEventClick={handleMarkerClick}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
