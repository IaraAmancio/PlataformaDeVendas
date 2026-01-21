
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

    useEffect((()=>{

        const fetchCars = async () =>
        {
            const queryRef = query(collection(db, "cars"), orderBy("created", "desc"));

            getDocs(queryRef).then((snapshot)=>{
                let listcars = [] as carProps[];
                snapshot.forEach((doc)=>{
                    listcars.push({
                        id: doc.id,
                        name: doc.data().name,
                        year: doc.data().year,
                        km: doc.data().km,
                        price: doc.data().price,
                        city: doc.data().price,
                        imagesCar: doc.data().imagesCar
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
                    {cars.map(carro=> 
                     (
                        <Link id={carro.id} to={`cardetails/${carro.id}`}>
                            <img
                                src={carro.imagesCar[0].url}
                                alt="img carro"
                                className="w-full rounded-lg mb-2 max-h-50 transition-all hover:scale-105"
                            />
                            <p className="font-bold mt-1 mb-2 px-2">{carro?.name}</p>
                            <div className="flex flex-col px-2">
                                <span className="text-zinc-700 mb-6">Ano {carro?.year} | {carro?.km}</span>
                                <strong className="font-medium text-black text-xl">{carro?.price}</strong>
                            </div>
                            <div className="w-full h-px bg-slate-200 my-2">
                            </div>
                            <div className="px-2 pb-2">
                                <span className="text-black">
                                    {carro?.city}</span> 
                            </div>

                        </Link> 
                    ))}
                    
                    
                </main>
        </Container>


    )
}