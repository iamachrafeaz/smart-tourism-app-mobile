import { CameraCapturedPicture } from "expo-camera";
import { createContext, useState } from "react";

type CameraContextType = {
  photo: CameraCapturedPicture | null | undefined;
  setPhoto: React.Dispatch<
    React.SetStateAction<CameraCapturedPicture | undefined | null>
  >;
};

type Props = {
  children: React.ReactNode;
};

export const CameraContext = createContext<CameraContextType | undefined>(
  undefined,
);

export const CameraContextProvider = ({ children }: Props) => {
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>();

  return (
    <CameraContext.Provider value={{ photo, setPhoto }}>
      {children}
    </CameraContext.Provider>
  );
};
