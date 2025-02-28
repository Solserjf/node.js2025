// const {sayHello} = require('./helper.js');
//
// sayHello();

// const path = require('path');
// const joinedPath = path.join('test', 'test2', 'test3');//test/test2/test3 - поєднує введені шляхи
// const joinedPath2 = path.join(__dirname, 'test', 'helper.js');///home/serhii/IdeaProjects/node.js2025/test/helper.js
// const normalizedPath = path.normalize('///test//helper.js///');///test/helper.js/


// console.log(joinedPath);
// console.log(joinedPath2);
// console.log(normalizedPath);
///OC
// const os = require('os');
// console.log(os.arch());
// console.log(os.cpus());

//FS
// const fs = require('fs');
// fs.readFile(path.join(__dirname, 'test', 'text.txt'), {encoding: "utf-8" }, (err, data) => {
//     if (err) throw new Error();
//     {
//        console.log(data);
//     }
// })
//
// fs.writeFile(path.join(__dirname, 'test', 'text2.txt'), 'Hello from Okten',{encoding: "utf-8"}, (err) => {
//     if (err) throw new Error();
// })
////lesson 4 - express
const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 5000;

const hubkaBobs = [
    {
        name: "sponge bob 1",
        age: 8,
        gender: "male",
    },
    {
        name: "sponge bob 2",
        age: 9,
        gender: "male",
    },
    {
        name: "sponge bob 3",
        age: 15,
        gender: "male",
    },
    {
        name: "sponge bob 4",
        age: 18,
        gender: "male",
    },
    {
        name: "sponge bob 5",
        age: 79,
        gender: "male",
    },

]
app.get('/hubkaBobs', (req, res) => {//наш обробник
    // console.log(res);
    // res.send('Hello scubydu!');
    //request to db to get info
    // res.json({
    //     status: 'success',
    //     name: "sponge bob",
    //     age: 18,
    // gender: "male",
    // })
    res.json(hubkaBobs);
})
app.post('/hubkaBobs', (req, res) => {
// console.log("POST request to  hubkaBobs");
// console.log(req.body);
    const hubkabobs = req.body;
    hubkaBobs.push(hubkabobs);

    res.status(201).json({message: 'HubkaBobs added successfully'});
})

app.put('/hubkaBobs/:id', (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    const updatedHubkaBob = req.body;
    hubkaBobs[+id] = updatedHubkaBob;
    res.status(200).json({message: 'HubkaBobs updated',
    data: hubkaBobs[+id]});

})

app.delete('/hubkaBobs/:id', (req, res) => {
    const { id } = req.params;

    hubkaBobs.splice(+id, 1);
    res.status(200).json({message: 'HubkaBobs deleted'});

})
app.listen(PORT, () => {
    console.log(`Server has started  on port ${PORT}`);
})
