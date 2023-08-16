import express  from "express";
import path from 'path'

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));

// setting up View engine
app.set("view engine", "ejs");

app.get("/", (req, res)=>  {
    res.render("index", {name: "Himanshu"});
});

app.listen(5000, () => {
    console.log("server is working");
});