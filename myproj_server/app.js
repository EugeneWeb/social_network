const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const morgan = require("morgan");
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());

app.listen(process.env.PORT, (err) => (err ? console.log(err) : null));

const ch = require("chalk");
const successMsg = ch.bgKeyword("green").white;
const errorMsg = ch.bgKeyword("white").red;

const mongoose = require("mongoose");
const db = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(successMsg(`Connected to ${process.env.DB_NAME}`)))
    .catch((err) => console.log(errorMsg(err)));

const apiAllUsersRoutes = require("./routes/users-routes/api-all-users-routes");

app.use("/api/user", apiAllUsersRoutes);
