const express = require('express');
const PORT = 8090;
const app = express();
const fs = require('fs');
const uuid = require('uuid');


let DB_PATH = require('./db.json');

app.use(express.json());

//----------------------------------------------------------------
app.use((req, res, next) => {
    let reqStarted = Date.now();
    res.once('finish', () => {
        let resEnded = Date.now();
        let time = resEnded - reqStarted;
        console.log(req.method, req.path, res.statusCode, time + ' ms');
    });
    next();
});


//-----------------LIST:  route:  /list------------------------------
//------------------------------------------------------------------
const listRouter = express.Router();

//curl localhost:8090/list - WORKING! get all lists
listRouter.get('/', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            res.status(400).end()
        };
        res.status(200).send(data);
    })
});

//curl -XGET localhost:8090/list/7c111fe8-faf9-467c-8656-3934e5540cd6    - WORKING! get specific list
listRouter.get('/:id', (req, res) => {
    let targetedList = DB_PATH.find(list => list.id === req.params.id);
    if (!targetedList) {
        res.status(400).end();
        return;
    }
    res.status(200).json(targetedList);
});

//curl -XPOST localhost:8090/list -H 'Content-Type: application/json' -d '{"name": "planing"}' -v  - WORKING! post new list
listRouter.post('/', (req, res) => {
    let name = req.body.name;
    if (!name) {
        res.status(400).end();
    }

    let newList = {
        "name": name,
        "id": uuid.v4(),
        "listitems": [],
    }

    console.log(newList.name, newList.id);

    DB_PATH.push(newList);
    fs.writeFile('./db.json', JSON.stringify(DB_PATH), (err, data) => {
        if (err) {
            res.status(500).end();
        }

        console.log('Database with new list', newList);
        res.status(201).send(data = { newList });
    })
});

//curl -XDELETE localhost:8090/list/7c111fe8-faf9-467c-8656-3934e5540cd6 -v   WORKING - to delete specific list
listRouter.delete('/:id', (req, res) => {
    DB_PATH = DB_PATH.filter(list => { return list.id !== req.params.id });

    fs.writeFile('./db.json', JSON.stringify(DB_PATH), (err, data) => {
        if (err) { res.status(500).end() };
        res.status(204).end();
    })
});

app.use('/list', listRouter);

app.listen(PORT, () => {
    console.log('Server started on ', PORT);
});