'use strict';

function SpinningClass(id, instructorId, instructorName, classroomId, date, availableSeats, classTypeId, classTypeName, description, isFree, alternateInstructor, price, distributionStyles) {

    // Private variables
    var _id = undefined;
    var _instructorId = undefined;
    var _instructorName = undefined;
    var _classroomId = undefined;
    var _date = undefined;
    var _availableSeats = undefined;
    var _classTypeId = undefined;
    var _classTypeName = '';
    var _description = undefined;
    var _isFree = undefined;
    var _alternateInstructor = undefined;
    var _price = undefined;
    var _distributionStyles = '';

    /**
     *
     * @param id
     * @param instructorId
     * @param instructorName
     * @param classroomId
     * @param date
     * @param availableSeats
     * @param classTypeId
     * @param classTypeName
     * @param description
     * @param isFree
     * @param alternateInstructor
     * @param price
     * @param distributionStyles
     */
    this.constructor = function(id, instructorId, instructorName, classroomId, date, availableSeats, classTypeId, classTypeName, description, isFree, alternateInstructor, price, distributionStyles) {
        this.setId(id);
        this.setInstructorId(instructorId);
        this.setInstructorName(instructorName);
        this.setClassroomId(classroomId);
        this.setDate(date);
        this.setAvailableSeats(availableSeats);
        this.setClassTypeId(classTypeId);
        this.setClassTypeName(classTypeName);
        this.setDescription(description);
        this.setIsFree(isFree);
        this.setAlternateInstructor(alternateInstructor);
        this.setPrice(price);
        this.setDistributionStyles(distributionStyles);
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
     this.getClassTypeId = function () {
        return _classTypeId;
    };

    /**
     *
     * @param classTypeId
     */
    this.setClassTypeId = function (classTypeId) {
        _classTypeId = classTypeId;
    };

    /**
     *
     * @returns {undefined}
     */
     this.getClassTypeName = function () {
        return _classTypeName;
    };

    /**
     *
     * @param classTypeName
     */
    this.setClassTypeName = function (classTypeName) {
        _classTypeName = classTypeName;
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

    /**
     *
     * @returns {undefined}
     */
    this.getAlternateInstructor = function () {
        return _alternateInstructor;
    };

    /**
     *
     * @param alternateInstructor
     */
    this.setAlternateInstructor = function (alternateInstructor) {
        _alternateInstructor = alternateInstructor;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPrice = function () {
        return _price;
    };

    /**
     *
     * @param price
     */
    this.setPrice = function (price) {
        _price = price;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDistributionStyles = function () {
        return _distributionStyles;
    };

    /**
     *
     * @param price
     */
    this.setDistributionStyles = function (distributionStyles) {
        _distributionStyles = distributionStyles;
    };

    /**
     *
     * @returns {string}
     */
    this.getAvailableSeatsMessage = function (showAll) {

        var message = '';

        if(_availableSeats > 15 && showAll){
            message = 'Aparta un lugar';
        } else if(_availableSeats > 10 && _availableSeats <= 15 && showAll){
            message = '¡A sudar!';
        } else if(_availableSeats <= 10 && _availableSeats > 0 && showAll) {
            message = '¡' + _availableSeats + ' lugares!';
        } else if(_availableSeats == 0 && _instructorId) {
            message = 'Lista de espera';
        } else if(_availableSeats == 0 && !_instructorId) {
            message = 'Cerrado';
        }

        return message;
    };

    this.constructor(id, instructorId, instructorName, classroomId, date, availableSeats, classTypeId, classTypeName, description, isFree, alternateInstructor, price, distributionStyles);

};