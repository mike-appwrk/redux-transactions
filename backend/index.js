import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import { notFound } from "./handlers/errorHandlers.js"

dotenv.config({ path: 'variables.env' });

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE);

const { connection: db } = mongoose;

db.on('error', (error) => {
  console.log("----Mongo is Erred ----", error.message);
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.use(notFound);

app.set('port', process.env.PORT || 7677);

const server = app.listen(app.get('port'), () => {
  console.log('Server is running at port: ', server.address().port)
});
