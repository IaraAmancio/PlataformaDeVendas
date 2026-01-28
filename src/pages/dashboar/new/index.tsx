import { Container } from "../../../components/container";
import { Input } from "../../../components/input";
import { DashboardHeader } from "../../../components/painelHeader";
import { FiUpload, FiTrash } from "react-icons/fi";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type { ChangeEvent } from "react";
import { useState, useContext } from "react";
import { authContext } from "../../../contexts/authContext";
import { v4 as uuidV4} from 'uuid';
import { storage } from "../../../services/firebaseConnection";
import {
        ref,
        uploadBytes,
        getDownloadURL,
        deleteObject,
        } from 'firebase/storage'

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import toast from "react-hot-toast";

const shema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    model: z.string().nonempty("O modelo é obrigatório"),
    year: z.string().nonempty("O ano do carro é obrigatório"),
    km: z.string().nonempty("O KM do carro é obrigatório"),
    price: z.string().nonempty("O preço do carro é obrigatório"),
    city: z.string().nonempty("O preço do carro é obrigatório"),
    whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value)=> /^(\d{11,12})$/.test(value), {
        message: "Número de telefone inválido."
    }),
    description: z.string().nonempty("A descrição é obrigatória")
})

type FormData = z.infer<typeof shema>

interface ImageItemProps{
    uid: string,
    name: string,
    previewUrl: string,
    url: string,
}

export function New() {

    const { register, handleSubmit, formState: {errors}, reset } =  useForm<FormData>({
        resolver: zodResolver(shema),
        mode: "onChange"
    });
    const { user } = useContext(authContext);
    const [ carImages, setCarImages ] = useState<ImageItemProps[]>([]);
  
    async function onSubmit(data: FormData){
        // lista com as informações dos carros anexados

        if(carImages.length === 0){
            toast.error("Envie pelo menos 1 imagem!")
            return;
        }

        const listImages = carImages.map(car => ({
            uid: car.uid,
            name: car.name,
            url: car.url,
        }))

        const infoCar = {
            name: data.name.toUpperCase(),
            model: data.model,
            year: data.year,
            km: data.km,
            price: data.price,
            city: data.city,
            whatsapp: data.whatsapp,
            description: data.description,
            uid: user?.uid,
            onwer: user?.name,
            created: new Date(),
            imagesCar: listImages,
        }

        addDoc(collection(db, 'cars'), infoCar).then(()=>{
            reset();
            setCarImages([]);
            toast.success("Carro cadastrado com sucesso!");
            console.log("Dados cadastrados com sucesso!");
        }).catch((Error)=>{
            console.log("Dados não cadastrados!");
            console.log(Error);
        })

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0])
        {
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png')
            {
                //envia pra base de dados
                toast.success("Imagem salva com sucesso!");
                handleUpload(image)
                
            }else{
                return;
            }
        }
    }

    async function handleUpload(image: File){
        if(!user?.uid){
            return;
        }
        const currentUid = user?.uid;
        const uidImage = uuidV4();

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

        uploadBytes(uploadRef, image)
        .then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((downloadURL)=>{
                const imageItem = {
                    name: uidImage,
                    uid: currentUid,
                    previewUrl: URL.createObjectURL(image),
                    url: downloadURL
                }

                setCarImages((images)=> [...images, imageItem])
            })
        }

        )
    }

    async function handleDelete(image: ImageItemProps){
        const pathImage = `images/${user?.uid}/${image?.name}`
        const refImage = ref(storage, pathImage)
        try{
            await deleteObject(refImage);
            const list = carImages.filter((car) => car.url !== image.url)
            setCarImages(list)
        } catch(err){
            console.log("Erro ao excluir imagem")
        }
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
                        <input type="file" accept="image/*" className="opacity-0 cursor-pointer" onChange={handleFile}/>  
                    </div>
                </button>

                {
                    carImages.map((image)=>{
                        return( 
                            <div key={image.name} className="w-full h-32 flex items-center justify-center relative">
                                <FiTrash size={20} color="white" className="absolute cursor-pointer" onClick={()=>handleDelete(image)}/>
                                <img
                                    className="w-full h-32 rounded-lg object-cover"
                                    src={image.previewUrl}
                                    alt="foto do carro"
                                />
                            </div>
                        )
                    })
                }
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