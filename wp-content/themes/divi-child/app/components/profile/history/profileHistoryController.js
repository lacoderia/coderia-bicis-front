'use strict';

nbici.controller('HistoryController', ['$scope', '$timeout', '$document', 'LoginService', 'SessionService', 'HistoryService', 'LoggerService', 'usSpinnerService', 'DEFAULT_VALUES', function($scope, $timeout, $document, LoginService, SessionService, HistoryService, LoggerService, usSpinnerService, DEFAULT_VALUES){

    // Private variables
    /**
     * History Controller instance
     */
    var historyCtrl = this;

    /**
     * Determines if the history container is shown
     * @type {boolean}
     */
    var showHistory = true;

    /**
     *
     * @param show
     */
    var setShowCalendar = function(show) {
        showHistory = show;
    };

    var selectedAppointment = undefined;

    // Public bariables
    /**
     * Appointment status array
     * @type {APPOINTMENT_STATUS|{BOOKED, CANCELLED, FINALIZED}|*}
     */
    historyCtrl.APPOINTMENT_STATUS = DEFAULT_VALUES.APPOINTMENT_STATUS;

    /**
     * Array of past appointments
     * @type {Array}
     */
    historyCtrl.appointmentHistory = [];

    /**
     * Array of future appointments
     * @type {Array}
     */
    historyCtrl.futureAppointments = [];

    // Listeners

    /**
     * Listens for 'bike updated' event
     */
    $scope.$on('bikeUpdated', function($event, appointment){
        HistoryService.refreshAppointmentById(appointment);
        refreshAppointmentById(appointment);
        selectedAppointment = undefined;
        setShowCalendar(true);

        $timeout(function(){
            var historyContainer = angular.element(document.getElementById('history-classes'));
            $document.scrollToElement(historyContainer,120, 800);
        }, 0);
    });

    $scope.$on('classroomClosed', function($event){
        historyCtrl.selectAppointment(undefined);
        setShowCalendar(true);

        $timeout(function(){
            var historyContainer = angular.element(document.getElementById('history-classes'));
            $document.scrollToElement(historyContainer,120, 800);
        }, 0);
    });

    /**
     *
     * @param newAppointment
     */
    var refreshAppointmentById = function (newAppointment) {
        for(var appointmentIndex = 0; appointmentIndex<historyCtrl.futureAppointments.length; appointmentIndex++) {
            if(historyCtrl.futureAppointments[appointmentIndex].getId() === newAppointment.id) {
                historyCtrl.futureAppointments[appointmentIndex].setBikeNumber(newAppointment.bicycle_number);
                break;
            }
        }
    };

    /**
     * Determines if the history container is shown
     * @returns {boolean}
     */
    historyCtrl.isVisible = function() {
        return showHistory;
    };

    /**
     *  Select an appointment
     * @param appointment
     */
    historyCtrl.selectAppointment = function(appointment) {
        selectedAppointment = appointment;
    };

    /**
     *
     * @param appointment
     * @returns {boolean}
     */
    historyCtrl.isSelectedAppointment = function(appointment) {
        return selectedAppointment === appointment;
    };

    /**
     * Determines if the appointment is still available
     * @param appointment
     * @returns {boolean}
     */
    historyCtrl.isAppointmentEnabled = function(appointment) {
        var now = moment();
        return appointment.getDate().diff(now, 'hours') >= 11 || (SessionService.get() && SessionService.get().getIsTestUser());
    };


    historyCtrl.isAppointmentEditable = function(appointment) {
        var now = moment();
        return appointment.getDate().diff(now, 'hours') >= 1 || (SessionService.get() && SessionService.get().getIsTestUser());
    };

    /**
     * Determines if the user has past appointments
     * @returns {boolean}
     */
    historyCtrl.hasAppointmentHistory = function () {
        return historyCtrl.appointmentHistory.length > 0;
    };

    /**
     * Determines if the user has future appointments
     * @returns {boolean}
     */
    historyCtrl.hasFutureAppointments = function () {
        return historyCtrl.futureAppointments.length > 0;
    };

    /**
     *
     * @param appointment
     */
    historyCtrl.changeBike = function(appointment) {
        setShowCalendar(false);
        $timeout(function(){
            HistoryService.broadcast('changeBike', appointment);
        }, 500);
    };

    /**
     * Cancels an appointment
     * @param appointment
     */
    historyCtrl.cancelAppointment = function(appointment) {

        alertify.set({ labels: {
            ok     : "Si",
            cancel : "No"
        } });

        alertify.confirm('¿Estás seguro que deseas cancelar esta reservación?', function(e) {
            if(e) {
                usSpinnerService.spin('future-appointments-spinner');

                HistoryService.cancelAppointment(appointment.getId())
                    .then(function(data) {
                        if (data.appointment) {

                            LoginService.getCurrentSession()
                                .then(function(data){
                                    historyCtrl.futureAppointments = HistoryService.getFutureAppointments();
                                    HistoryService.broadcast('updateFutureAppointments');

                                    var successMessage = '<strong>¡Listo!</strong>, cancelamos tu reservación en esta clase';
                                    alertify.log(successMessage, 'success', 5000);
                                }, function(error){
                                    LoggerService.$logger().error(error);
                                });
                        }
                        usSpinnerService.stop('future-appointments-spinner');
                    }, function(error) {
                        if(error && error.errors){
                            var errorMessage = '<strong>¡Oops!</strong>, ' + error.errors[0].title;
                            alertify.log(errorMessage, 'error', 5000);
                        } else {
                            var errorMessage = '<strong>¡Oops! Hubo un error al cancelar la reservación</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        }
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('future-appointments-spinner');
                    });
            }
        });

    };

    /**
     *
     * @param appointments
     */
    historyCtrl.init = function(appointments) {
        HistoryService.setAppointmentHistory(appointments);
        historyCtrl.appointmentHistory = HistoryService.getAppointmentHistory();
    };

    /**
     *
     * @param appointments
     */
    historyCtrl.initDashboard = function(appointments) {
        HistoryService.setFutureAppointments(appointments);
        historyCtrl.futureAppointments = HistoryService.getFutureAppointments();

        HistoryService.broadcast('updateFutureAppointments');
    };

}]);
