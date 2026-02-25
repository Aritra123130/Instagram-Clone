import {createContext, useState, useEffect} from 'react'
import {login, register, getme} from './Services/auth.api'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // try to restore session on mount
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await getme();
                if (response?.user) {
                    setUser(response.user);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchMe();
    }, []);

    const handlelogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleregister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password);
            console.log(response);
            setUser(response.user);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, handlelogin, handleregister}}>
            {children}
        </AuthContext.Provider>
    );
}
   