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

// @ts-ignore
import express from "express";
// @ts-ignore
import * as mongoose from "mongoose";
import {userRouter} from "./routers/user.router";

// @ts-ignore
const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//lesson6 userRouter
app.use("/users", userRouter);// якщо запит йде на /users - то він зделегується на userRouter
const PORT = 5000;


app.listen(PORT, () => {
    mongoose.connect("mongodb://127.0.0.1:27017/prewiev");
    console.log(`Server has started  on port ${PORT}`);
})
