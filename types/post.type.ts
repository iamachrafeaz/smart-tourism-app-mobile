export interface Post {
    id: string;
    name: string;
    photo: string;
    isGuide: boolean;
    question: string;
    replies?: { id: string, photo: string, name: string, answer: string, isGuide: boolean, timestamp: string }[];
    repliesCount?: number;
    tags: "CULTURE" | "ETHICS" | "TRADITIONS";
    topic: "AFCON" | "RAMADAN_2026" | "LOCAL_MARKET";
    likes: number;
    hasLiked: boolean;
    timestamp: string;
}
