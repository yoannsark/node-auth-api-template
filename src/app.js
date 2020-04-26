require('dotenv').config();

const cors = require("cors");

const express = require('express')

const apiRouter = require('./routes/api')
const apiResponse = require("./helpers/apiResponse");

const mongodb = require("./databases/mongodb");

const app = express()

const { PORT = 3000 } = process.env

mongodb.init();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

app.get('/', (req, res) => res.send('API running'))

app.use("/api/", apiRouter);

app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Not found");
});

app.listen(PORT, () => console.log(`API listening at http://localhost:${PORT}`))
