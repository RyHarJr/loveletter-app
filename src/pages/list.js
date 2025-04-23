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

    const handleSearch = (e) => {
        const searchValue = e.toLowerCase()
        const filteredData = data.filter((item) => {
            return item.name.toLowerCase().includes(searchValue) || item.to.toLowerCase().includes(searchValue) || item.message.toLowerCase().includes(searchValue)
        })
        setFilteredData(filteredData)
        setSearch(searchValue)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-500">List Surat Cinta</h2>
            <input className="text-gray-500 w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-4" placeholder='Cari Surat Cinta' type="search" value={search} onChange={(e) => handleSearch(e.target.value)} />
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 overflow-y-auto h-96">
                <ul className="space-y-4">
                    {filteredData.map((item) => (
                        <li key={item._id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-500">From: {item.name}</h3>
                            <p className="text-gray-500">To: {item.to}</p>
                            <p className="text-gray-500">Messages: <br />{item.message}</p>
                            <p className="text-sm text-gray-500">Created at: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default List
