import express, { Application } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
require('express-async-errors')
import morgan from "morgan";
import router from './modules/routes'
import './connections/mongodb';
import { errorHandler } from './middlewares';
import upload from 'express-fileupload'

declare global {
    namespace Express {
      interface Request {
        user: any
      }
    }
  }

const app: Application = express();
const port: Number = Number(process.env.PORT) || 3005;

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(upload());

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
    console.log('Connect to server ', port);
});