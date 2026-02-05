import { GuideContext } from "@/context/guide.context";
import { useContext } from "react";

export default function useGuide() {
    const context = useContext(GuideContext);
    if (!context) throw new Error("useGuide must be used within GuideProvider");
    return context
}         