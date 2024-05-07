const express = require("express");
const thoughtRouter = require("./routes/thoughts");
const methodOverride = require("method-override");
const Thought = require("./models/thought");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { render } = require("ejs");

mongoose.connect(process.env.MONGODB_URI);


app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const thoughts = Thought.find().sort({createdAt: "desc"}); 
res.render("thoughts/home.ejs", {thoughts:thoughts});
})





mongoose.connection.on("connected", () => {
  console.log(`MongoDB ${mongoose.connection.name} connected`);
});

app.use('/thoughts', thoughtRouter);

app.listen(3000)