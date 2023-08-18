import express  from "express";
import mongoose from "mongoose";
import path from 'path';


mongoose
    .connect("mongodb://127.0.0.1:27017", {
        dbName: "backend",
})
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
    name : String,
    email: String,
});

const Message = mongoose.model("Message", messageSchema)

const app = express();


// Using middle ware
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


app.post("/contact", async(req, res) => {

  const {name, email} = req.body;

  await Message.create({ name, email});
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