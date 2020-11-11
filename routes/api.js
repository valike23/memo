"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET users listing.
 */
const express = require("express");
const mongodb_1 = require("mongodb");
const router = express.Router();
const uri = 'mongodb+srv://lawbook_user:G9yJAwyId0D0Xky5@cluster0-rrnxg.mongodb.net/memo?retryWrites=true&w=majority';
const connect = new Promise((resolve, reject) => {
    mongodb_1.MongoClient.connect(uri, { useNewUrlParser: true }).then((mongoClient) => {
        resolve(mongoClient);
    }, (error) => {
        reject(error);
    });
});
router.post('/login', (req, res) => {
    connect.then((data) => {
        const body = req.body;
        const name = 'lawbook';
        console.log(body);
        const dbo = data.db(name);
        dbo.collection('user').find(body)
            .toArray((err, result) => {
            if (err) {
                console.log(err);
                res.status(505);
                res.json(err);
                res.end();
                return;
            }
            res.json(result);
            res.end();
        });
    }, (err) => {
        res.status(505).json(err);
        res.end();
        return;
    });
});
router.post('/memo', (req, res) => {
    connect.then((data) => {
        const body = req.body;
        console.log('body', req.body);
        const name = 'lawbook';
        body.createdAt = new Date();
        body.status = 'pending';
        console.log(body);
        const dbo = data.db(name);
        dbo.collection('memo').insertOne(body, (err, resp) => {
            if (err) {
                console.log(err);
                res.status(505);
                res.json(err);
                res.end();
                return;
            }
            console.log(resp);
            res.json(resp);
            res.end();
        });
    });
});
router.get('/memo/:id', (req, res) => {
    connect.then((data) => {
        const param = req.params.id;
        const name = 'lawbook';
        const dbo = data.db(name);
        dbo.collection('memo').find({ sender_matNo: param }).toArray((err, result) => {
            if (err) {
                console.log(err);
                res.status(505);
                res.json(err);
                res.end();
                return;
            }
            res.json(result);
            res.end();
        });
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map