/**
 * * For testing purpose the database is being represented
 * by a JSON file located in src called "userDays.json".
 * * This file is being fetched in the react app when a client
 * connects, then sent to this class for easier interaction.
 * * All instances of writing to the file should be replaced with
 * Database queries.
 */

/**
 * DayAPI Class
 * Description: The interface to interact with the Day data
 */
export class DayAPI {
    response = {}; //This is the response from the constructor, will be replaced with database response

    /**
     * Constructor will take in JSON data in the structure outlined in userDays.json
     * @param {JSON} daysJSON JSON data of the days
     */
    constructor(daysJSON) {
        this.response = daysJSON;
    }

    /**
     * getToday() will return the current day
     */
    getToday() {
        //TODO: This is temporary because no database is being used
        const today = new Day(this.response[this.response.length - 1]);
        return today;
    }

    /**
     * getDayByDate() returns a day found with date, or a new day with the specified date.
     * @param {Date} date The numerical date to attempt retreive
     */
    getDayByDate(date) {
        let targetDay = null; //The day info we will return

        //For every day in the response, search the year month and num until you find a match
        this.response.forEach(day => {
            //Set the date that we will compare to the requested date
            const dateToCompare = new Date(day.dayDate);

            if (dateToCompare.toDateString() === date.toDateString()) {
                targetDay = day;
            }
        });

        //If the above search failed, return a new day with the searched for date
        if (targetDay == null) {
            targetDay = {
                dayId: this.getToday().dayId + 1,
                dayDate: date,
                dayGoals: []
            };
        }
        return new Day(targetDay);
    }

    /**
     * getNextDay() will return the next day relative to the input day
     * @param {Day} day The day to reference
     */
    getNextDay(day) {
        //Get the nextDate/add a day in miliseconds
        const nextDate = new Date(day.dayDate.getTime() + 86400000);
        //Return the day located at this date
        return this.getDayByDate(nextDate);
    }

    /**
     * getPreviousDay() will return the Previous day relative to the input day
     * @param {Day} day The day to reference
     */
    getPreviousDay(day) {
        //Get the PreviousDate/add a day in miliseconds
        const previousDate = new Date(day.dayDate.getTime() - 86400000);
        //Return the day located at this date
        return this.getDayByDate(previousDate);
    }

    /**
     * getWeekOf() takes a day and returns an array length 7 of the days within that week.
     * Weeks start on Mondays.
     * @param {Day} day The day of which we want to retrieve the week
     */
    getWeekOf(day) {
        //If we aren't given a day
        if (!day) {
            console.log("Error- Requested getWeekOf without a day parameter");
            return;
        }

        //The first day of this week
        let firstSunday;

        //Determine if this day is a Sunday
        if (day.getDayName() === "Monday") {
            //This day is a Sunday
            firstSunday = day;
        } else {
            //Go backwards until we hit the first Sunday
            let search = true; //Loop controller
            let dayToCheck = day; //The day to check within the loop

            while (search) {
                //Assign dayToCheck to the previous day
                dayToCheck = this.getPreviousDay(dayToCheck);

                //If dayCheck is a sunday
                if (dayToCheck.getDayName() === "Monday") {
                    search = false; //Stop the loop
                    firstSunday = dayToCheck; //Assign first sunday to this day
                }
            }
        }

        return firstSunday.getDayName();
    }

    /*
    pushDay(day) {
        fs.readFile("../userDays.json", "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                //Read the file as an object
                let obj = JSON.parse(data);

                //Push the new day into the object
                obj.push(day);

                //Convert it to json
                const json = JSON.stringify(obj);

                //Write it back
                fs.writeFile("../userDays.json", json, "utf8");
            }
        });
    }
    */
    /**
     * logAPIResponse() will simply log the current value of DayAPI.state.response
     */
    logAPIResponse() {
        console.log(this.response);
    }
}

/**
 * Day Class
 * Description: Holds the data for a specific day
 */
class Day {
    constructor(day) {
        this.dayId = day.dayId;
        this.dayDate = new Date(day.dayDate);
        this.dayGoals = day.dayGoals;
    }

    /**
     * toggleGoal() will toggle the "done-ness" of a goal in this day
     * @param {int} goalId The ID of the Goal you would like to toggle
     */
    toggleGoal(goalId) {
        this.dayGoals.forEach(goal => {
            if (goal.goalId === goalId) {
                goal.goalDone = !goal.goalDone;
            }
        });
        return this;
    }

    /**
     * addGoal() will add a goal to the current day object (not database), and return the day
     * @param {String} goalText The text of the goal
     * @param {Boolean} goalDone The boolean done-ness of this goal
     */
    addGoal(goalText, goalDone) {
        const done = goalDone || false;
        const text = goalText;
        const id = this.dayGoals.length ? this.dayGoals.length : 0;

        this.dayGoals.push({ goalId: id, goalText: text, goalDone: done });
        return this;
    }

    /**
     * dayName() returns the this day's name.
     */
    getDayName() {
        //Default value/error value
        let dayName;

        switch (this.dayDate.getDay()) {
            case 0:
                dayName = "Monday";
                break;
            case 1:
                dayName = "Tuesday";
                break;
            case 2:
                dayName = "Wednesday";
                break;
            case 3:
                dayName = "Thursday";
                break;
            case 4:
                dayName = "Friday";
                break;
            case 5:
                dayName = "Saturday";
                break;
            case 6:
                dayName = "Sunday";
                break;
            default:
                dayName =
                    "Error - dayName() Name cannot be determined: " +
                    this.dayDate.toString();
                break;
        }
        return dayName;
    }

    /**
     * formatDateSlash() will return a string of this day's formatted date
     */
    formatDateSlash() {
        const { dayDate } = this;
        return (
            dayDate.getMonth() +
            1 +
            "/" +
            (dayDate.getDate() + 1) +
            "/" +
            dayDate.getFullYear()
        );
    }
}

export default DayAPI;
