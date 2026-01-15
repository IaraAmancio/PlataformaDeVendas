
import { Container } from "../../components/container"

export function Home() {
    
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
                    <section>
                        <img
                        src="https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.webp"
                        alt="img carro"
                        className="w-full rounded-lg mb-2 max-h-72 transition-all hover:scale-105"
                        />
                        <p className="font-bold mt-1 mb-2 px-2">JAGUAR F-PACE</p>
                        <div className="flex flex-col px-2">
                            <span className="text-zinc-700 mb-6">Ano 2016/2017 | 23.000km</span>
                            <strong className="font-medium text-black text-xl">R$ 239.00</strong>
                        </div>
                        <div className="w-full h-px bg-slate-200 my-2">
                        </div>
                        <div className="px-2 pb-2">
                            <span className="text-black">
                                São Paulo - SP</span> 
                        </div>

                    </section>
                    
                </main>
        </Container>


    )
}