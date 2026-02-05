export interface Guide {
    id: string;
    name: string;
    photo: string;
    languages: string[];
    price: number;
    rating: number;
    verified: boolean;
    expertise: string[];
    bio: string;
    availability: boolean,
    certifications: { name: string; icon: React.ComponentType<any> }[];
    reviews: Array<{
        id: number;
        author: string;
        rating: number;
        comment: string;
        date: string;
    }>;
    tours: Array<{
        name: string;
        duration: string;
        price: number;
    }>;
    verificationStatus: GuideVerificationStatus
}

export type GuideVerificationStatus = "PENDING" | "REFUSED" | "APPROVED" | "UNVERIFIED"