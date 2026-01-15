import Logo from "./../../assets/logo.svg" ;
import { Link, useNavigate } from "react-router";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";

import { auth } from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth"; 

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório"),
    name: z.string().nonempty("O campo nome é obrigatório")
});

type FormData = z.infer<typeof schema>

export function Register() {

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password).then(
        async (user) =>{
                await updateProfile(user.user, {
                    displayName: data.name
                })
                console.log("USUARIO CADASTRADO COM SUCESSO!");
                navigate("/dashboard", {replace: true})
            }
        ).catch((error)=>{
            console.log("ERRO AO CADASTRAR USUARIO!");
            console.log(error);
        })
    }


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
                            type="text"
                            placeholder="Digite o seu nome completo..."
                            name="name"
                            error = {errors.name?.message}
                            register = {register}                       
                        />                        
                    </div>

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
                        Cadastrar
                    </button>
                </form>

                <p className="mt-2">Já possui uma conta? Faça <Link to="/login">Login</Link></p>
            </div>
        </Container>

    )
}