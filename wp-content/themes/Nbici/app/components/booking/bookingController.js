'use strict';

nbici.controller('BookingController', ['$scope', '$timeout', '$document', 'SessionService', 'BookingService', 'ClassroomService', 'InstructorService', 'UtilsService', 'LoggerService', 'localStorageService', 'usSpinnerService', function($scope, $timeout, $document, SessionService, BookingService, ClassroomService, InstructorService, UtilsService, LoggerService, localStorageService, usSpinnerService){

    // Private variables
    /**
     *
     */
    var bookingCtrl = this;

    /**
     * Determines if the booking container is shown
     * @type {boolean}
     */
    var showBooking = false;

    // Listeners
    /**
     * Listens for 'close classroom' event
     */
    $scope.$on('closeClassroom', function($event){
        BookingService.resetBooking();
        setShowBooking(false);
    });

    /**
     * Listens for 'bike updated' event
     */
    $scope.$on('bikeUpdated', function($event){
        BookingService.resetBooking();
        setShowBooking(false);
    });

    /**
     *
     */
    $scope.$on('spinningClassSelected', function($event, spinningClass, appointment) {
        appointment = appointment || undefined;
        BookingService.setClassroom(spinningClass);
        BookingService.setAppointment(appointment);
        BookingService.broadcast('spinningClassBooked');
    });

    /**
     *
     */
    $scope.$on('bikeSelected', function($event, bike) {
        BookingService.setBike(bike);
        setShowBooking(true);
        $timeout(function(){
            var bookingContainer = angular.element(document.getElementById('booking'));
            $document.scrollToElement(bookingContainer,120, 800);
        }, 0);
    });

    /**
     *
     */
    $scope.$on('bikeDeselected', function($event) {
        setShowBooking(false);
        BookingService.unsetBike();
    });

    /**
     *
     */
    $scope.$on('book', function() {
        bookingCtrl.book();
    });

    /**
     *
     */
    $scope.$on('closePacksView', function(){
        setShowBooking(true);
    });

    /**
     * Listens for 'userBoughtClasses' event
     */
    $scope.$on('userBoughtClasses', function(){
        setShowBooking(true);
        $timeout(function(){
            var bookingContainer = angular.element(document.getElementById('booking'));
            $document.scrollToElement(bookingContainer, 120, 800);
        }, 0);
    });

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowBooking(false);
    });

    /**
     * Determines if the booking container is shown
     * @returns {boolean}
     */
    bookingCtrl.isVisible = function() {
        return showBooking;
    };

    /**
     *
     * @param show
     */
    var setShowBooking = function(show) {
        showBooking = show;
    };

    /**
     * Gets the current booking
     * @returns {{classId: undefined, classroomId: undefined, date: undefined, bike: undefined, instructorId: undefined}}
     */
    bookingCtrl.getBooking = function() {
        return BookingService.getBooking();
    };

    /**
     * Gets the instructor's name
     * @returns {*}
     */
    bookingCtrl.getInstructorName = function (){
        return (BookingService.getBooking().instructorId ? InstructorService.getInstructorById(BookingService.getBooking().instructorId).getName() : '');
    };

    /**
     * Books the class
     */
    bookingCtrl.book = function() {
        if(SessionService.isAuthenticated()) {
            if( BookingService.getBooking().isFree || SessionService.get().getClassesLeft()){

                usSpinnerService.spin('full-spinner');

                BookingService.bookClass()
                    .then(function(data) {
                        if(data.appointment) {

                            if(!data.appointment.schedule.free) {
                                SessionService.get().setClassesLeft(SessionService.get().getClassesLeft() - 1);
                            }

                            var bookingResume = {
                                'bicycleNumber': data.appointment.bicycle_number,
                                'date': data.appointment.schedule.datetime,
                                'instructor': data.appointment.schedule.instructor.first_name
                            };
                            localStorageService.set('nbc-booking', bookingResume);

                            window.location.href = UtilsService.getHomeUrl() + 'reserva-success';
                        }
                    }, function(error) {
                        if(error && error.errors){
                            var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                            alertify.log(errorMessage, 'error', 5000);
                        } else {
                            var errorMessage = '<strong>¡Oops! Error al reservar la clase</strong>, por favor intenta de nuevo';
                            alertify.log(errorMessage, 'error', 5000);
                        }
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('full-spinner');
                    });

            } else {
                BookingService.broadcast('userNeedsClasses');
                usSpinnerService.spin('full-spinner');
            }
        } else {
            BookingService.broadcast('showLogin', 'book');
        }
    };

    bookingCtrl.editBook = function() {
        if(SessionService.isAuthenticated()) {

            usSpinnerService.spin('full-spinner');

            BookingService.editClass()
                .then(function(data) {
                    if(data.appointment) {
                        var successMessage = "<strong>¡En hora buena!</strong> tu asiento fue cambiado correctamente";
                        alertify.log(successMessage, 'success', 5000);
                        BookingService.broadcast('bikeUpdated', data.appointment);
                        usSpinnerService.stop('full-spinner');
                    }
                }, function(error) {
                    if(error && error.errors){
                        var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                        alertify.log(errorMessage, 'error', 5000);
                    } else {
                        var errorMessage = '<strong>¡Oops! Error al reservar la clase</strong>, por favor intenta de nuevo';
                        alertify.log(errorMessage, 'error', 5000);
                    }
                    LoggerService.$logger().error(error);
                    usSpinnerService.stop('full-spinner');
                });
            ;
        }
    }

    /**
     *
     * @returns {Bike}
     */
    bookingCtrl.getMyBike = function () {
        return ClassroomService.getMyBike();
    };
}]);