
import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { db } from "../../services/firebaseConnection";
import { getDocs, query, collection, orderBy} from "firebase/firestore";
import { Link } from "react-router";

interface carImage {
    url: string;
    uid: string;
    name: string;
}

interface carProps {
    id: string,
    name: string;
    year: string;
    km: string;
    price: string;
    city: string;
    imagesCar: carImage[];
}



export function Home() {
    
    const [cars, setCars] = useState<carProps[]>([]); 
    const [loaded, setLoaded] = useState<string[]>([]);

    useEffect((()=>{

        const fetchCars = async () =>
        {
            const queryRef = query(collection(db, "cars"), orderBy("created", "desc"));

            getDocs(queryRef).then((snapshot)=>{
                let listcars = [] as carProps[];
                snapshot.forEach((doc)=>{
                    listcars.push({
                        id: doc?.id,
                        name: doc.data()?.name,
                        year: doc.data().year,
                        km: doc.data()?.km,
                        price: doc.data()?.price,
                        city: doc.data()?.city,
                        imagesCar: doc.data()?.imagesCar
                    })
                })
                setCars(listcars);
            }).catch((error)=>{
                console.log(error);
            }
            )
            /*
            const querySnapShot = await getDocs(queryRef)
            let listcars = querySnapShot.docs.map((doc)=>({
                ...doc.data()
            })) as carProps[];
            */



            //setCars(listcars)
        }

        fetchCars();


    }), [])

    function handleLoad(id: string){
        setLoaded([...loaded, id]);
    }
    
    return(
        <Container>
                <section className="w-full max-w-3xl bg-white p-4 rounded-lg mx-auto flex justify-center items-center gap-2">
                    <input
                        type="text"
                        placeholder="Digite o nome do carro..."
                        className="w-full h-9 px-3 border-2 border-gray-400 rounded-lg outline-none"
                    />
                    <button className="bg-red-500 h-9 px-8 text-white font-medium text-lg rounded-lg">
                        Buscar
                    </button>
                </section>

                <h1 className="font-bold text-2xl mt-6 mb-4 text-center">
                    Carros novos e usados em todo o Brasil
                </h1>

                <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map(car=> 
                     (
                        <Link className="w-full bg-white rounded-lg" id={car.id} to={`cardetails/${car.id}`}>

                            <div className="w-full bg-slate-200 rounded-lg mb-2 h-56 transition-all hover:scale-105"
                            style={{display: loaded.includes(car.id)? "none": "block"}}
                            >
                            </div>
    
                            <img
                                src={car.imagesCar[0].url}
                                alt="img carro"
                                className="w-full rounded-lg mb-2 h-56 object-cover transition-all hover:scale-105"
                                onLoad={()=>handleLoad(car.id)}
                                style={{display: loaded.includes(car.id)? "block": "none"}}
                            />                            

                            <p className="font-bold mt-1 mb-2 px-2">{car?.name}</p>
                            <div className="flex flex-col px-2">
                                <span className="text-zinc-700 mb-6">Ano {car?.year} | {car?.km} km</span>
                                <strong className="font-medium text-black text-xl">R$ {car?.price}</strong>
                            </div>
                            <div className="w-full h-px bg-slate-200 my-2">
                            </div>
                            <div className="px-2 pb-2">
                                <span className="text-black">
                                    {car?.city}</span> 
                            </div>

                        </Link> 
                    ))}
                    
                    
                </main>
        </Container>


    )
}