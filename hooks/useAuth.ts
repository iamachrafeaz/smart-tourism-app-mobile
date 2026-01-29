import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
