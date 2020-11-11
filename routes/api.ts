/*
 * GET users listing.
 */
import * as express from 'express';
import { MongoClient, MongoError } from "mongodb";
import { Ilogin, Iuser, Imemo} from "../model/model";
const router = express.Router();
const uri = 'mongodb+srv://lawbook_user:G9yJAwyId0D0Xky5@cluster0-rrnxg.mongodb.net/memo?retryWrites=true&w=majority';
const connect = new Promise((resolve, reject) => {
    MongoClient.connect(uri,  { useNewUrlParser: true }).then((mongoClient: MongoClient) => {
        
        resolve(mongoClient);
    }, (error) => {
        reject(error);
    });
});


router.post('/login', (req: express.Request, res: express.Response) => {
    connect.then((data: MongoClient) => {
        const body: Ilogin = req.body;
        const name = 'lawbook';
        console.log(body);
        const dbo = data.db(name);
        dbo.collection('user').find(body)
            .toArray((err: MongoError, result: Array<Iuser>) => {
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

    }, (err: MongoError) => {
        res.status(505).json(err);
        res.end();
        return;
    });

});


router.post('/memo', (req: express.Request, res: express.Response) => {
    connect.then((data: MongoClient) => {
        const body: Imemo = req.body;
        const name = 'lawbook';
        body.createdAt = new Date();
        body.status = 'pending';
        console.log(body);
        const dbo = data.db(name);
        dbo.collection('memo').insertOne(body, (err: MongoError, resp: any) => {
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


router.get('/memo/:id', (req: express.Request, res: express.Response) => {
    connect.then((data: MongoClient) => {
        const param: string = req.params.id;
        const name = 'lawbook';
        const dbo = data.db(name);
        dbo.collection('memo').find({ sender_matNo: param }).toArray((err: MongoError, result: Array<Imemo>) => {
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

export default router;