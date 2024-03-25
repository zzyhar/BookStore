import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js"
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());
// app.use(
//     cors({
//         origin : 'http:/localhost:3000', 
//         methods : ['GET', 'POST', 'PUT', 'DELETE'], 
//         allowedHeaders : ['Content-Type']
//     })
// )

app.get("/", (request, response) => {
  console.log(response);
  return response.status(200).send("Welcome to MERN Stack Book Store");
});


app.use('/books', bookRoutes)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
