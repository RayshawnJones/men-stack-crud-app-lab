const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);



app.set("view engine", "ejs");

app.use('/articles', articleRouter);

app.get("/", (req, res) => {
  const articles = [{
    title: 'Test Article',
    createdAt: new Date(),
    description: 'Test description'
  },{
    title: 'Test Article 2',
    createdAt: new Date(),
    description: 'Test description 2'
  }]
  res.render("index", {articles: articles});
});


mongoose.connection.on("connected", () => {
  console.log(`MongoDB ${mongoose.connection.name} connected`);
});
app.listen(3000)