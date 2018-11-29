//Require Server stuff
const express = require("express"); //Require Express
const path = require("path"); //Require Path
const bodyParser = require("body-parser");

//Require database stuff
const MongoClient = require("mongodb").MongoClient; //Require client
const assert = require("assert"); //Require assert

const app = express(); //Create the Express app
const port = process.env.PORT || 3002; //Set the port

//Use middleware for handling POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Forward the frontend
app.use("/", express.static(path.join(__dirname, "frontend/build")));

//Database variables
const url = "mongodb://localhost:27017";
const options = { useNewUrlParser: true };
const dbName = "dailygoals";

//Connect to the database
//NOTE: this is not a secure connection
MongoClient.connect(
    url,
    options,
    (err, client) => {
        assert.strictEqual(
            err,
            null,
            "[mongodb] Could not connect to database: " + err
        );

        //We are now connected to DB
        console.log("[mongodb] Successfully connected to database.");

        //Set the current database and collection
        dailygoals = client.db(dbName).collection("days");

        //Handle a POST to /api/days/:id
        app.post("/api/days/:id", (req, res) => {
            const id = Number(req.params.id); //Id to update from URL
            const body = req.body; //Body of the request

            const query = { _id: id }; //The update CRUD query selector
            const update = {
                //The values to update
                $set: {
                    _id: body._id,
                    dayDate: body.dayDate,
                    dayGoals: body.dayGoals
                }
            };
            const options = { upsert: true }; //The options for the update

            //Update the collection where specified with our new data
            dailygoals.updateOne(query, update, options, (err, results) => {
                assert.strictEqual(
                    err,
                    null,
                    `[mongodb] /api/days/${id}: Could not update document: ${err}.`
                );

                //Successful save
                console.log(
                    `[mongodb] /api/days/${id}: Saved 1 document to database.`
                );

                //Respond with the data upserted
                res.send(req.body);
            });
        });

        //Handle GET to /api/days
        app.get("/api/days", (req, res) => {
            //Get all documents in the collection
            dailygoals.find().toArray((err, results) => {
                assert.strictEqual(
                    err,
                    null,
                    "[mongodb] /api/days: Could not get documents: " + err
                );

                //Success, respond with all documents
                console.log("[mongodb] /api/days: request succesful.");
                res.send(results);
            });
        });

        //Handle GET to /api/days/:id
        app.get("/api/days/:id", (req, res) => {
            const id = Number(req.params.id); //Id to update from URL

            //Get all documents in the collection
            dailygoals.find({ _id: id }).toArray((err, results) => {
                assert.strictEqual(
                    err,
                    null,
                    `[mongodb] /api/days/${id}: Could not get documents: ${err}.`
                );

                //Success, respond with all documents
                console.log(`[mongodb] /api/days/${id}: request succesful.`);
                res.send(results);
            });
        });
    }
);

//Set the listening port even if DB connection is unsuccessful
app.listen(port, () => console.log(`[server] Listening on port ${port}`));

module.exports = app;
