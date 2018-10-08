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
        return new Day(this.response[this.response.length - 1]);
    }

    /**
     * getDayByDate() returns a day found with date.
     * @param {int} num The numerical day to get (DD)
     * @param {int} month The numerical month to get (MM)
     * @param {int} year The numerical year to get (YYYY)
     */
    getDayByDate(num, month, year) {
        let targetDay = null; //The day info we will return

        //For every day in the response, search the year month and num until you find a match
        this.response.forEach(day => {
            if (day.dayYear === year) {
                if (day.dayMonth === month) {
                    if (day.dayNum === num) {
                        targetDay = day; //Set this data set to the target day
                    }
                }
            }
        });

        //If the above search failed, return a new day
        if (targetDay == null) {
            targetDay = {
                dayId: this.getToday().dayId + 1,
                dayName: this.getNextDayName(this.getToday()),
                dayNum: num,
                dayMonth: month,
                dayYear: year,
                dayGoals: []
            };
        }
        return new Day(targetDay);
    }

    /**
     * Hopefully this function is temporary. Retrieves the next day's name
     * @param {Day} day The day to reference for next
     */
    getNextDayName(day) {
        let name;
        switch (day.dayName) {
            case "Sunday":
                name = "Monday";
                break;
            case "Monday":
                name = "Tuesday";
                break;
            case "Tuesday":
                name = "Wednesday";
                break;
            case "Wednesday":
                name = "Thursday";
                break;
            case "Thursday":
                name = "Friday";
                break;
            case "Friday":
                name = "Satruday";
                break;
            case "Saturday":
                name = "Sunday";
                break;
            default:
                name = day.dayName;
                break;
        }
        return name;
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
        this.dayNum = day.dayNum;
        this.dayMonth = day.dayMonth;
        this.dayYear = day.dayYear;
        this.dayName = day.dayName;
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

    addGoal(goalText, goalDone) {
        const done = goalDone || false;
        const text = goalText;
        const id = this.dayGoals.length ? this.dayGoals.length : 0;

        this.dayGoals.push({ goalId: id, goalText: text, goalDone: done });
        return this;
    }
}

export default DayAPI;
