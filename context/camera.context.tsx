import { CameraCapturedPicture } from "expo-camera";
import { useRouter } from "expo-router";
import { createContext, useRef, useState } from "react";

type CameraResult = CameraCapturedPicture | null;

type CameraOptions = {
  facing?: "front" | "back";
};

type CameraContextType = {
  photo: CameraCapturedPicture | null;
  setPhoto: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>;
  openCamera: (options?: CameraOptions) => Promise<CameraResult>;
  resolvePhoto: (photo: CameraResult) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CameraContext = createContext<CameraContextType | undefined>(
  undefined,
);

export const CameraContextProvider = ({ children }: Props) => {
  const router = useRouter();

  const resolverRef = useRef<((value: CameraResult) => void) | null>(null);

  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  const openCamera = (options?: CameraOptions) => {
    return new Promise<CameraResult>((resolve) => {
      resolverRef.current = resolve;

      router.push({
        pathname: "/(modals)/cameraModal",
        params: {
          facing: options?.facing ?? "back",
        },
      });
    });
  };

  const resolvePhoto = (photo: CameraResult) => {
    setPhoto(photo);
    resolverRef.current?.(photo);
    resolverRef.current = null;
  };

  return (
    <CameraContext.Provider
      value={{ photo, setPhoto, openCamera, resolvePhoto }}
    >
      {children}
    </CameraContext.Provider>
  );
};
