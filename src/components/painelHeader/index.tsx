import { Link } from "react-router";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function DashboardHeader(){
    async function handleLogout(){
        await signOut(auth);
    }
    return(
        <div className="bg-red-500 text-white w-full rounded-md px-4 h-10 font-medium flex items-center gap-4 mb-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard/new">Novo carro</Link>

            <button onClick={() => handleLogout()} className="ml-auto cursor-pointer">Sair da conta</button>
        </div>
    )
}