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
            const response = await fetch("https://your-api-endpoint.com/send", {
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
        <div className="min-container flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Buat Surat Cinta</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-340 max-w-md">
                <label htmlFor="to" className="block text-gray-700 text-sm font-bold mb-2">Kepada:</label>
                <input 
                    type="text" 
                    id="to" 
                    name="to" 
                    value={formData.to}
                    onChange={handleChange}
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />

                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Dari:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />

                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Pesan:</label>
                <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                ></textarea>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Kirim
                </button>
            </form>

            {/* Alert Modal */}
            {showAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{alertContent.title}</h3>
                        <p className="mb-4 text-gray-700">{alertContent.message}</p>
                        {alertContent.success ? (
                            <button
                                onClick={handleNext}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Lanjut
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowAlert(false)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
