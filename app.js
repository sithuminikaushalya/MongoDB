// app.js

const express = require('express');
const { getDb, connectToDb } = require('./db');
const { ObjectId } = require('mongodb');

const app = express();

app.use('/books/:id', (req, res, next) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    next();
});

app.get('/books', async (req, res) => {
    try {
        const db = getDb();
        const books = await db.collection('books').find().sort({ author: 1 }).toArray();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Could not fetch the documents' });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const db = getDb();
        const bookId = req.params.id;
        console.log('Attempting to find book with ID:', bookId);
        
        const book = await db.collection('books').findOne({ _id: ObjectId(bookId) });
        console.log('Book found:', book); 
        
        if (!book) {
            console.log('Book not found');
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book document:', error);
        res.status(500).json({ error: 'Could not fetch the book document' });
    }
});



const startServer = async () => {
    try {
        await connectToDb();
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
