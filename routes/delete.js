const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const URI = process.env.DB_URI;

router.get('/', (req, res, next) => {
    res.redirect('/crud');
});

router.post('/', (req, res, next) => {
    let IDs = req.body.ID.trim().split(',').sort();

    let client = new MongoClient(URI, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("test").collection("quotes");

        IDs.forEach(ID => {
            collection.find().toArray()
            .then(rawData => {
                let objId = rawData[ID - 1]._id;
                collection.deleteOne({
                    "_id": objId
                });
            })
        });

        res.redirect('/crud');
    });
});

module.exports = router;
