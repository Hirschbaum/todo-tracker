const express = require('express');
const PORT = 8090;
const app = express();
const fs = require('fs');
const uuid = require('uuid');


let DB_PATH = require('./db.json');
let ITEM_DB_PATH = require('./itemDb.json');

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


//-----------------LIST:  route:  /list-----------------------------
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
        //"listitems": [],
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

//-----------------LIST ITEMS:  route:  /list-----------------------
//------------------------------------------------------------------

//curl -XGET localhost:8090/list/bd387f5e-5e26-4a9d-aec5-d6483e9c8740/item -v    WORKING - to get all the items
listRouter.get('/:id/item', (req, res) => {
    fs.readFile('itemDb.json', (err, data) => {
        if (err) {
            res.status(400).end();
            return;
        }
        res.status(200).send(data);
    })
})

//curl -XPOST localhost:8090/list/bd387f5e-5e26-4a9d-aec5-d6483e9c8740/item -H 'Content-Type: application/json' -d '{"itemName": "keep coding", "id": "bd387f5e-5e26-4a9d-aec5-d6483e9c8740"}' -v    // Working
listRouter.post('/:id/item', (req, res) => {
    let id = req.body.id; //it should be the id of the list!
    let itemName = req.body.itemName;

    if (!itemName || !id) {
        res.status(400).end();
        return;
    }

    let newItem = {
        "id": id, //it should be the id of the list!
        "item_id": uuid.v4(),
        "item_name": itemName,
        "description": "",
        "time_stamp": Date.now(),
    }

    console.log('NEW ITEM: ', newItem.item_name, newItem.item_id, newItem.id);

    ITEM_DB_PATH.push(newItem);
    fs.writeFile('./itemDb.json', JSON.stringify(ITEM_DB_PATH), (err, data) => {
        if (err) {
            res.status(500).end();
            return;
        }
        console.log('NEW ITEM with DATA:', newItem);
        res.status(201).send(data = { newItem });

    })
})

//curl -XDELETE localhost:8090/list/bd387f5e-5e26-4a9d-aec5-d6483e9c8740/item/5c50aab7-bda5-4f8f-8264-450a214310d2 -v //working!
listRouter.delete('/:id/item/:itemId', (req, res) => {
    ITEM_DB_PATH = ITEM_DB_PATH.filter(item => { return item.item_id !== (req.params.itemId) });

    fs.writeFile('./itemDb.json', JSON.stringify(ITEM_DB_PATH), (err, data) => {
        if (err) {
            res.status(500).end();
        }
        res.status(204).end();
    })
})

//-----------------EDIT ITEMS:  route:  /list/:id/item/:itemId-----------------------
//-----------------to change item_name and/or description---item_id---------------------

//curl -XPATCH localhost:8090/list/bd387f5e-5e26-4a9d-aec5-d6483e9c8740/item/249b8957-fb9a-40c7-a6f3-9e705386f281 -H 'Content-Type: application/json' -d '{"itemName": "edited titel", "description": "edited description"}' -v
listRouter.patch('/:id/item/:itemId', (req, res) => {
    let itemId = req.params.itemId; //req.body
    let itemName = req.body.itemName;
    let itemDescription = req.body.description;

    if (!itemId) {
        res.status(400).end();
        return;
    }

    let index = ITEM_DB_PATH.findIndex(item => { return item.item_id === itemId });
    let targetedItem = ITEM_DB_PATH[index];

    ITEM_DB_PATH[index] = Object.assign(targetedItem, { "item_name": itemName, "description": itemDescription }); 

    fs.writeFile('./itemDb.json', JSON.stringify(ITEM_DB_PATH), (err, data) => {
        if (err) {
            res.status(500).end();
            return;
        }
        console.log('EDITED ITEM with DATA:', targetedItem);
        res.status(201).send(data = { targetedItem });
    })
})

app.use('/list', listRouter);

app.listen(PORT, () => {
    console.log('Server started on ', PORT);
});