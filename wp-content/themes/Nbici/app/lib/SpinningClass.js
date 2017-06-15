'use strict';

function SpinningClass(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree) {

    // Private variables
    var _id = undefined;
    var _instructorId = undefined;
    var _instructorName = undefined;
    var _classroomId = undefined;
    var _date = undefined;
    var _availableSeats = undefined;
    var _description = undefined;
    var _isFree = undefined;

    /**
     *
     * @param id
     * @param instructorId
     * @param instructorName
     * @param classroomId
     * @param date
     * @param availableSeats
     * @param description
     * @param isFree
     */
    this.constructor = function(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree) {
        this.setId(id);
        this.setInstructorId(instructorId);
        this.setInstructorName(instructorName);
        this.setClassroomId(classroomId);
        this.setDate(date);
        this.setAvailableSeats(availableSeats);
        this.setDescription(description);
        this.setIsFree(isFree);
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
    this.getInstructorId = function() {
        return _instructorId;
    };

    /**
     *
     * @param instructorId
     */
    this.setInstructorId = function(instructorId) {
        _instructorId = instructorId;
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
    this.getClassroomId = function() {
        return _classroomId;
    };

    /**
     *
     * @param classroomId
     */
    this.setClassroomId = function(classroomId) {
        _classroomId = classroomId;
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
    this.getAvailableSeats = function() {
        return _availableSeats
    };

    /**
     * 
     * @param availableSeats
     */
    this.setAvailableSeats = function(availableSeats) {
        _availableSeats = availableSeats;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDescription = function () {
        return _description;
    };

    /**
     *
     * @param description
     */
    this.setDescription = function (description) {
         _description = description;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIsFree = function () {
        return _isFree;
    };

    /**
     *
     * @param isFree
     */
    this.setIsFree = function (isFree) {
        _isFree = isFree;
    };

    this.constructor(id, instructorId, instructorName, classroomId, date, availableSeats, description, isFree);

};