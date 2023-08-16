import express  from "express";

const app = express();
// setting up View engine
app.set("view engine", "ejs");

app.get("/", (req, res)=>  {
    res.render("index", {name: "Himanshu"});
});

app.listen(5000, () => {
    console.log("server is working");
});