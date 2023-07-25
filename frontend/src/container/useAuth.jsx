import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data) => {
        await axios("http://localhost:8800/user/login", {
            method: "GET",
            params: { username: data.username, password: data.password },
            withCredentials: true,
        }).then((response) => {
            // console.log(response);
            const userobject = response.data;
            // console.log(userobject);
            data.id = userobject.id;
            const setCorrect = data.correct;
            setCorrect(true);
            setUser(data);
            navigate("/contact/index");
        }).catch((error) => {
            const setCorrect = data.correct;
            setCorrect(false);
            navigate("/login");
            // console.error(error);
        })

        // setUser(data);
        // navigate("/contact/index");
    };

    const logout = () => {
        console.log("logout function!");
        setUser(null);
        navigate("/login");
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    return useContext(AuthContext);
}