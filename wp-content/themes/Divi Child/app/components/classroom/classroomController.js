'use strict';

nbici.controller('ClassroomController', ['$rootScope', '$scope', '$timeout', '$document', 'ClassroomService', 'BookingService', 'InstructorService', 'LoggerService', 'usSpinnerService', 'DEFAULT_VALUES', function($rootScope, $scope, $timeout, $document, ClassroomService, BookingService, InstructorService, LoggerService, usSpinnerService, DEFAULT_VALUES){

    var classroomCtrl = this;

    // Scope variables

    classroomCtrl.distribution = {};

    // Private variables
    /**
     * Determines if the classroom container is shown
     * @type {boolean}
     */
    var showClassroom = false;

    /**
     *
     * @type {Bike}
     */
    var myBike = undefined;

    // Listeners
    /**
     * Listens for 'spinningClassBooked' event
     */
    $scope.$on('spinningClassBooked', function($event, spinningClass){
        getClassroomDistribution();
    });

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowClassroom(false);
    });

    /**
     * Listens for 'userNeedsToPayClass' event
     */
    $scope.$on('userNeedsToPayClass', function($event, args) {
        setShowClassroom(false);
    });

    /**
     * Listens for 'updateBookedSeats' event and update the booked seats array
     */
    $scope.$on('updateBookedSeats', function($event, bookedSeats) {
        ClassroomService.updateBookedSeats(bookedSeats);
        if(BookingService.getBooking().bike) {
            ClassroomService.broadcast('bikeDeselected', BookingService.getBooking().bike);
        }
    });

    /**
     * Listens for 'changebike' event and show the classroom
     */
    $scope.$on('changeBike', function($event, appointment) {
        setShowClassroom(true);
        BookingService.setAppointment(appointment);
        BookingService.setClassroom(appointment.getSpinningClass());
        getClassroomDistribution(appointment.getBikeNumber());
        usSpinnerService.spin('change-bike-spinner');
    });

    /**
     * Listens for 'bike updated' event
     */
    $scope.$on('bikeUpdated', function($event){
        setShowClassroom(false);
    });

    /**
     * Listens for 'closePacksView' event
     */
    $scope.$on('closePacksView', function(){
       setShowClassroom(true);
    });

    /**
     * Listens for 'userBoughtClasses' event
     */
    $scope.$on('userBoughtClasses', function(){
        setShowClassroom(true);
    });

    // Function definition

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    classroomCtrl.isVisible = function() {
        return showClassroom;
    };

    /**
     * Closes the classroom view
     */
    classroomCtrl.closeClassroom = function (){
        setShowClassroom(false);
        $rootScope.$broadcast('closeClassroom');
    };

    /**
     *
     * @param show
     */
    var setShowClassroom = function(show) {
        showClassroom = show;
    };

    /**
     *
     */
    var getClassroomDistribution = function(bikeNumber) {
        ClassroomService.callDistributionByClassroomId(BookingService.getBooking().classroomId)
            .then(function(data) {
                ClassroomService.callBookedSeatsByClassId(BookingService.getBooking().classId, bikeNumber)
                    .then(function(data) {
                        classroomCtrl.distribution = ClassroomService.getDistribution();
                        setShowClassroom(true);
                        if(bikeNumber){
                            myBike = ClassroomService.getMyBike();
                        }
                        $timeout(function(){
                            var calendarContainer = angular.element(document.getElementById('calendar'));
                            if(document.getElementById('calendar')) {
                                $document.scrollToElement(calendarContainer, 30, 800);
                            }
                        }, 500);

                        usSpinnerService.stop('full-spinner');
                        usSpinnerService.stop('change-bike-spinner');
                    }, function(error) {
                        var errorMessage = "<strong>¡Oops! hubo un error al obtener el salón</strong>, por favor, intenta de nuevo";
                        alertify.log(errorMessage, 'error', 5000);
                        LoggerService.$logger().error(error);
                        usSpinnerService.stop('full-spinner');
                        usSpinnerService.stop('change-bike-spinner');
                    });
            }, function(error) {
                var errorMessage = "<strong>¡Oops! hubo un error al obtener el salón</strong>, por favor, intenta de nuevo";
                alertify.log(errorMessage, 'error', 5000);
                LoggerService.$logger().error(error);
                usSpinnerService.stop('full-spinner');
                usSpinnerService.stop('change-bike-spinner');
            });
    };

    /**
     *
     * @param bike
     */
    classroomCtrl.selectBike = function(bike) {
        if(BookingService.getBooking().bike && bike.getPosition() === BookingService.getBooking().bike.getPosition()) {
            ClassroomService.broadcast('bikeDeselected', bike);
        } else {
            if (bike.getStatus() == DEFAULT_VALUES.BIKE_STATUS.ACTIVE) {
                ClassroomService.broadcast('bikeSelected', bike);
            }
        }
    };

    /**
     *
     * @param bike
     * @returns {boolean}
     */
    classroomCtrl.isMyBike = function (bike) {
        if(bike) {
            return (myBike.getNumber() === bike.getNumber());
        }
        return false;
    };

    /**
     *
     * @returns {Bike}
     */
    classroomCtrl.getMyBike = function () {
        return myBike;
    };

    /**
     *
     * @param bike
     * @returns {*}
     */
    classroomCtrl.getBikeClass = function(bike) {
        if(BookingService.getBooking().bike){
            return (bike && bike.getPosition() === BookingService.getBooking().bike.getPosition())? DEFAULT_VALUES.BIKE_STATUS.SELECTED: bike.getStatus();
        }
        return bike.getStatus();
    };

    /**
     * Gets the instructor's name
     * @returns {*}
     */
    classroomCtrl.getInstructorName = function () {
        return (BookingService.getBooking().instructorId ? InstructorService.getInstructorById(BookingService.getBooking().instructorId).getName() : '');
    };

    /**
     *
     * @param instructors
     */
    classroomCtrl.init = function(instructors) {
        // Setting the instructors catalog
        InstructorService.setInstructors(instructors);
    };

}]);