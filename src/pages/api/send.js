import clientPromise from '../../../lib/database.js'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { to, name, message } = req.body;
        const client = await clientPromise
        const db = client.db('loveletter')
        const collection = db.collection('messages');
        const newMessage = { to, name, message, createdAt: Date.now() }
        const result = await collection.insertOne(newMessage)
        res.status(201).json(result)
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}