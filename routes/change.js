const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const URI = process.env.DB_URI;
const dirtyWords = process.env.DIRTY_WORDLIST.split(',');

router.get('/', (req, res, next) => {
    res.redirect('/crud');
})

router.post('/', (req, res, next) => {
    var data = req.body;
    const client = new MongoClient(URI, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("test").collection("quotes");

        // Check for abusive words
        dirtyWords.forEach(word => {
            if (data.name.includes(word))
                data.name = "******";

            if (data.surname.includes(word))
                data.surname = "******";
        });
    
        // Determine and update desired name value
        if (Object.prototype.hasOwnProperty.bind(data)('old_name'))
            collection.findOneAndUpdate(
                { name: data.old_name }, 
                { $set: {name: data.new_name }}, 
                { upsert: true }
            );
        
        // Update desired surname value
        else if (Object.prototype.hasOwnProperty.bind(data)('old_surname'))
            collection.findOneAndUpdate(
                { surname: data.old_surname }, 
                { $set: {surname: data.new_surname }}, 
                { upsert: true }
            );

        else console.log('FAILED');
        res.redirect('/crud');
    });
})

module.exports = router;