import clientPromise from '../../../lib/database.js'

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db('loveletter')
    const collection = db.collection('messages');
    const messages = await collection.find({}).toArray();
    res.status(200).json(messages)
}