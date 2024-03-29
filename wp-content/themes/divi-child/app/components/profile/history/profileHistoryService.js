'use strict';

nbici.factory('HistoryService', ['$http', '$q', '$rootScope', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, LoggerService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     *
     * @type {Array}
     */
    var appointmentHistory = [];

    /**
     *
     * @type {Array}
     */
    var futureAppointments = [];

    // Functions definition

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    var transformToObject = function(appointments) {
        var list = [];

        try {
            for (var i=0; i<appointments.length; i++) {
                var item = appointments[i];
                var appointment = new Appointment(
                                    item.id, 
                                    item.schedule.instructor.first_name, 
                                    item.status, 
                                    item.bicycle_number, 
                                    item.start, 
                                    new SpinningClass(
                                        item.schedule.id, 
                                        item.schedule.instructor.id, 
                                        item.schedule.instructor.first_name, 
                                        item.schedule.room_id, 
                                        item.schedule.datetime, 
                                        undefined, // available seats
                                        item.schedule.schedule_type ? item.schedule.schedule_type.id : undefined, 
                                        item.schedule.schedule_type ? item.schedule.schedule_type.name : '', 
                                        undefined, // description
                                        undefined, // free
                                        (item.schedule.alternate_instructor ? item.schedule.alternate_instructor.first_name : ''), 
                                        undefined, // price
                                        ''         // venue
                                    )
                                );
                list.push(appointment);
            }

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    var refreshAppointments = function(appointment) {
        for(var i=0; i<futureAppointments.length; i++) {
            if(appointment.id == futureAppointments[i].getId()){
                futureAppointments[i].setStatus('CANCELLED');
            }
        }
    };

    /**
     *
     * @returns {*}
     */
    var getAppointmentHistory = function() {
        return angular.copy(appointmentHistory);
    };

    /**
     *
     * @param appointmentsLis
     */
    var setAppointmentHistory = function(appointments) {
        try {
            appointmentHistory = transformToObject(appointments);
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };

    /**
     *
     * @returns {*}
     */
    var getFutureAppointments = function() {
        return angular.copy(futureAppointments);
    };

    /**
     *
     * @param appointmentsList
     */
    var setFutureAppointments = function(appointments) {
        try {
            futureAppointments = transformToObject(appointments);
        } catch(error) {
            LoggerService.$logger().error(error);
        }
    };
    
    var refreshAppointmentById = function (newAppointment) {
        for(var appoitmentIndex = 0; appoitmentIndex<futureAppointments.length; appoitmentIndex++) {
            var appointment = futureAppointments[appoitmentIndex];
            if(appointment.getId() === newAppointment.id) {
                appointment.setBikeNumber(newAppointment.bicycle_number);
                break;
            }
        }
    };

    /**
     *
     * @param id
     */
    var cancelAppointment = function(id) {
        var cardsServiceURL = API_URL_BASE + '/appointments/' + id + '/cancel';

        return $http.get(cardsServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    if(data.appointment){
                        refreshAppointments(data.appointment);
                    }

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
        getAppointmentHistory: getAppointmentHistory,
        setAppointmentHistory: setAppointmentHistory,
        getFutureAppointments: getFutureAppointments,
        setFutureAppointments: setFutureAppointments,
        cancelAppointment: cancelAppointment,
        refreshAppointmentById: refreshAppointmentById
    };

    return service;

}]);

