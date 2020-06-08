'use strict';

function Product(id, name, description, price, picture) {

    // Private variables
    var _id = undefined;
    var _name = undefined;
    var _description = undefined;
    var _price = undefined;
    var _picture = undefined;

    /**
     *
     * @param id
     * @param name
     * @param description
     * @param price
     * @param picture
     */
    this.constructor = function(id, name, description, price, picture) {
        this.setId(id);
        this.setName(name);
        this.setDescription(description);
        this.setPrice(price);
        this.setPicture(picture);
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
    this.getId = function() {
        return _id;
    };

    /**
     *
     * @param name
     */
    this.setName = function(name) {
        _name = name;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getName = function() {
        return _name;
    };

    /**
     *
     * @param description
     */
    this.setDescription = function(description) {
        _description = description;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDescription = function() {
        return _description;
    };

    /**
     *
     * @param price
     */
    this.setPrice = function(price) {
        _price = price;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPrice = function() {
        return _price;
    };

    /**
     *
     * @param picture
     */
    this.setPicture = function(picture) {
        _picture = picture;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPicture = function() {
        return _picture;
    };

    this.constructor(id, name, description, price, picture);

};