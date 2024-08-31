require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

///part of mongo
const mongoose = require("mongoose");
const dbURL = `mongodb://127.0.0.1:27017/${process.env.DBNAME}`;

mongoose.set("strictQuery", true);
mongoose.connect(dbURL, {});

let port = process.env.PORT || 3000;


app.use("/product", require('./routes/product_route'));


app.use((err, req, res, next) => {
    console.log(err);
    var code = err.status || 500;
    res.status(code == 200 ? 500 : code).json({
        status: false,
        message: err.message,
        data: null,
    });
});

app.listen(port,()=> console.log(`listening on PORT ${port}`));