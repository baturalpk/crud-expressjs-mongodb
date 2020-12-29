const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const URI = process.env.DB_URI;

router.get('/', ((req, res, next) => {
    res.send('submit a post to show inserted items');
}))

router.post('/', function (req, res, next) {
    console.log("TEST [POST]");
    const client = new MongoClient(URI, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("test").collection("quotes");
        collection.insertOne(req.body);
        collection.find().toArray()
            .then(rawData => {
                res.render('post', {collection: rawData})
            })
        //client.close();
    });

    //const result = `Your request's inserted int
    // o database: ${req.body.name}, ${req.body.surname}`;


})

module.exports = router;