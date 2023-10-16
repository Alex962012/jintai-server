import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import { productsRoute } from "./routes/productsRoute.js";
import { sequelize } from "./db.js";
import { typeRoute } from "./routes/typeRoute.js";
import { userRoute } from "./routes/userRoute.js";
import fileUpload from "express-fileupload";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = process.env.PORT || 2000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/product", productsRoute);
app.use("/type", typeRoute);
app.use("/user", userRoute);

const start = async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync()

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();