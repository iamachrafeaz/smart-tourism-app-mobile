import * as guideService from "@/api/guideService";
import useAuth from "@/hooks/useAuth";
import { Guide } from "@/types/guide.type";
import { createContext, useEffect, useRef, useState } from "react";

type GuideContextType = {
  guide: Guide | null;
  isLoading: boolean;
  error: string | null;
  isRefresh: boolean;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GuideContext = createContext<GuideContextType | undefined>(
  undefined,
);

export const GuideProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isRefresh, setIsRefresh] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const isMounted = useRef(true);

  const getGuide = async () => {
    try {
      const response: Guide = await guideService.getGuideMe();
      if (isMounted.current) setGuide(response);
    } catch (error: any) {
      if (isMounted.current) setError(error.message);
    }
  };

  useEffect(() => {
    isMounted.current = true;

    if (!isLoggedIn || user?.role !== "GUIDE" || !isRefresh) return;

    const bootstrap = async () => {
      if (!isMounted.current) return;
      setIsLoading(true);
      setError(null);
      await getGuide();
      if (!isMounted.current) return;
      setIsLoading(false);
      setIsRefresh(false);
    };

    bootstrap();

    return () => {
      isMounted.current = false;
    };
  }, [isLoggedIn, user, isRefresh]);

  return (
    <GuideContext.Provider
      value={{ guide, isLoading, error, isRefresh, setIsRefresh }}
    >
      {children}
    </GuideContext.Provider>
  );
};
