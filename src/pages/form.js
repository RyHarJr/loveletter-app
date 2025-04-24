import { useState } from "react"
import { useRouter } from "next/router"

const Form = () => {
    const [formData, setFormData] = useState({
        to: "",
        name: "",
        message: ""
    })

    const [showAlert, setShowAlert] = useState(false)
    const [alertContent, setAlertContent] = useState({
        title: "",
        message: "",
        success: false
    })

    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()
            console.log("Success:", result)
            setAlertContent({
                title: "Berhasil!",
                message: "Surat cinta berhasil dikirim.",
                success: true
            })
            setShowAlert(true)
        } catch (error) {
            console.error("Error:", error)
            setAlertContent({
                title: "Gagal!",
                message: "Terjadi kesalahan saat mengirim surat.",
                success: false
            })
            setShowAlert(true)
        }
    }

    const handleNext = () => {
        setShowAlert(false)
        router.push("/list")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Buat Surat Cinta</h2>
            <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-lg px-6 py-6 mb-4 w-full max-w-md"
            >
                <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-2">Kepada:</label>
                <input 
                    type="text" 
                    id="to" 
                    name="to" 
                    value={formData.to}
                    onChange={handleChange}
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" 
                />

                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Dari:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" 
                />

                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Pesan:</label>
                <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    rows="4"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" 
                ></textarea>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Kirim
                </button>
            </form>

            {/* Alert Modal */}
            {showAlert && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{alertContent.title}</h3>
                        <p className="mb-4 text-gray-700">{alertContent.message}</p>
                        {alertContent.success ? (
                            <button
                                onClick={handleNext}
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Lanjut
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAlert(false)}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                OK
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form