const express = require('express');
const cors = require('cors')
const db = require('./database');
const postRoute = require('./router')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/article', postRoute);

app.listen(3001)

