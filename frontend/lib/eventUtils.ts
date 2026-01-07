import { SimpleEvent } from "@/types/simpleEvent";


function filterEventsByCategory(events: SimpleEvent[], category: string, subCategory: string): SimpleEvent[] {
    if(!category || category === "ALL") {
        return events;
    }
    
    return events.filter(e => {
        /*Temporary consol log to find all categories*/
        console.log(e.name);
        console.log(e.category);
        console.log(e.genre);
        console.log(e.date);
        console.log(" ");
        const categoryMatch = e.category === category;
        if(!subCategory) {
            return categoryMatch;
        }
        const subCategoryMatch = e.genre === subCategory;
        return categoryMatch && subCategoryMatch;
    });
}

function filterEventsByDate(events: SimpleEvent[], date: Date,): SimpleEvent[] {
    if(!date) return events;
    
    const filteredEvents: SimpleEvent[] = [];
    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        if(eventDate.getTime() === searchDate.getTime()) {
            filteredEvents.push(event);
        }
    })
    
    return filteredEvents;
}

export function filterEvents(events: SimpleEvent[], category: string, subCategory: string, date: Date): SimpleEvent[] {
    const filteredByCategory: SimpleEvent[] = filterEventsByCategory(events, category, subCategory);
    return filterEventsByDate(filteredByCategory, date);
}