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
        //DEBUG: until I go live with a database, "today" will be 11/16/2018
        const TODAY_DATE = new Date("2018-11-16");
        let today;
        this.response.forEach(day => {
            const dateToCompare = new Date(day.dayDate);

            if (dateToCompare.toDateString() === TODAY_DATE.toDateString()) {
                today = new Day(day);
            }
        });
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
                dayId: this.response.length,
                dayDate: date,
                dayGoals: []
            };
        }

        const newDay = new Day(targetDay);
        this.pushDay(newDay);
        return newDay;
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
        let firstMonday;

        //Determine if this day is a Monday
        if (day.getDayName() === "Monday") {
            //This day is a Monday
            firstMonday = day;
        } else {
            //Go backwards until we hit the first Monday
            let search = true; //Loop controller
            let dayToCheck = day; //The day to check within the loop

            //Linear search backwards
            while (search) {
                //Assign dayToCheck to the previous day
                dayToCheck = this.getPreviousDay(dayToCheck);

                //If dayCheck is a Monday
                if (dayToCheck.getDayName() === "Monday") {
                    search = false; //Stop the loop
                    firstMonday = dayToCheck; //Assign first Monday to this day
                }
            }
        }

        //Now that we have the first Monday, we can go through the next 7 days, add them
        //to an array, and return that array
        const week = this.getDayRange(firstMonday, 6);

        return week;
    }

    /**
     * getDayRange() will return an array of days between the first day given, and the numerical range
     * or second day given (inclusive).
     * @param {Day} dayOne The first day (inclusive) in the range
     * @param {Day/Int} dayTwo Either the second day in the range, or an int
     */
    getDayRange(dayOne, dayTwo) {
        let returnDays = [];

        //If the second variable is an int instead of a Day
        if (typeof dayTwo === "number") {
            const last = dayTwo;
            let currentDay = dayOne;

            returnDays.push(currentDay);

            for (let id = 0; id < last; id++) {
                returnDays.push(this.getNextDay(currentDay));
                currentDay = this.getNextDay(currentDay);
            }

            return returnDays;
        } else {
            return 'THIS HASN"T BEEN IMPLEMENTED YET!!';
        }
    }

    /**
     * logAPIResponse() will simply log the current value of DayAPI.state.response
     */
    logAPIResponse() {
        console.log(this.response);
    }

    /**
     * pushDay() will push a session reference to this day to the API, so it won't create
     * replicas of the Day in memory.
     * NOTE: This does not update the database (testing: the JSON file), only the
     * memory reference to the result.
     * @param {Day} day The day to push into the API memory
     */
    pushDay(day) {
        //Control variable so we know if the array updated
        let updated = false;
        //(Linear search) Loop through the days and update them if this day matches, add it if not
        for (let index = 0; index < this.response.length; index++) {
            if (this.response[index].dayId === day.dayId) {
                //The day already exists, so update the goals
                this.response[index] = day;
                return day;
            } else {
                //The day does not exist
                updated = false;
            }
        }
        //If the array did not update, push the day into it
        if (!updated) this.response.push(day);
        //Exit by returning the new day reference
        return day;
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
                console.log("hi");
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
     * getDateFormatted() will return a string of this day's formatted date
     * @param {String} type The format to return: /, -, f
     */
    getDateFormatted(type) {
        if (typeof type !== "string") {
            return "getDateFormatted - Attempted to create formatted date without type";
        }

        const { dayDate } = this;
        let returnVal;

        switch (type) {
            case "/":
                returnVal =
                    dayDate.getMonth() +
                    1 +
                    "/" +
                    (dayDate.getDate() + 1) +
                    "/" +
                    dayDate.getFullYear();
                break;
            case "-":
                returnVal =
                    dayDate.getMonth() +
                    1 +
                    "-" +
                    (dayDate.getDate() + 1) +
                    "-" +
                    dayDate.getFullYear();
                break;
            case "f":
                returnVal =
                    dayDate.getMonth() +
                    1 +
                    "-" +
                    (dayDate.getDate() + 1) +
                    "-" +
                    dayDate.getFullYear();
                break;
        }
        return returnVal;
    }
}

export default DayAPI;
