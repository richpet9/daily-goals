/**
 * Day Class
 * Description: Holds the data for a specific day
 */
export class Day {
    constructor(day) {
        this._id = day._id;
        this.dayDate = new Date(day.dayDate);
        this.dayGoals = day.dayGoals;
    }

    /**
     * isEqual() will determine if this Day is an exact reference to
     * the given Day.
     * @param {Day} otherDay The day to compare
     */
    isEqual(otherDay) {
        if (
            this._id === otherDay._id &&
            this.dayDate.getUTCDate() === otherDay.dayDate.getUTCDate() &&
            this.dayDate.getUTCMonth() === otherDay.dayDate.getUTCMonth() &&
            this.dayDate.getUTCFullYear() === otherDay.dayDate.getUTCFullYear()
        ) {
            return true;
        } else {
            return false;
        }
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
     * setGoalText() will update the given goalId with new text
     * @param {int} goalId The ID of the Goal you would like to toggle
     * @param {string} goalText The new text of the goal
     */
    setGoal(goalId, goalText) {
        this.dayGoals.forEach(goal => {
            if (goal.goalId === goalId) {
                goal.goalText = goalText;
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
     * getDayName() returns the this day's name.
     */
    getDayName() {
        //Default value/error value
        let dayName;

        switch (this.dayDate.getUTCDay()) {
            case 0:
                dayName = "Sunday";
                break;
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            default:
                dayName =
                    "Error - getDayName() Name cannot be determined: " +
                    this.dayDate.toString();
                break;
        }
        return dayName;
    }

    /**
     * getMonthName() returns the this day's month's name.
     */
    getMonthName() {
        //Default value/error value
        let dayName;

        switch (this.dayDate.getUTCMonth()) {
            case 0:
                dayName = "January";
                break;
            case 1:
                dayName = "February";
                break;
            case 2:
                dayName = "March";
                break;
            case 3:
                dayName = "April";
                break;
            case 4:
                dayName = "May";
                break;
            case 5:
                dayName = "June";
                break;
            case 6:
                dayName = "July";
                break;
            case 7:
                dayName = "August";
                break;
            case 8:
                dayName = "September";
                break;
            case 9:
                dayName = "October";
                break;
            case 10:
                dayName = "November";
                break;
            case 11:
                dayName = "December";
                break;

            default:
                dayName =
                    "Error - getMonthName() Name cannot be determined: " +
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
                    dayDate.getUTCMonth() +
                    1 +
                    "/" +
                    dayDate.getUTCDate() +
                    "/" +
                    dayDate.getUTCFullYear();
                break;
            case "-":
                returnVal =
                    dayDate.getUTCMonth() +
                    1 +
                    "-" +
                    dayDate.getUTCDate() +
                    "-" +
                    dayDate.getUTCFullYear();
                break;
            case "f":
                returnVal =
                    this.getDayName() +
                    ", " +
                    this.getMonthName() +
                    " " +
                    dayDate.getUTCDate() +
                    ", " +
                    dayDate.getUTCFullYear();
                break;
            case "f-dN":
                returnVal =
                    this.getMonthName() +
                    " " +
                    dayDate.getUTCDate() +
                    ", " +
                    dayDate.getUTCFullYear();
                break;
            case "f-Y":
                returnVal =
                    this.getDayName() +
                    ", " +
                    this.getMonthName() +
                    " " +
                    dayDate.getUTCDate();
                break;
            default:
                returnVal = "";
                break;
        }
        return returnVal;
    }

    /**
     * getDoneRatio() will return the amount of done goals divided by the
     * total amount of goals
     */
    getDoneRatio() {
        let doneGoals = 0;
        const totalGoals = this.dayGoals.length;

        this.dayGoals.forEach(goal => {
            if (goal.goalDone === true) doneGoals++;
        });

        if (totalGoals === 0) return 0;

        return doneGoals / totalGoals;
    }
}

export default Day;
