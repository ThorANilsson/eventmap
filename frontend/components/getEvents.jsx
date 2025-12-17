export async function getEvents(lat, lng) {
    const url = "http://localhost:5120/Events?lat=" + lat + "&lng=" + lng;

    let response = await fetch(url);
    console.log(response.json());
}