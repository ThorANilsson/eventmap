import { SimpleEvent } from "@/types/simpleEvent";
import { Calendar, ExternalLink, MapPin, Tag } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EventBasics({
  eventBasics,
}: {
  eventBasics: SimpleEvent;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold">{eventBasics.name}</h1>

      {eventBasics.date && (
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border">
            <Calendar className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Date
            </span>
            <span className="text-base font-medium text-foreground">
              {new Date(eventBasics.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(eventBasics.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      )}

      {eventBasics.venueName && (
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border">
            <MapPin className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Venue
            </span>
            {eventBasics.venueName && (
              <span className="text-base font-medium text-foreground">
                {eventBasics.venueName}
              </span>
            )}
          </div>
        </div>
      )}

      {eventBasics.category && (
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary border">
            <Tag className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Event type
            </span>
            <div className="flex flex-wrap">
              <span className="text-base font-medium text-foreground">
                {eventBasics.category}
                {eventBasics.genre != null ? ` (${eventBasics.genre})` : null}
              </span>
            </div>
          </div>
        </div>
      )}

      {eventBasics.eventUrl && (
        <Button
          asChild
          size="lg"
          className="bg-[#0157B6] hover:bg-[#0157B6] hover:opacity-90"
        >
          <Link href={eventBasics.eventUrl} target="_blank">
            <span>View on Ticketmaster</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
