import express  from "express";
import path from "path";

const app = express();

app.get("/", (req, res)=>{
    const pathlocation = path.resolve();

    res.render()
});

app.listen(5000, () => {
    console.log("server is working");
});