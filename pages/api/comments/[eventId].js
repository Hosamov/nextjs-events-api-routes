require('dotenv').config();
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mdrss.mongodb.net/events?retryWrites=true&w=majority`
  );

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      // Invalid input
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Matt', text: 'A first comment!' },
      { id: 'c2', name: 'Jack', text: 'A second comment!' },
      { id: 'c3', name: 'John', text: 'A third comment!' },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
