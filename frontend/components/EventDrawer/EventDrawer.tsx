"use client";

import { ExpandedEvent } from "@/types/expandedEvent";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import EventBasics from "./EventBasics";
import WikipediaSummaryCard from "./WikipediaSummaryCard";
import { Loader2 } from "lucide-react";
import { baseUrl } from "@/lib/apiConfig";

// Foundation for this component pulled from https://vaul.emilkowal.ski/default#side-drawer

export default function EventDrawer({
  selectedEventId,
  isOpen,
  onOpenChange,
}: {
  selectedEventId: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [event, setEvent] = useState<ExpandedEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/Events/${eventId}`);
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setEvent(data);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedEventId) {
      setEvent(null);
      return;
    }
    fetchEvent(selectedEventId);
  }, [selectedEventId]);

  return (
    <Drawer.Root direction="right" open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-[9999] outline-none w-lg flex" // z-[9999] is ugly but makes it so drawer appears above map
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center h-full items-center">
                <Loader2 className="animate-spin h-12 w-12" color="#0157B6" />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <EventBasics eventBasics={event.basics} />
                {event.wikipedia != null ? (
                  <WikipediaSummaryCard wikipedia={event.wikipedia} />
                ) : null}
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
