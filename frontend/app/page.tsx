"use client";

import { SimpleEvent } from "@/types/simpleEvent";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {FilterMenu} from "@/components/FilterMenu";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [center, setCenter] = useState<L.LatLng | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  
  const [category, setCategory] = useState<string>("ALL");
  const [subCategory, setSubCategory] = useState<string | null>(null);

  const handleChange = (newCenter: L.LatLng, newZoom: number) => {
    setCenter(newCenter);
    setZoom(newZoom);
  };
  
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubCategory(null);
  }
  
  /* Add filter logic for different categories*/

  function getCurrentRadius() {
    var mapBoundNorthEast = map.getBounds().getNorthEast();
    var mapDistance = mapBoundNorthEast.distanceTo(map.getCenter());
    return Math.ceil(mapDistance / 1000);
  }

  const fetchEvents = async () => {
    try {
      /* setLoading(true);
      setError(null); */
      const res = await fetch(
        `http://localhost:5120/Events?Radius=${getCurrentRadius()}&Latitude=${
          center.lat
        }&Longitude=${center.lng}`
      );
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      setEvents([]);
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

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>

      <FilterMenu 
          center={center} 
          zoom={zoom} 
          radius={map ? getCurrentRadius() : 0} 
          selectedCategory={category}
          selectedSubCategory={subCategory}
          onCategoryChange={handleCategoryChange}
          onSubCategoryChange={setSubCategory}
      />
      
      <div style={{ flex: 1 }}>
        <MapView events={events} onMapReady={setMap} onChange={handleChange} />
      </div>
    </div>
  );
}