const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const URI = process.env.DB_URI;

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
        collection.insertOne(req.body);
        collection.find().toArray()
            .then(rawData => {
                res.render('crud', {collection: rawData})
            })
        //client.close();
    });
})

module.exports = router;