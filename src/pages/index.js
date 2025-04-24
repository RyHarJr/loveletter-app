import Image from 'next/image'
import { useRouter } from "next/router"

const Main = () => {
    const router = useRouter()
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <Image
                src="/images/kucing.jpg"
                alt="Kucing"
                width={200}
                height={200}
                className="rounded-full shadow-lg mb-6"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center">
                Welcome Love Letter App
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-semibold mb-6 text-center max-w-xl">
                Ini adalah aplikasi Love Letter yang dibuat dengan React dan Tailwind CSS.
                Aplikasi ini digunakan untuk mengirimkan surat cinta kepada orang yang kita cintai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => router.push('/form/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full sm:w-auto"
                >
                    Kirim Surat Cinta
                </button>
                <button 
                    onClick={() => router.push('/list/')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full sm:w-auto"
                >
                    Lihat Surat Cinta
                </button>
            </div>
        </div>
    )
}

export default Main