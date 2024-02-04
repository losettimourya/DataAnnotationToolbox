import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
app.use(cors());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'build')));

import objectsRoute from './routes/objects.js';
import getURL from './routes/getURL.js';
import deleteBucket from './routes/deleteBucket.js';
import deleteObject from './routes/deleteObject.js';
import count from './routes/count.js';

app.use('/hv/objects', objectsRoute);
app.use('/hv/getURL', getURL);
app.use('/hv/deleteBucket', deleteBucket);
app.use('/hv/deleteObject', deleteObject);
app.use('/hv/count', count);


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5001, function () {
    console.log("Server started on port 5001");
});