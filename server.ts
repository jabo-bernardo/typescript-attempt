import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app: express.Application = express();

/* Connect! */
mongoose.connect("mongodb://localhost:27017/ts-test");

/* Databse connection */
const db = mongoose.connection;
db.on("error", err => {
    /* Triggered error */
    console.error(`Soemthing went wrong: ${err}`);
});
db.once("open", () => {
    /* Success Connect! */
    console.log("Successfully connected to Database");
})

/* App Config */
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

/* Router Declarations */
import indexRouter from './routes/index';
app.use("/", indexRouter);

const PORT: string = process.env.PORT || "8080";
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));