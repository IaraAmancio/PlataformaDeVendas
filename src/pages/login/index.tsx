import { useEffect } from "react";
import Logo from "./../../assets/logo.svg" ;
import { Link, useNavigate } from "react-router";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import toast from "react-hot-toast";


const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
});

type FormData = z.infer<typeof schema>

export function Login() {
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){
        signInWithEmailAndPassword(auth, data.email, data.password).then(
            (user)=>{
                toast.success("LOGADO COM SUCESSO!")
                navigate("/dashboard", {replace:true});
                console.log(user)
            }
        ).catch((error)=>{
            toast.error("Erro ao fazer o Login!")
            console.log(error)
        })
    }

    useEffect((()=>{
        async function logOut(){
            await signOut(auth);
        }
        logOut()
    }),[])


    return(
        <Container>
            <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center mx-auto">
                <Link to="/" className="mb-6 max-w-sm w-full">
                    <img
                    src={Logo}
                    alt="Logo do site"
                    className="w-full"
                    />
                </Link>
               
                <form className="w-full max-w-xl rounded-lg bg-white p-4"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder="Digite o seu email..."
                            name="email"
                            error = {errors.email?.message}
                            register = {register}
                            
                        />                        
                    </div>

                    <div className="mb-3">
                        <Input
                        type="password"
                        placeholder="Digite a sua senha..."
                        name="password"
                        error={errors?.password?.message}
                        register={register}
                        />                    
                    </div>

                    <button type="submit" className=" w-full h-10 bg-zinc-900 text-white font-medium rounded-md cursor-pointer">
                        Acessar
                    </button>
                </form>
                <p className="mt-2">Ainda não possui uma conta? <Link to="/register">Cadastra-se</Link></p>
            </div>
        </Container>

    )
}