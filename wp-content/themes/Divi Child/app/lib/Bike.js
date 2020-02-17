'use strict';

function Bike(position, number, status) {

    // Private variables
    var _position = undefined;
    var _number = undefined;
    var _status = undefined;

    /**
     *
     * @param number
     * @param number
     * @param string
     */
    this.constructor = function(position, number, status) {
        this.setPosition(position);
        this.setNumber(number);
        this.setStatus(status);
    };

    /**
     *
     * @param number
     */
    this.setPosition = function(position) {
        _position = position;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPosition = function() {
        return _position;
    };

    /**
     *
     * @param number
     */
    this.setNumber = function(number) {
        _number = number;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getNumber = function() {
        return _number;
    };

    /**
     *
     * @param string
     */
    this.setStatus = function(status) {
        _status = status;
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
     * @returns {string}
     */
    this.toString = function() {
        return 'Bike: {' +
            ' postion: ' + this.getPosition() +
            ', number: ' + this.getNumber() +
            ', status: ' + this.getStatus() +
        '}';
    }

    this.constructor(position, number, status);

};