import Image from 'next/image'
import { useRouter } from "next/router"

const Main = () => {
    const router = useRouter()
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Image
                src="/images/kucing.jpg"
                alt="Kucing"
                width={200}
                height={200}
                className="rounded-full overflow-hidden shadow-lg mb-4"
            />
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome Love Letter App</h1>
            <p className="text-lg text-gray-600 font-semibold mb-4 flex text-center">
                Ini adalah aplikasi Love Letter yang dibuat dengan React dan Tailwind CSS.
                <br />
                Aplikasi ini adalah aplikasi yang digunakan untuk mengirimkan surat cinta kepada orang yang kita cintai.
            </p>
            <div className="flex space-x-4">
                <button 
                    onClick={() => router.push('/form/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded"
                >
                    Kirim Surat Cinta
                </button>
                <button 
                    onClick={() => router.push('/list/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded"
                >
                    Lihat Surat Cinta
                </button>
            </div>
        </div>
    )
}

export default Main