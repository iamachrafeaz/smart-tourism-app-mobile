export interface User {
    id: string;
    role: UserRoleEnum;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl: string;
}

export enum UserRoleEnum {
    "GUIDE",
    "TOURIST"
}