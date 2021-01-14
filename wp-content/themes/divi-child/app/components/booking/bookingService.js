'use strict';

nbici.factory('BookingService', ['$http', '$q', '$rootScope', 'API_URL_BASE', function($http, $q, $rootScope, API_URL_BASE){

    var booking = {
        classId: undefined,
        classroomId: undefined,
        date: undefined,
        bike: undefined,
        instructorId: undefined,
        isFree: undefined,
        price: undefined,
        description: undefined,
        availableSeats: undefined,
    };

    var _appointment = undefined;

    // Variables definition
    /**
     *  Service object
     */
    var service;


    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     *
     * @param spinningClass
     */
    var setClassroom = function(spinningClass) {
        booking.classId = spinningClass.getId();
        booking.classroomId = spinningClass.getClassroomId();
        booking.date = spinningClass.getDate();
        booking.instructorId = spinningClass.getInstructorId();
        booking.isFree = spinningClass.getIsFree();
        booking.price = spinningClass.getPrice();
        booking.description = spinningClass.getDescription();
        booking.availableSeats = spinningClass.getAvailableSeats();
    };

    /**
     *
     * @param bike
     */
    var setBike = function(bike) {
        booking.bike = bike;
    };

    /**
     *
     * @param bike
     */
    var unsetBike = function() {
        booking.bike = undefined;
    };

    /**
     *
     * @returns {{classId: undefined, classroomId: undefined, date: undefined, bike: undefined, instructorId: undefined, isFree: undefined, price: undefined}}
     */
    var getBooking = function() {
        return angular.copy(booking);
    };

    /**
     * Resets default values for booking object
     */
    var resetBooking = function() {
        booking = {
            classId: undefined,
            classroomId: undefined,
            date: undefined,
            bike: undefined,
            instructorId: undefined,
            isFree: undefined,
            price: undefined,
            description: undefined,
            availableSeats: undefined,
        };
    };

    var setAppointment = function (appointment) {
        _appointment = appointment;
    };

    /**
     *
     * @returns {*}
     */
    var bookClass = function() {

        var bookingServiceURL = API_URL_BASE + '/appointments/book';
        return $http.post(bookingServiceURL, { schedule_id: booking.classId, bicycle_number: booking.bike.getNumber() })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    var bookWaitingList = function() {

        var bookingServiceURL = API_URL_BASE + '/waitlists';
        return $http.post(bookingServiceURL, { schedule_id: booking.classId })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    var editClass = function () {

        var editBookingServiceURL = API_URL_BASE + '/appointments/' + _appointment.getId() + '/edit_bicycle_number';

        return $http.post(editBookingServiceURL, { bicycle_number: booking.bike.getNumber() })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    service = {
        broadcast: broadcast,
        getBooking: getBooking,
        setClassroom: setClassroom,
        setBike: setBike,
        unsetBike: unsetBike,
        resetBooking: resetBooking,
        bookClass: bookClass,
        bookWaitingList: bookWaitingList,
        setAppointment: setAppointment,
        editClass: editClass
    };

    return service;

}]);
