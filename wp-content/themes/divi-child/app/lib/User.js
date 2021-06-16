'use strict';

function User(user) {

    // Private attributes
    var _id = undefined;
    var _firstName = undefined;
    var _lastName = undefined;
    var _email = undefined;
    var _classesLeft = undefined;
    var _streamingClassesLeft = undefined;
    var _lastClassPurchased = undefined;
    var _active = false;
    var _coupon = undefined;
    var _couponValue = undefined;
    var _balance = 0;
    var _isTestUser = false;
    var _linked = false;
    var _referenceClassCost = undefined;

    /**
     *
     * @param id
     * @param firstName
     * @param lastName
     * @param email
     * @param classesLeft
     * @param streamingClassesLeft
     * @param lastClassPurchased
     * @param active
     * @param balance
     * @param coupon
     * @param couponValue
     * @param isTestUser
     * @param linked
     * @param referenceClassCost
     */

    this.constructor = function(user) {
        this.setId(user.id);
        this.setFirstName(user.firstName);
        this.setLastName(user.lastName);
        this.setEmail(user.email);
        this.setClassesLeft(user.classesLeft);
        this.setStreamingClassesLeft(user.streamingClassesLeft);
        this.setLastClassPurchased(user.lastClassPurchased);
        this.setActive(user.active);
        this.setCoupon(user.coupon);
        this.setCouponValue(user.couponValue);
        this.setBalance(user.balance);
        this.setIsTestUser(user.isTestUser);
        this.setLinked(user.linked);
        this.setReferenceClassCost(user.referenceClassCost);
    };

    /**
     *
     * @returns {undefined}
     */
    this.getId = function(){
        return _id;
    };

    /**
     *
     * @param id
     */
    this.setId = function(id){
        _id = id;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getFirstName = function(){
        return _firstName;
    };

    /**
     *
     * @param firstName
     */
    this.setFirstName = function(firstName){
        _firstName = firstName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getLastName = function(){
        return _lastName;
    };

    /**
     *
     * @param lastName
     */
    this.setLastName = function(lastName){
        _lastName = lastName;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getEmail = function(){
        return _email;
    };

    /**
     *
     * @param email
     */
    this.setEmail = function(email){
        _email = email;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getClassesLeft = function(){
        return _classesLeft;
    };

    /**
     *
     * @param classesLeft
     */
    this.setClassesLeft = function(classesLeft){
        if (classesLeft) {
            _classesLeft = classesLeft;
        } else {
            _classesLeft = 0;
        }

    };

     /**
     *
     * @returns {undefined}
     */
    this.getStreamingClassesLeft = function(){
        return _streamingClassesLeft;
    };

    /**
     *
     * @param streamingClassesLeft
     */
    this.setStreamingClassesLeft = function(streamingClassesLeft){
        if (streamingClassesLeft) {
            _streamingClassesLeft = streamingClassesLeft;
        } else {
            _streamingClassesLeft = 0;
        }

    };

    /**
     *
     * @returns {undefined}
     */
    this.getLastClassPurchased = function(){
        return _lastClassPurchased;
    };

    /**
     *
     * @param credits
     */
    this.setLastClassPurchased = function(lastClassPurchased){
        _lastClassPurchased = lastClassPurchased;
    };

    /**
     *
     * @returns {boolean}
     */
    this.getActive = function(){
        return _active;
    };

    /**
     *
     * @param active
     */
    this.setActive = function(active){
        _active = active;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCoupon = function(){
        return _coupon;
    };

    /**
     *
     * @param coupon
     */
    this.setCoupon = function(coupon){
        _coupon = coupon;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCouponValue = function(){
        return _couponValue;
    };

    /**
     *
     * @param coupon
     */
    this.setCouponValue = function(couponValue){
        _couponValue = couponValue;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getBalance = function(){
        return _balance;
    };

    /**
     *
     * @param balance
     */
    this.setBalance = function(balance){
        _balance = balance;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIsTestUser = function(){
        return _isTestUser;
    };

    /**
     *
     * @param isTestUser
     */
    this.setIsTestUser = function(isTestUser){
        _isTestUser = isTestUser;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getLinked = function(){
        return _linked;
    };

    /**
     *
     * @param linked
     */
    this.setLinked = function(linked){
        _linked = linked;
    };

    /**
     *
     * @returns {undefined}
     */
     this.getReferenceClassCost = function(){
        return _referenceClassCost;
    };

    /**
     *
     * @param referenceClassCost
     */
    this.setReferenceClassCost = function(referenceClassCost){
        _referenceClassCost = referenceClassCost;
    };

    this.constructor(user);

};