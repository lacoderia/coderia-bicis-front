'use strict';

nbici.controller('CalendarController', ['$scope', '$document', '$timeout', 'CalendarService', 'InstructorService', 'usSpinnerService', 'DEFAULT_VALUES', function($scope, $document, $timeout, CalendarService, InstructorService, usSpinnerService, DEFAULT_VALUES){

    // Private variables
    /**
     *
     */
    var calendarCtrl = this;

    /**
     * Determines if the classroom container is shown
     * @type {boolean}
     */
    var showCalendar = true;


    /**
     * Determines if mobile version is shown
     * @type {boolean}
     */
    var isMobile = false;

    /**
     *
     * @type {CalendarDay}
     */
    var selectedDay = undefined;

    /**
     *
     * @type {SpinningClass}
     */
    var spinningClassInfo = undefined;

    // Scope variables

    /**
     * Instructors list
     * @type {Array}
     */
    calendarCtrl.instructors = [];

    /**
     *
     * @type {undefined}
     * @private
     */
    calendarCtrl.selectedInstructor = undefined;

    /**
     *
     */
    calendarCtrl.week = [];

    /**
     *
     */
    calendarCtrl.venues = [];

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
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        setShowCalendar(false);
    });

    /**
     * Listens for 'userNeedsToPayClass' event
     */
    $scope.$on('userNeedsToPayClass', function($event, args) {
        setShowCalendar(false);
    });

    /**
     * Listens for window resize
     */
    $scope.$on('setWindowSize', function($event, windowSize) {
        if(windowSize == DEFAULT_VALUES.BREAKPOINTS.extra_small.code) {
            setMobileMode(true);
        } else{
            setMobileMode(false);
        }
    });

    // Function definition

    /**
     * Sets the mobile mode of the view
     */
    var setMobileMode = function(isMobileMode) {
        isMobile = isMobileMode;
    };

    /**
     * Returns if view is on mobile mode
     * @returns {boolean}
     */
    calendarCtrl.isMobile = function() {
        return isMobile;
    };

    /**
     * Determines if the classroom container is shown
     * @returns {boolean}
     */
    calendarCtrl.isVisible = function() {
        return showCalendar;
    };

    /**
     *
     * @param show
     */
    var setShowCalendar = function(show) {
        showCalendar = show;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    calendarCtrl.getDayOfWeek = function(day){
        return CalendarService.getDayOfWeek(day);
    };

    /**
     *
     * @param spinningClass
     * @returns {boolean}
     */
    calendarCtrl.isClassEnabled = function(spinningClass) {
        var now = moment();
        return (spinningClass.getDate().diff(now, 'minutes') >= 1);
    };

    /**
     *
     * @param spinningClass
     * @returns {boolean}
     */
    calendarCtrl.isClassSelectable = function(spinningClass) {
        var now = moment();
        return (spinningClass.getDate().diff(now, 'minutes') >= 1) && (spinningClass.getInstructorId());
    };

    /**
     *
     * @returns {string}
     */
    calendarCtrl.getWeekLabel = function() {
        var firstDay = calendarCtrl.week[0].getDate();
        var lastDay = calendarCtrl.week[6].getDate();

        return (firstDay.month() != lastDay.month())? 'Semana del ' + firstDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()]  + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[lastDay.month()] : 'Semana del ' + firstDay.date() + ' al ' + lastDay.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[firstDay.month()];
    };

    /**
     * Set the selected day
     * @param day
     */
    calendarCtrl.setSelectedDay = function(day) {
        calendarCtrl.selectedDay = day;
    };

    /**
     * Determines if selected day and parameter day is the same object
     * @param day
     * @param selectedDay
     * @returns {boolean}
     */
    calendarCtrl.isSameDay = function(day, selectedDay) {
        return (day === selectedDay);
    };

    /**
     *
     * @param spinningClass
     */
    calendarCtrl.selectSpinningClass = function(spinningClass) {
        if (calendarCtrl.isClassSelectable(spinningClass)) {
            setShowCalendar(false);
            $timeout(function(){
                CalendarService.broadcast('spinningClassSelected', spinningClass);
            }, 500);
            usSpinnerService.spin('full-spinner');
        }
    };

    /**
     *
     * @param spinningClass
     */
    calendarCtrl.showSpinningClassInfo = function(spinningClass) {
        spinningClassInfo = spinningClass;
    };

    /**
     *
     * @param spinningClass
     */
    calendarCtrl.isSpinningClassInfoShown = function(spinningClass) {
        return spinningClassInfo == spinningClass;
    };

    /**
     *
     */
    calendarCtrl.getDistributionStyles = function(spinningClass) {
        return spinningClass.getDistributionStyles();
    }

    /**
     *
     * @param instructors
     * @param classes
     */
    calendarCtrl.init = function(instructors, weeklySchedule) {
        // Setting the instructors catalog
        InstructorService.setInstructors(instructors);

        // Getting the instructors array
        calendarCtrl.instructors = InstructorService.getInstructors();

        // Getting the current calendar week
        calendarCtrl.week = CalendarService.getWeek(weeklySchedule);

        // Getting venue catalog
        calendarCtrl.venues = CalendarService.getVenues(weeklySchedule);

        // Setting the default day (for mobile mode view)
        if(calendarCtrl.week.length > 0){
            calendarCtrl.selectedDay = calendarCtrl.week[0];
        }
    };

}]);