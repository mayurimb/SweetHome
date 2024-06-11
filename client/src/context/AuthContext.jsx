import { Children, useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const getUserFromLocalStorage = () => {
        const userData = localStorage.getItem("user") || null
        console.log(userData)
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem("user");
                return null;
            }
        }
        return null;
    };

    const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage());

    const updateUser = (data) => {
        setCurrentUser(data)
        localStorage.setItem("user", JSON.stringify(data));
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
