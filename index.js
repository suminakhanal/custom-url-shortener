const express = require("express");
const path = require ("path");
const {connectTOMongoDB} = require("./connect");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT=8001;

connectTOMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());


app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);

app.use("/", staticRouter);

app.get("/url/:shortID",async (req, res)=> {
    const shortID=req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server Started at PORT: ${PORT}`))
