const express = require("express"); //Require Express
const path = require("path"); //Require Path

const app = express(); //Create the Express app
const port = process.env.PORT || 5000; //Set the port

//Forward the frontend
app.use("/", express.static(path.join(__dirname, "frontend/build")));

//Set the listening port
app.listen(port, () => console.log(`Listening on port ${port}`));
