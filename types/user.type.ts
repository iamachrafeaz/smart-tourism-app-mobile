export interface User {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl: string;
}

export type UserRole = "GUIDE" | "TOURIST"
