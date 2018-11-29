import Day from "./Day"; //Require the day class
/**
 * DayAPI Class Singleton
 * Description: The interface to interact with the Day data recieved from MongoDB.
 * Before this API is functional, response must be set with setResDays(). setResDays()
 * expects a JSON object structured:
 *  {
 *      _id: int,
 *      dayDate: Date,
 *      dayGoals: [
 *          {
 *              goalId: Int,
 *              goalText: String,
 *              goalDone: Bool
 *          }
 *      ]
 *  }
 */
export class DayAPI {
    response = []; //This is the response from the constructor

    /**
     * setResDays() sets the response array in DayAPI
     * @param {JSON} response The response from the database
     */
    setResDays(response) {
        response.forEach(day => {
            this.response.push(new Day(day));
        });
    }

    /**
     * getResDays() gets the response array in DayAPI
     */
    getResDays() {
        return this.response;
    }

    /**
     * getToday() will return the current day
     */
    getToday() {
        const TODAY_DATE = new Date();
        let today;

        //For every day in the database response
        this.response.forEach(day => {
            const dateToCompare = new Date(day.dayDate);

            if (dateToCompare.toDateString() === TODAY_DATE.toDateString()) {
                //Today was found within the database response
                today = day;
            }
        });

        if (!today) {
            //Today is not stored in the database, so just get a new day!
            today = this.getDayByDate(TODAY_DATE);
        }

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
            const dateToCompare = day.dayDate;

            if (dateToCompare.toDateString() === date.toDateString()) {
                targetDay = day;
            }
        });

        //If the above search failed, return a new day with the searched for date but do not create a reference
        if (targetDay == null) {
            targetDay = {
                _id: this.response.length,
                dayDate: date.setUTCHours(0),
                dayGoals: []
            };
            const newDay = new Day(targetDay);
            return newDay;
        }

        return targetDay;
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
        if (day.getDayName() === "Sunday") {
            //This day is a Monday
            firstSunday = day;
        } else {
            //Go backwards until we hit the first Sunday
            let search = true; //Loop controller
            let dayToCheck = day; //The day to check within the loop

            //Linear search backwards
            while (search) {
                //Assign dayToCheck to the previous day
                dayToCheck = this.getPreviousDay(dayToCheck);

                //If dayCheck is a Sunday
                if (dayToCheck.getDayName() === "Sunday") {
                    search = false; //Stop the loop
                    firstSunday = dayToCheck; //Assign first Sunday to this day
                }
            }
        }

        //Now that we have the first Sunday, we can go through the next 7 days, add them
        //to an array, and return that array
        const week = this.getDayRange(firstSunday, 7);

        return week;
    }

    /**
     * getMonthOf() takes a day and returns an array length 7 of the days within that month.
     * months start on Mondays.
     * Richie's first algorithm!!
     * @param {Day} day The day of which we want to retrieve the month
     */
    getMonthOf(day) {
        //If we aren't given a day
        if (!day) {
            console.log("Error- Requested getMonthOf without a day parameter");
            return;
        }

        //Get first day of input day's month
        let firstDay = this.getDayByDate(
            new Date(
                day.dayDate.getUTCFullYear(),
                day.dayDate.getUTCMonth() /*no plus one here?*/,
                1
            )
        );

        //If the last day of the month isn't a Sunday (for format purposes)
        if (firstDay.getDayName() !== "Sunday") {
            let search = true; //Search controller
            while (search) {
                //Set lastDay to the next day
                firstDay = this.getPreviousDay(firstDay);

                //If lastDay is saturday,
                if (firstDay.getDayName() === "Sunday") {
                    search = false; //Stop the search
                }
            }
        }

        //Now that we have the first day, we can go through the next 7 days, add them
        //to an array, and return that array
        let lastDay = this.getDayByDate(
            new Date(
                day.dayDate.getUTCFullYear(),
                day.dayDate.getUTCMonth() + 1, //Please god explain to me why this plus one is here but not above
                0
            )
        );

        //If the last day of the month isn't a Saturday (for format purposes)
        if (lastDay.getDayName() !== "Saturday") {
            let search = true; //Search controller
            while (search) {
                //Set lastDay to the next day
                lastDay = this.getNextDay(lastDay);

                //If lastDay is saturday,
                if (lastDay.getDayName() === "Saturday") {
                    search = false; //Stop the search
                }
            }
        }

        //The month data is the day range between the first and last days
        const month = this.getDayRange(firstDay, lastDay);

        return month;
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
            let currentDay = dayOne;
            const last = dayTwo;

            returnDays.push(currentDay);

            for (let id = 1; id < last; id++) {
                returnDays.push(this.getNextDay(currentDay));
                currentDay = this.getNextDay(currentDay);
            }

            return returnDays;
        } else {
            let currentDay = dayOne;
            let next = true;

            //First push the first day
            returnDays.push(currentDay);

            //Then begin the looping of next days until
            while (next) {
                currentDay = this.getNextDay(currentDay);

                //We hit the last day
                if (currentDay.isEqual(dayTwo)) {
                    next = false;
                }

                //Push the current Day
                returnDays.push(currentDay);
            }

            return returnDays;
        }
    }

    /**
     * getDaysInMonth() will return the amount of days in the given month/year combo.
     * This method is borrowed from stackOverflow.
     * @param {int} month 1-12; 1 = January, 2 = February, etc.
     * @param {int} year YYYY
     */
    getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate() - 1;
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
     * memory reference to the result. A future method will sync this file with the database
     * (THIS IS A REALLY BAD WAY OF DOING THIS, IMPLEMENT THE DATABASE AFTER MONTHS)
     * @param {Day} day The day to push into the API memory
     */
    pushDay(day) {
        //Control variable so we know if the array updated
        let updated = false;
        //(Linear search) Loop through the days and update them if this day matches, add it if not
        for (let index = 0; index < this.response.length; index++) {
            if (this.response[index]._id === day._id) {
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

export default DayAPI;
