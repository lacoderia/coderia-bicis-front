'use strict';

function Appointment(id, instructorName, status, bikeNumber, date, spinningClass) {

    // Private variables
    var _id = undefined;
    var _instructorName = undefined;
    var _status = undefined;
    var _bikeNumber = undefined;
    var _date = undefined;
    var _spinningClass = undefined;

    /**
     *
     * @param id
     * @param instructorName
     * @param status
     * @param bikeNumber
     * @param date
     */
    this.constructor = function(id, instructorName, status, bikeNumber, date, spinningClass) {
        this.setId(id);
        this.setInstructorName(instructorName);
        this.setStatus(status);
        this.setBikeNumber(bikeNumber);
        this.setDate(date);
        this.setSpinningClass(spinningClass);
    };

    /**
     *
     * @returns {undefined}
     */
    this.getId = function() {
        return _id;
    };

    /**
     *
     * @param id
     */
    this.setId = function(id) {
        _id = id;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getInstructorName = function() {
        return _instructorName;
    };

    /**
     *
     * @param instructorName
     */
    this.setInstructorName = function(instructorName) {
        _instructorName = instructorName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getStatus = function() {
        return _status;
    };

    /**
     *
     * @param status
     */
    this.setStatus = function(status) {
        _status = status;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBikeNumber = function() {
        return _bikeNumber;
    };

    /**
     *
     * @param bikeNumber
     */
    this.setBikeNumber = function(bikeNumber) {
        _bikeNumber = bikeNumber;
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
     * @param date
     */
    this.setDate = function(date) {
        _date = (date)? moment(date) : undefined;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getSpinningClass = function() {
        return _spinningClass;
    };

    /**
     *
     * @param spinningClass
     */
    this.setSpinningClass = function(spinningClass) {
        _spinningClass = spinningClass;
    };

    /**
     * Prints object string
     * @returns {string}
     */
    this.toString = function() {
       return 'Appointment: {' +
           ' id: ' + this.getId() +
           ', instructor_name: ' + this.getInstructorName() +
           ', status: ' + this.getStatus() +
           ', bike_number: ' + this.getBikeNumber() +
           ', date: ' + this.getDate() +
           ', spinning_class: ' + this.getSpinningClass().toString() +
        '}';
    };

    this.constructor(id, instructorName, status, bikeNumber, date, spinningClass);

};