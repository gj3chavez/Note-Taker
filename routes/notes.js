const notes = require('express').Router();
const fs = require('fs');
const uuid =require('uuid');


notes.get('/',(req, res)=> {
    console.info(`${req.method} request received notes`);

    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        } else{
            res.json(JSON.parse(data));
        }
    });
});


notes.post('/', (req,res)=>{
    console.info(`${req.method} request received notes`);

    const {tittle, text} = req.body;

    const newNote ={
        tittle,
        text,
        id: uuid()
    };

    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if (err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err, text)=>{
                if (er) {
                    console.error(err)
                }
            })
            res.json(js.parse(data));
        }
    })
});


notes.delete('/:id', (req, res)=> {
    const noteToDelete = re.params.id;

    fs.readFile('./db/db.json', 'utf-8',(err, data)=>{
        if(err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            let result = parsedData.find(obj =>{
                return obj.id === noteToDelete;
            })

            const noteIndex = parsedData.indexOf(result);
            console.log(noteIndex);
            console.log(result);
            if (noteIndex > -1){
                parsedData.splice(noteIndex, 1);
            }

            fs.watchFile('./db/db.json', JSON.stringify(parsedData), (err)=>{
                if (err){
                    console.error(err)
                }
            })
            res.json(JSON.parse(data));
        }
    })
});

module.exports = notes;