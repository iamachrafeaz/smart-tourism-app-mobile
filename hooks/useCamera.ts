import { CameraContext } from "@/context/camera.context";
import { useContext } from "react";

export const useCamera = () => {
    const context = useContext(CameraContext);
    if (!context) {
        throw new Error("useCamera must be used within CameraContextProvider");
    }
    return context;
};
