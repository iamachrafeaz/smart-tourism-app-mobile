import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN = "access_token";

export const saveTokens = async (access: string, refresh: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN, access);
};

export const getAccessToken = () => SecureStore.getItemAsync(ACCESS_TOKEN);

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
};
