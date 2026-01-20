
import { useContext, type ReactNode } from "react";
import { authContext } from "../contexts/authContext";
import { Navigate } from "react-router";

interface privateProps{
    children: ReactNode;
}


export function Private({children}: privateProps):any{
    const { loadingAuth, signed} = useContext(authContext);

    if(loadingAuth){
        return (
            <div></div>
        )
    }

    if(!signed){
        return(<Navigate to="/login"/>);
    }
    
    return(
        children
    )
}