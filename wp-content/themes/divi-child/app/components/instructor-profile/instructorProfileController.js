'use strict';

nbici.controller('InstructorProfileController', ['$scope', '$timeout', '$document', 'InstructorProfileService', 'usSpinnerService', 'DEFAULT_VALUES', function($scope, $timeout, $document, InstructorProfileService, usSpinnerService, DEFAULT_VALUES){

    var instructorProfileCtrl = this;

    /**
     * Determines if the calendar container is shown
     * @type {boolean}
     */
    var showCalendar = true;

    /**
     *
     * @type {CalendarDay}
     */
    var spinningClassInfo = undefined;

    // Scope variables
    /**
     *
     * @type {Array}
     */
    instructorProfileCtrl.instructorProfile = undefined;

    /**
     *
     * @type {Array}
     */
    instructorProfileCtrl.venues = [];

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    instructorProfileCtrl.isVisible = function() {
        return showCalendar;
    };

    /**
     *
     * @param show
     */
    var setShowCalendar = function(show) {
        showCalendar = show;
    };

    // Listeners
    /**
     * Listens for 'close classroom' event
     */
    $scope.$on('classroomClosed', function($event){
        setShowCalendar(true);
        $timeout(function(){
            var calendarContainer = angular.element(document.getElementById('calendar'));
            $document.scrollToElement(calendarContainer, 130, 800);
        }, 500);
    });

    /**
     *
     * @param day
     * @returns {number}
     */
    instructorProfileCtrl.getDayOfWeek = function(day){
        return InstructorProfileService.getDayOfWeek(day);
    };

    /**
     *
     * @param spinningClass
     * @returns {boolean}
     */
    instructorProfileCtrl.isClassEnabled = function(spinningClass) {
        var now = moment();
        return (spinningClass.getDate().diff(now, 'minutes') >= 1) && (spinningClass.getAvailableSeats() > 0);
    };

    /**
     *
     * @param spinningClass
     * @returns {boolean}
     */
    instructorProfileCtrl.isClassSelectable = function(spinningClass) {
        var now = moment();
        return (spinningClass.getDate().diff(now, 'minutes') >= 1) && (spinningClass.getInstructorId());
    };

    /**
     *
     * @param day
     * @returns {boolean}
     */
    instructorProfileCtrl.hasClassesAvailable = function(day) {
        return (day.getSpinningClasses().length > 0);
    };

    /**
     *
     * @returns {string}
     */
    instructorProfileCtrl.getWeekLabel = function() {
        var firstDay = instructorProfileCtrl.instructorProfile.week[0].getDate();
        var lastDay = instructorProfileCtrl.instructorProfile.week[6].getDate();

        if(!firstDay.isValid()) {
            return 'Por el momento ' + instructorProfileCtrl.instructorProfile.first_name + ' no cuenta con horarios disponibles.';
        }

        return (firstDay.month() != lastDay.month())? 'Semana del ' + firstDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()]  + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[lastDay.month()] : 'Semana del ' + firstDay.date() + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()];
    };

    /**
     *
     * @param spinningClass
     */
    instructorProfileCtrl.selectSpinningClass = function(spinningClass) {
        if (instructorProfileCtrl.isClassSelectable(spinningClass)) {
            setShowCalendar(false);
            $timeout(function(){
                InstructorProfileService.broadcast('spinningClassSelected', spinningClass);
            }, 500);
            usSpinnerService.spin('full-spinner');
        }
    };

    /**
     *
     * @param spinningClass
     */
    instructorProfileCtrl.showSpinningClassInfo = function(spinningClass) {
        spinningClassInfo = spinningClass;
    };

    /**
     *
     * @param spinningClass
     */
    instructorProfileCtrl.isSpinningClassInfoShown = function(spinningClass) {
        return spinningClassInfo == spinningClass;
    };

    /**
     *
     */
    instructorProfileCtrl.getDistributionStyles = function(spinningClass) {
        return spinningClass.getDistributionStyles();
    }

    /**
     * Initialize controller
     * @param instructors
     */
    instructorProfileCtrl.init = function(instructor) {
        InstructorProfileService.setInstructorProfile(instructor);
        instructorProfileCtrl.instructorProfile = InstructorProfileService.getInstructorProfile();

        instructorProfileCtrl.venues = InstructorProfileService.getVenues(instructor);
    };

}]);