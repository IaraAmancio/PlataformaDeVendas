import { createContext, useEffect, useState, type ReactNode} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';


type AuthContextType = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({name, uid, email}: UserProps) => void;
    user: UserProps | null;
}

interface AuthProviderProps{
    children: ReactNode
}

interface UserProps{
    uid: string;
    name: string | null;
    email: string | null;
}



export const authContext = createContext({} as AuthContextType)

export default function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    function handleInfoUser ({name, uid, email}: UserProps){
        setUser({
            name,
            email,
            uid,
            }
        )
    }

    useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
        if(user){
            setUser({
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
            })

            setLoadingAuth(false);
        }
        else{
            setUser(null);
            setLoadingAuth(false);
        }
    })

    return ()=>{
        unsub();
    }
    }, [])

    return(
        <authContext.Provider value={{signed: !!user, loadingAuth, handleInfoUser, user
        }}>
            {children}
        </authContext.Provider>
    )
}

