import { Outlet } from "react-router-dom";
import { AuthProvider } from "./useAuth";

export default function AuthLayout() {
    return (
        <AuthProvider><Outlet /></AuthProvider>
    );
}