
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

                <h1
                className="font-bold text-2xl mt-6 mb-4 text-center"
                >
                    Carros novos e usados em todo o Brasil
                </h1>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <section>
                        <img
                        src="https://cdn.motor1.com/images/mgl/AkB8vL/s3/fiat-mobi-2023.webp"
                        alt="img carro"
                        className="w-full rounded-lg mb-2"
                        />
                        <strong>JAGUAR F-PACE</strong>
                        <div className="flex items-center gap-2 mb-4">
                            <p>2016/2017</p>
                            <div className="bg-black rounded-full h-1 w-1"></div>
                            <p>26999 km</p>
                        </div>
                        <strong className="font-bold text-2xl">R$ 239.00</strong>
                        <div className="border-b-2 border-b-gray-600 mb-2 mt-2">
                        </div>
                        <p>São Paulo - SP</p>
                    </section>
                    
                </div>
        </Container>


    )
}