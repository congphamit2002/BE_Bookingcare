import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./src/config/viewEngine";
import initWebRoutes from "./src/route/web";
import connectDB from './src/config/connectDB'

require('dotenv').config

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("RUNNING ON " + port + " PORT");
})