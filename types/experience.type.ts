
export default interface Experience {
    id: number;
    name: string;
    type: string;
    image: string;
    rating: number;
    crowdLevel: "LOW" | "MODERATE" | "HIGH";
    sustainable: boolean;
    description: string;
    distance: string;
    coordinates: { lat: number; lng: number };
    tips: string[],
    accessType: "PUBLIC" | "PRIVATE",
    address: string,
}
