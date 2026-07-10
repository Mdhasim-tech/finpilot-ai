import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    logoutUser
} from "../services/authService";


const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const checkAuth = async () => {

            try {

                const data = await getCurrentUser();

                setUser(data.user);

            } catch(error) {

                setUser(null);

            } finally {

                setLoading(false);

            }

        };


        checkAuth();

    }, []);



    const login = async (credentials) => {

        const data = await loginUser(credentials);

        setUser(data.user);

        return data;

    };



    const logout = async () => {

        await logoutUser();

        setUser(null);

    };



    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}



export function useAuth(){

    return useContext(AuthContext);

}