const express = require("express");
const {connectTOMongoDB} = require("./connect");

const urlRoute = require("./routes/url")
const app = express();
const PORT=8001;

connectTOMongoDB("mongodb://localhost:27017/short-url")

.then(()=>console.log("Mongodb connected"));

app.use("/url", urlRoute);

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
