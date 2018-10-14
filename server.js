//Require Server stuff
const express = require("express"); //Require Express
const path = require("path"); //Require Path
const bodyParser = require("body-parser");

//Require database stuff
const MongoClient = require("mongodb").MongoClient; //Require client
const assert = require("assert"); //Require assert

const app = express(); //Create the Express app
const port = process.env.PORT || 5000; //Set the port

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
        assert.strictEqual(err, null);

        //We are now connected to DB
        console.log("[MongoDB] Successfully connected to database.");

        //Set the current database and collection
        dailygoals = client.db(dbName).collection("dailygoals");

        //Handle a POST to /api/days/:id
        app.post("/api/days/:id", (req, res) => {
            const id = Number(req.params.id); //Id to update from URL
            const body = req.body; //Body of the request

            const query = { dayId: id }; //The update CRUD query selector
            const update = {
                //The values to update
                $set: {
                    dayId: body.dayId,
                    dayDate: body.dayDate,
                    dayGoals: body.dayGoals
                }
            };
            const options = { upsert: true }; //The options for the update

            //Update the collection where specified with our new data
            dailygoals.updateOne(query, update, options, (err, results) => {
                assert.strictEqual(err, null);

                //Successful save
                console.log(
                    "Saved " + results.modifiedCount + " document to database."
                );

                //Respond with the data upserted
                res.send(req.body);
            });
        });

        //Handle GET to /api/days
        app.get("/api/days", (req, res) => {
            //Get all documents in the collection
            dailygoals.find().toArray((err, results) => {
                assert.strictEqual(err, null);

                //Success, respond with all documents
                res.send(results);
            });
        });
    }
);

//Set the listening port
app.listen(port, () => console.log(`[server] Listening on port ${port}`));

module.exports = app;
