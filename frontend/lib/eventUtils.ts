import { SimpleEvent } from "@/types/simpleEvent";
import L from "leaflet";

export interface GroupedEvent {
    location: L.LatLng;
    events: SimpleEvent[];
}

export function groupedEventsByLocation(events: SimpleEvent[]): GroupedEvent[] {
    const groups: { [key: string]: { location: L.LatLng; events: SimpleEvent[] } } = {};

    events.forEach(event => {
        if(!event.location?.longitude || !event.location?.latitude) return;

        const key = `${event.location.longitude},${event.location.latitude}`;
        if(!groups[key]) {
            groups[key] = {
                location: L.latLng(
                    parseFloat(event.location.latitude), 
                    parseFloat(event.location.longitude)
                ), 
                events: [],
            };
        }
        groups[key].events.push(event);
    });
    return Object.values(groups);
}

export function filterEventsByCategory(events: SimpleEvent[], category: string, subCategory: string): SimpleEvent[] {
    return events.filter(e => {
        /*Temporary consol log to find all categories*/
        console.log(e.name);
        console.log(e.category);
        console.log(e.genre);
        console.log(" ");
        const categoryMatch = e.category === category;
        if(!subCategory) {
            return categoryMatch;
        }
        const subCategoryMatch = e.genre === subCategory;
        return categoryMatch && subCategoryMatch;
    });
}