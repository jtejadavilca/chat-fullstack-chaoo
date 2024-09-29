require("dotenv").config();
const config = require("./config.json");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("debug", true);

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/chatRoutes")); // /api/users/:chatId/*
app.use("/api/chats", require("./routes/messageRoutes")); // /api/chats/:chatId/*

mongoose.connect(config.connectionString).then(() => {
    console.log("Connected to MongoDB");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
