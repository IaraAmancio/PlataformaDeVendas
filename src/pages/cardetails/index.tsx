import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { db } from "../../services/firebaseConnection";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";


interface imagesCarProps{
    uid: string,
    url: string,
    name: string,
}

interface carProps {
    id: string,
    name: string;
    model: string,
    year: string;
    km: string;
    price: string;
    city: string;
    owner: string;
    uid: string,
    description: string;
    whatsapp: string;
    imagesCar: imagesCarProps[];
}


export function CarDetails() {
    const { id } = useParams();
    const [ car, setCar ] = useState<carProps>();
    const [ sliderPerView, setSliderPerView ] = useState(2);
    const navigate = useNavigate();

    useEffect((()=>{
        
        async function loadCar(){
            if(!id){return}

            const idCar = id as string
            const docRef = doc(db, "cars", idCar);

            getDoc(docRef)
            .then((doc)=> 
                { 
                    if(!doc.data()){
                        navigate("/");
                    }
                   
                    setCar({
                        id: doc.id,
                        name: doc.data()?.name,
                        model: doc.data()?.model,
                        year: doc.data()?.year,
                        km: doc.data()?.km,
                        price: doc.data()?.price,
                        city: doc.data()?.city,
                        description: doc.data()?.description,
                        uid: doc.data()?.userUid,
                        owner: doc.data()?.userName,
                        whatsapp: doc.data()?.whatsapp,
                        imagesCar: doc.data()?.imagesCar,
                        })
                })
            .catch((error)=> 
                {
                    console.log(error);
                })
                
        }

        loadCar()

    }),[id]);


    useEffect((()=>{

        function handleResize(){
            if(window.innerWidth < 720){
                setSliderPerView(1);
            } else{
                setSliderPerView(2);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return ()=> {
            window.removeEventListener("resize", handleResize)
        }

    }),[])

    
    return(
            <Container>
                {
                    car && (
                    <Swiper
                    slidesPerView={sliderPerView}
                    pagination={{clickable: true}}
                    navigation
                    >
                        {
                            car?.imagesCar.map((carImage)=>(
                                <SwiperSlide key={carImage.name}>
                                    <img
                                        className="w-full h-96 object-cover"
                                        src={carImage.url}
                                        alt="Imagem do carro"
                                    />                                
                                </SwiperSlide>
                            )) 
                        }
                    </Swiper>
                    )
                }


                { car && (
                <main className="w-full bg-white p-6 my-4  rounded-lg">
                    <div className="flex flex-col items-start sm:flex-row mb-4 sm:items-center justify-between">
                        <h1 className="text-3xl text-black font-bold">
                            {car?.name}
                        </h1>
                        <h1 className="text-3xl text-black font-bold">
                            R$ {car?.price}
                        </h1>
                    </div> 
                    {car?.model}

                    <div className="w-full flex gap-6 my-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>Cidade</p>
                                <strong>{car?.city}</strong>                                
                            </div>
                            <div>
                                <p>Ano</p>
                                <strong>{car?.year}</strong>                                
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>KM</p>
                                <strong>{car?.km}</strong>                                
                            </div>
                        </div>                          
                    </div>

                    <strong>Descrição: </strong>
                    <p className="mb-4">{car?.description}</p>

                    <strong>Telefone / Whatsapp</strong>
                    <p>{car?.whatsapp}</p>

                    <a 
                      href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse ${car?.name} e fiquei interessado!`}
                      target="_blank"
                      className="w-full bg-green-500 text-white h-11 rounded-lg my-6 cursor-pointer flex items-center justify-center gap-2 text-xl font-medium"
                    >
                        Conversar com Vendedor
                        <FaWhatsapp size={26} color="#FFF"/>
                    </a>
                </main>
                )
                }
            </Container>
    )
}