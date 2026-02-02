import { UserRoleEnum } from "@/types/user.type";
import axiosInstance from "./axiosInstance";

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email,
            password
        });

        return response.data;
    } catch (error: any) {
        throw error.response.data.error
    }
}

export const getMeRequest = async () => {
    try {
        const response = await axiosInstance.get('/users/me');
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const startRegisteringRequest = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/auth/register/start', {
            email, password
        });

        return response.data as {
            success: boolean,
            data: {
                registrationToken: string,
                registrationState: string
            }
        };
    } catch (error: any) {
        throw error.response.data.error
    }
}

export const verifyEmailRequest = async (registrationToken: string, otp: string) => {
    try {
        const response = await axiosInstance.post('/auth/register/verify-email', {
            registrationToken, otp
        });

        return response.data as {
            success: boolean,
            data: {
                registrationState: string
            }
        };
    } catch (error: any) {
        throw error.response.data.error
    }
}

export const resendOtpRequest = async (registrationToken: string) => {
    try {
        const response = await axiosInstance.post('/auth/register/resend-otp', {
            registrationToken
        });

        return response.data;
    } catch (error: any) {
        throw error.response.data.error
    }
}

export const completeProfileRequest = async (formData: any) => {
    try {
        const response = await axiosInstance.post('/auth/register/profile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        throw error.response.data.error
    }
}

export const chooseRoleRequest = async (registrationToken: string, role: UserRoleEnum) => {
    try {
        const response = await axiosInstance.post('/auth/register/choose-role', {
            registrationToken,
            role: UserRoleEnum[role]
        });

        return response.data;
    } catch (error: any) {
        throw error.response.data.error
    }
}