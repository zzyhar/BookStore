import  express, { request }  from "express";
import {PORT, mongoDBURL} from "./config.js" 
import mongoose from "mongoose";
const app = express(); 


app.get('/', (request, response) => {
    console.log(response); 
    return response.status(200).send("Welcome to MERN Stack Book Store")
})


mongoose.connect(mongoDBURL)
        .then(() => {
            console.log("App connected to Database")
            app.listen(PORT, () => {
                console.log(`App is listening to port ${PORT}`);
            })
        })
        .catch((error) => {
            console.log(error);
        })