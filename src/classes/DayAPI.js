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
        let targetDay = null;
        this.response.forEach(day => {
            if (day.dayYear === year) {
                if (day.dayMonth === month) {
                    if (day.dayNum === num) {
                        targetDay = day;
                    }
                }
            }
        });
        return new Day(targetDay);
    }

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
        this.dayGoals = day.dayGoals;
    }

    /**
     * toggleGoal() will toggle the "done-ness" of a goal in this day
     * @param {int} goalId The ID of the Goal you would like to toggle
     */
    toggleGoal(goalId) {
        this.dayGoals[goalId].goalDone = !this.dayGoals[goalId].goalDone;
        return this;
    }
}

export default DayAPI;
