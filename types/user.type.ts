export interface User {
    id: string;
    role: "GUIDE" | "TOURIST";
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl: string;
}