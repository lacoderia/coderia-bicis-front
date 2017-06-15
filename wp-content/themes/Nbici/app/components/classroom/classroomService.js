'use strict';

nbici.factory('ClassroomService', ['$http', '$q', '$rootScope', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     * Class distribution object
     */

    var distribution = {};

    /**
     * Current booked bike object
     * @type {Bike}
     */
    var myBike = undefined;

    // Functions definition

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
     * @param array
     * @returns {Array}
     */
    var transformToObject = function(data){
        var height = data.height;
        var width = data.width;
        var bikes = data.active_seats;
        var list, row;

        function getBike(position) {
            var bike = undefined;

            for(var i=0; i<bikes.length; i++) {
                if(bikes[i].position == position){
                    bike = bikes[i];
                }
            }

            return bike;
        }

        list = [];
        row = [];

        try {
            for(var i=1; i<=(height*width); i++) {
                var bike = new Bike();
                bike.setPosition(i);

                var seat = getBike(i);
                if(seat){
                    bike.setStatus('active');
                    bike.setNumber(seat.number);
                } else {
                    bike.setStatus('inactive');
                    bike.setNumber(0);
                }

                row.push(bike);

                if(i%width == 0){
                    list.push(row);
                    row = [];
                }
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     *
     * @returns {*}
     */
    var getDistribution = function() {
        return angular.copy(distribution);
    };

    /**
     *
     * @param seatDistribution
     */
    var setDistribution = function(seatDistribution) {
        if(seatDistribution){
            distribution = transformToObject(seatDistribution);
        }
    };

    /**
     *
     * @param id
     * @returns {*}
     */
    var callDistributionByClassroomId = function(id) {
        var distributionServiceURL = API_URL_BASE + '/distributions/by_room_id?room_id=' + id;
        return $http.get(distributionServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.distribution){
                        setDistribution(data.distribution);
                    }
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *
     * @param id
     * @returns {*}
     */
    var callBookedSeatsByClassId = function(id, bikeNumber) {
        var distributionServiceURL = API_URL_BASE + '/schedules/' + id + '/bookings';
        return $http.get(distributionServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.bookings){
                        updateBookedSeats(data.bookings.booked_seats, bikeNumber);
                    }
                    return data;
                } else {
                    return $q.reject(data);
                }

            }, function(error){
                return $q.reject(error.data);
            });
    };

    /**
     *
     * @param bookings
     * @returns {{}}
     */
    var updateBookedSeats = function(bookedSeats, bikeNumber) {
        var array = angular.copy(bookedSeats);

        function isBooked(position) {
            var bike = undefined;

            for(var i=0; i<array.length; i++) {
                if(array[i].position == position){
                    bike = array[i];
                }
            }

            return bike;
        }

        try {
            myBike = undefined;
            for(var i=0; i<distribution.length; i++) {
                for(var j=0; j<distribution[i].length; j++) {
                    if(isBooked(distribution[i][j].getPosition())){
                        distribution[i][j].setStatus('booked');
                        if(bikeNumber &&  distribution[i][j].getNumber() == bikeNumber){
                            myBike = distribution[i][j];
                        }
                    }
                }
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

    };

    /**
     * Returns current booked user's bike
     * @returns {Bike}
     */
    var getMyBike = function () {
        return myBike;
    };


    /**
     * 
     * @type {{broadcast: broadcast, getDistribution: getDistribution, callDistributionByClassroomId: callDistributionByClassroomId, callBookedSeatsByClassId: callBookedSeatsByClassId}}
     */
    service = {
        broadcast: broadcast,
        getDistribution: getDistribution,
        callDistributionByClassroomId: callDistributionByClassroomId,
        callBookedSeatsByClassId: callBookedSeatsByClassId,
        updateBookedSeats: updateBookedSeats,
        getMyBike: getMyBike
    };

    return service;

}]);
