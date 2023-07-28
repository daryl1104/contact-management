import { Outlet } from "react-router-dom";
import { AuthProvider } from "../hook/useAuth";

export default function AuthLayout() {
    return (
        <AuthProvider><Outlet /></AuthProvider>
    );
}