import { Container } from "../../../components/container";
import { Input } from "../../../components/input";
import { DashboardHeader } from "../../../components/painelHeader";
import { FiUpload } from "react-icons/fi";
import { z } from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

const shema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    model: z.string().nonempty("O modelo é obrigatório"),
    year: z.string().nonempty("O ano do carro é obrigatório"),
    km: z.string().nonempty("O KM do carro é obrigatório"),
    price: z.string().nonempty("O preço do carro é obrigatório"),
    city: z.string().nonempty("O preço do carro é obrigatório"),
    whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value)=> /^(\d{10,11})$/.test(value), {
        message: "Número de telefone inválido."
    }),
    description: z.string().nonempty("A descrição é obrigatória")
})

type FormData = z.infer<typeof shema>

export function New() {

    const { register, handleSubmit, formState: {errors}, reset } =  useForm<FormData>({
        resolver: zodResolver(shema),
        mode: "onChange"
    })
  
    function onSubmit(data: FormData){
        console.log(data);
    }

    return(
        <Container>
            <DashboardHeader/>

            <div className="w-full bg-white flex flex-col sm:flex-row items-center p-3 rounded-lg gap-2">
                <button className="w-48 h-32 border-2 rounded-lg flex justify-center items-center border-gray-600 ">
                    <div className="cursor-pointer absolute">
                        <FiUpload size={30} color="#000"/>
                    </div>
                    <div className="cursor-pointer">
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer"/>  
                    </div>
                </button>

            </div>
            <div className="w-full bg-white flex  p-3 flex-col sm:flex-row items-center rounded-lg gap-2 mt-2">
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do carro</p>
                        <Input
                            name="name"
                            placeholder="Ex.: Onix 1.0..."
                            register={register}
                            type="text"
                            error={errors.name?.message}
                        />
                    </div>     

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Modelo</p>
                        <Input
                            name="model"
                            placeholder="Ex.: 1.0 Flex PLUS MANUAL"
                            register={register}
                            type="text"
                            error={errors.model?.message}
                        />
                    </div>   

                    <div className="w-full flex flex-row mb-3 items-center md:justify-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Ano</p>
                            <Input
                                name="year"
                                placeholder="Ex.: 2016/2016"
                                register={register}
                                type="text"
                                error={errors.year?.message}
                            />
                        </div>   

                        <div className="w-full">
                            <p className="mb-2 font-medium">KM rodados</p>
                            <Input
                                name="km"
                                placeholder="Ex.: 23.900..."
                                register={register}
                                type="text"
                                error={errors.km?.message}
                            />
                        </div>                      
                    </div>

                    <div className="w-full flex flex-row mb-3 items-center justify-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Telefone/Whatsapp</p>
                            <Input
                                name="whatsapp"
                                placeholder="Ex.: 011999999999"
                                register={register}
                                type="text"
                                error={errors.whatsapp?.message}
                            />
                        </div>   

                        <div className="w-full">
                            <p className="mb-2 font-medium">Cidade</p>
                            <Input
                                name="city"
                                placeholder="Ex.: São Paulo - SP"
                                register={register}
                                type="text"
                                error={errors.city?.message}
                            />
                        </div>                      
                    </div>
                    <div className="w-full">
                        <p className="mb-2 font-medium">Preço</p>
                        <Input
                            name="price"
                            placeholder="Ex.: 36.000"
                            register={register}
                            type="text"
                            error={errors.price?.message}
                        />
                    </div> 
                    <div className="w-full mt-2">
                        <p className="mb-2 font-medium">Descrição</p>
                        <textarea
                            className="mb-2 w-full h-24 px-2 border-2 border-gray-400 rounded-md outline-none"
                            {...register("description")}
                            name="description"
                            id="description"
                            placeholder="Digite a descrição completa sobre o carro..."
                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description?.message}</p>}
                    </div> 
                    
                    <button type="submit" className="w-full bg-zinc-900 text-white font-medium h-10 rounded-md cursor-pointer">
                        Cadastrar
                    </button>                                  
                </form>

            </div>
        </Container>
    )
}