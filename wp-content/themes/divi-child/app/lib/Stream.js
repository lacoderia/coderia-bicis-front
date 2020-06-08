'use strict';

function Stream(id, title, instructorId, instructorName, duration, intensity, playable, cover, embedCode, endDate, featured) {

    // Private variables
    var _id = undefined;
    var _title = undefined;
    var _instructorId = undefined;
    var _instructorName = undefined;
    var _duration = undefined;
    var _intensity = undefined;
    var _playable = undefined;
    var _cover = undefined;
    var _embedCode = undefined;
    var _endDate = undefined;
    var _featured = undefined;

    /**
     *
     * @param id
     * @param title
     * @param instructorId
     * @param instructorName
     * @param duration
     * @param intensity
     * @param playable
     * @param cover
     * @param embedCode
     * @param endDate
     * @param featured
     */
    this.constructor = function(id, title, instructorId, instructorName, duration, intensity, playable, cover, embedCode, endDate, featured) {
        this.setId(id);
        this.setTitle(title);
        this.setInstructorId(instructorId);
        this.setInstructorName(instructorName);
        this.setDuration(duration);
        this.setIntensity(intensity);
        this.setPlayable(playable);
        this.setCover(cover);
        this.setEmbedCode(embedCode);
        this.setEndDate(endDate);
        this.setFeatured(featured);
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
     * @param title
     */
    this.setTitle = function(title) {
        _title = title;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getTitle = function() {
        return _title;
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
    this.getInstructorId = function() {
        return _instructorId;
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
    this.getInstructorName = function() {
        return _instructorName;
    };

    /**
     *
     * @param duration
     */
    this.setDuration = function(duration) {
        _duration = duration;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getDuration = function() {
        return _duration;
    };

    /**
     *
     * @param intensity
     */
    this.setIntensity = function(intensity) {
        _intensity = intensity;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getIntensity = function() {
        return _intensity;
    };

     /**
     *
     * @param playable
     */
    this.setPlayable = function(playable) {
        _playable = playable;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getPlayable = function() {
        return _playable;
    };

    /**
     *
     * @param cover
     */
    this.setCover = function(cover) {
        _cover = cover;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getCover = function() {
        return _cover;
    };

    /**
     *
     * @param cover
     */
    this.setEmbedCode = function(embedCode) {
        _embedCode = embedCode;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getEmbedCode = function() {
        return _embedCode;
    };

    /**
     *
     * @param endDate
     */
    this.setEndDate = function(endDate) {
        _endDate = endDate;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getEndDate = function() {
        return _endDate;
    };

    /**
     *
     * @param featured
     */
    this.setFeatured = function(featured) {
        _featured = featured;
    };

    /**
     *
     * @returns {undefined}
     */
    this.getFeatured = function() {
        return _featured;
    };

    // Calls constructor function
    this.constructor(id, title, instructorId, instructorName, duration, intensity, playable, cover, embedCode, endDate, featured);

};
