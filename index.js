const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//instancias de routes
const studentsRouter = require("./routes/studentRoutes");

//Definicion de routes
app.use("/alumno", studentsRouter);

app.listen(3000);
