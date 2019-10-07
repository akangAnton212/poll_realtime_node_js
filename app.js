const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

//db config
require("./config/db");

const app = express();

const route = require("./routes/routes");

app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(cors());

app.use("/poll", route);

const port = 6534;

app.listen(port, () => console.log("Aplikasi running di port " +port));