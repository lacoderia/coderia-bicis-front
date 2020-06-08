'use strict';

function CalendarDay(date, spinningClasses) {

    // Private variables
    var _date = undefined;
    var _spinningClasses = [];

    /**
     *
     * @param id
     * @param instructor
     * @param date
     */
    this.constructor = function(date, spinningClasses) {
        this.setDate(date);
        this.setSpinningClasses(spinningClasses);
    };

    /**
     *
     * @param date
     */
    this.setDate = function(date) {
        _date = date;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDate = function() {
        return _date;
    };

    /**
     *
     * @param spinningClasses
     */
    this.setSpinningClasses = function(spinningClasses) {
        _spinningClasses = spinningClasses;
    };

    /**
     *
     * @returns {Array}
     */
    this.getSpinningClasses = function() {
        return _spinningClasses;
    };

    /**
     *
     * @param spinningClass
     */
    this.addSpinningClass = function(spinningClass) {
        _spinningClasses.push(spinningClass);
    };

    this.constructor(date, _spinningClasses);

};