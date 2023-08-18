import express  from "express";
import mongoose from "mongoose";
import path from 'path';
import cookieParser from "cookie-parser";


mongoose
    .connect("mongodb://127.0.0.1:27017", {
        dbName: "backend",
})
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
});

const User = mongoose.model("User", userSchema)

const app = express();


// Using middle ware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// setting up View engine
app.set("view engine", "ejs");

const isAUthenticated = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        next();
    }else {
        res.render("login");
    }
};

app.get("/", isAUthenticated, (req, res) =>  {
  res.render("logout");
});


app.post('/login', async (req, res)=>{
    const {name , email} = req.body;

    const user = await User.create({
        name,
        email,
    });



    res.cookie("token", user._id ,{
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now() ),
    });
    res.redirect("/");
});




app.listen(5000, () => {
    console.log("server is working");
});