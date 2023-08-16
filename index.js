import express  from "express";
import path from 'path';

const app = express();
// Using middle ware
const user = [];

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true}));

// setting up View engine
app.set("view engine", "ejs");

app.get("/", (req, res)=>  {
    res.render("index", { name: "Himanshu"});
});

app.get("/success", (req, res) => {
    res.render("success");
});


app.post("/", (req, res) => {
    user.push({ username: req.body.name, email: req.body.email});

    res.redirect("/success");
});

app.get("/users", (req, res) => {
    res.json({
        users,
    });
});

app.listen(5000, () => {
    console.log("server is working");
});