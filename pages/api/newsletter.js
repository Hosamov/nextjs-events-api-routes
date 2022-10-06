require('dotenv').config()
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email addres.' });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdrss.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();

    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
