
import { useEffect, useState, useContext, use } from "react";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/painelHeader";
import { db, storage } from "../../services/firebaseConnection";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { authContext } from "../../contexts/authContext";
import { Link } from "react-router";
import { FiTrash2 } from "react-icons/fi";
import { deleteObject, ref } from "firebase/storage";

interface imagesCarProps{
    uid: string,
    url: string,
    name: string,
}

interface carProps{
    id: string,
    userUid: string,
    name: string,
    year: string,
    km: string,
    price: string,
    city: string,
    imagesCar: imagesCarProps[]
}

export function Dashboard() {

    const [cars, setCars] = useState<carProps[]>([]);
    const { user } = useContext(authContext);
    const [loaded, setLoaded] = useState<string[]>([])

 useEffect((()=>{
 
         function loadCars ()
         {
             const queryRef = query(collection(db, "cars"), where("uid", "==", user?.uid));
 
             getDocs(queryRef).then((snapshot)=>{
                 let listcars = [] as carProps[];
                 snapshot.forEach((doc)=>{
                     listcars.push({
                         id: doc.id,
                         name: doc.data().name,
                         year: doc.data().year,
                         km: doc.data().km,
                         price: doc.data().price,
                         city: doc.data().city,
                         imagesCar: doc.data().imagesCar,
                         userUid: doc.data().userUid,
                     })
                 })
                 setCars(listcars);
                 console.log(listcars)
             }).catch((error)=>{
                 console.log(error);
             }
             )
         }
 
         loadCars();
 
 
     }), [user])

    function handleLoaded(id: string){
        setLoaded([...loaded, id]);
    }

    async function handleDeleteCar(car: carProps){
        const docRef = doc(db, "cars", car.id);
        await deleteDoc(docRef);

        car.imagesCar.map(async (image) => {
            const imagePath = `images/${image.uid}/${image.name}`;
            const imageRef = ref(storage, imagePath);

            try{
                await deleteObject(imageRef);
                let listCars = cars.filter((itemCar) => itemCar.id !== car.id);
                setCars(listCars);
            } catch(error){
            console.log("ERRO AO EXCLUIR IMAGEM!");
            }

        })


    }

    return(
        <Container>
            
            <DashboardHeader/>

            <main className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6">
                
                {cars.map(car=> (
                <section key={car.id} className="w-full bg-white rounded-lg relative">
                    <div
                        className="w-full rounded-lg bg-slate-200 mb-2 h-56"
                        style={{display: loaded.includes(car.id)? "none": "block"}}
                    >
                    </div>
                    <div style={{display: loaded.includes(car.id)? "block": "none"}} className="w-full relative flex items-center justify-center">
                        <button className="bg-white absolute top-2 right-2 rounded-full h-14 w-14 flex items-center justify-center drop-shadow cursor-pointer" 
                        onClick={()=>handleDeleteCar(car)}
                        >
                            <FiTrash2 size={26} color="#000" />    
                        </button>
                     
                        <img
                            src={car.imagesCar[0].url}
                            alt="img carro"
                            className="w-full rounded-lg mb-2 max-h-56"
                            onLoad={()=>handleLoaded(car.id)}
                        /> 
                    </div>                         

                    <p className="font-bold mt-1 mb-2 px-2">{car?.name}</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-700 mb-6">
                            Ano {car?.year} | {car?.km} km
                        </span>
                        <strong className="font-medium text-black text-xl">
                            R$ {car?.price}
                        </strong>
                    </div>
                    
                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-black">
                            {car?.city}</span> 
                    </div>

                </section> 
                 ))}
        </main>
            
        </Container>

    )
}