import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser }  from '../shared/api/user';
import { getAccessToken, getRefreshToken, removeTokens } from '../shared/api/auth';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const acessToken = await getAccessToken();
                const refreshToken = await getRefreshToken();
                if (acessToken && refreshToken) {
                    const currentUser = await getCurrentUser();
                    if (currentUser) {
                        setIsLogged(true);
                        setUser(currentUser);
                    } else {
                        setIsLogged(false);
                        setUser(null);
                        await removeTokens();

                    }
                } else {
                    setIsLogged(false);
                    setUser(null);
                    
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsLogged(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }


    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading,
                setLoading

            }}
            >
                {children}
            </GlobalContext.Provider>
    );
};

export default GlobalProvider;