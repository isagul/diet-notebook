import { useEffect, useState } from "react"

export const useIsAuthenticated = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsUserAuthenticated(true);
        }
    }, [])

    return {
        isUserAuthenticated
    };
};