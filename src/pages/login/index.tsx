import Logo from "./../../assets/logo.svg" ;
import { Link } from "react-router";
import { Container } from "../../components/container";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo e-mail é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
});

type FormData = z.infer<typeof schema>

export function Login() {

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){

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

                    <button type="submit" className=" w-full h-10 bg-zinc-900 text-white font-medium rounded-md">
                        Acessar
                    </button>
                </form>
                <p className="mt-2">Ainda não possui uma conta? <Link to="/register">Cadastra-se</Link></p>
            </div>
        </Container>

    )
}