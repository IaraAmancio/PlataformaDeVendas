import { FiLogIn} from "react-icons/fi";
import { FiUser} from "react-icons/fi";
import  Logo  from "../../assets/logo.svg";
import { Link } from "react-router";

import { authContext } from "../../contexts/authContext";
import { useContext } from "react";


export function Header(){
    const { signed, loadingAuth} = useContext(authContext);

    return (
        <div className="w-full flex items-center justify-center bg-white drop-shadow h-16 mb-4">
            <header className="w-full max-w-5xl flex mx-auto px-4 justify-between items-center">
                <Link to={"/"}>
                    <img src={Logo}
                    alt="logoImg"
                    />
                </Link>
                {
                    !loadingAuth && signed && (
                        <Link to="/dashboard">                        
                            <div className="rounded-full border-2 border-gray-900 p-1">
                                <FiUser color="black" size={20}/>
                            </div>
                        </Link>

                    )
                }
                {
                    !loadingAuth && !signed && (
                        <Link to="/login">                        
                            <div className="rounded-full border-2 border-gray-900 p-1">
                                <FiLogIn color="black" size={22}/>
                            </div>
                        </Link>

                    )
                }

            </header>
       
        </div>
    )
}