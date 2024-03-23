const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: () => {
        return MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
            .then((client) => {
                dbConnection = client.db();
                console.log('Connected to MongoDB');
            })
            .catch(err => {
                console.error('Failed to connect to MongoDB:', err);
                throw err;
            });
    },
    getDb: () => dbConnection
};
