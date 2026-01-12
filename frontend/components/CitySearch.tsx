"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CitySearch({ map, setCenter }: any) {
  let [text, setText] = useState("");

  async function clickGo() {
    if (text == "") {
      return;
    }

    let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + text;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data && data.length > 0) {
        let firstResult = data[0];
        let lat = firstResult.lat;
        let lon = firstResult.lon;

        let latNum = Number(lat);
        let lonNum = Number(lon);

        if (map != null) {
          const L = (await import("leaflet")).default
          map.setView([latNum, lonNum], 12);
          setCenter(new L.LatLng(latNum, lonNum));
          setText("");
        }
      } else {
        alert("City not found, try again");
      }
    } catch (e) {
      console.log("something went wrong");
    }
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] flex gap-2 w-[300px]">
      <Input
        placeholder="Search for a city..."
        className="bg-white backdrop-blur-sm shadow-md"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            clickGo();
          }
        }}
      />
      <Button onClick={clickGo} className="shadow-md">
        Go
      </Button>
    </div>
  );
}
