import  express, { request, response }  from "express";
import {PORT, mongoDBURL} from "./config.js" 
import mongoose from "mongoose";
import {Book} from './models/bookModel.js'

const app = express(); 

// Middleware for parsing request body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(response); 
    return response.status(200).send("Welcome to MERN Stack Book Store")
})

app.post('/books', async (request, response) => { 
    try{
        if ( 
        !request.title ||
        !request.author ||
        !request.publishYear 
        ){
            return response.status(400).send({
                message : "Send all required fields: title, author, publishYear"
            })
        }

        const newBook = { 
            title : request.body.title, 
            author : request.body.author, 
            publishYear : request.body.publishYear, 
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book)

    }catch(error){
        console.log(error);
        return response.status(500).send({message : error.message})
    }
})

// Route for Get all Books from database
app.get('/books', async (request, response) => { 
    try {

        const books = await Book.find({});
        return response.status(200).json({
            count:  books.length,
            data: books
        });

    }catch(error){
        console.log(error.message); 
        response.status(500).send({message : error.message})
    }
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