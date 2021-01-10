const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const URI = process.env.DB_URI;
const dirtyWords = process.env.DIRTY_WORDLIST.split(',');

router.get('/', (req, res, next,) => {

    const client = new MongoClient(URI, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        client.db("test").collection("quotes").find().toArray()
            .then(rawData => {
                res.render('crud', {title: 'CRUD-example', collection: rawData})
            })
    });
})

router.post('/', (req, res, next) => {

    const client = new MongoClient(URI, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("test").collection("quotes");
        var request = req.body;

        // Check for abusive words
        dirtyWords.forEach(word => {
            if (request.name.includes(word))
                request.name = "******";

            if (request.surname.includes(word))
                request.surname = "******";
        });

        collection.insertOne(request);
        collection.find().toArray()
            .then(rawData => {
                res.render('crud', {collection: rawData})
            })
    });
})

module.exports = router;