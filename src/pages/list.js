import { useEffect, useState } from 'react'

const List = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/list')
            const data = await response.json()
            setData(data)
            setFilteredData(data)
        }
        fetchData()
    }, [])

    const handleSearch = (value) => {
        const searchValue = value.toLowerCase()
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchValue) ||
            item.to.toLowerCase().includes(searchValue) ||
            item.message.toLowerCase().includes(searchValue)
        )
        setFilteredData(filtered)
        setSearch(value)
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700 text-center">List Surat Cinta</h2>
            
            <input 
                className="w-full max-w-xl bg-white text-gray-700 shadow-md rounded-lg p-4 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Cari Surat Cinta..." 
                type="search" 
                value={search} 
                onChange={(e) => handleSearch(e.target.value)} 
            />

            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4 overflow-y-auto max-h-[500px]">
                {filteredData.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredData.map((item) => (
                            <li key={item._id} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-800">From: {item.name}</h3>
                                <p className="text-gray-600">To: {item.to}</p>
                                <p className="text-gray-600 whitespace-pre-line">Messages:{"\n"}{item.message}</p>
                                <p className="text-sm text-gray-400 mt-2">Created at: {new Date(item.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">Tidak ada surat ditemukan.</p>
                )}
            </div>
        </div>
    )
}

export default List