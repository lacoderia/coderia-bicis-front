'use strict';

nbici.factory('InstructorProfileService', ['$http', '$q', '$rootScope', 'LoggerService', 'DEFAULT_VALUES', function($http, $q, $rootScope, LoggerService, DEFAULT_VALUES){

    /**
     * Array with the instructors list
     * @type {Array}
     */
    var _instructorProfile;

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     * Return an array with the instructors list
     * @returns {*|Array}
     */
    var getInstructorProfile = function() {
        return angular.copy(_instructorProfile);
    };

    /**
     * Set the instructors list as an array
     * @param instructorProfile
     */
    var setInstructorProfile = function(instructorProfile) {
        if(instructorProfile){
            _instructorProfile = transformToObject(instructorProfile);
        }
    };

    var transformToObject = function(instructorProfile){

        try {
            var spinningClasses = [];
            var weeklySchedules = instructorProfile.weekly_schedules.schedules;
            for (var i = 0; i < weeklySchedules.length; i++) {
                var item = weeklySchedules[i];
                var spinningClass = new SpinningClass(
                                        item.id, 
                                        instructorProfile.id, 
                                        instructorProfile.first_name, 
                                        item.room.id, 
                                        item.datetime, 
                                        item.available_seats, 
                                        item.schedule_type ? item.schedule_type.id : undefined, 
                                        item.schedule_type ? item.schedule_type.name : '', 
                                        item.description, 
                                        item.free, 
                                        (item.alternate_instructor ? item.alternate_instructor.first_name : ''), 
                                        item.price, 
                                        item.room.venue.style);
                spinningClasses.push(spinningClass);
            }

            var weekCalendar = [];
            for(var i=0; i<DEFAULT_VALUES.WEEK_LENGTH; i++) {
                var day = moment(instructorProfile.weekly_schedules.start_day).add({'days': i});
                var calendarDay = new CalendarDay(day, []);

                for(var j=0; j<spinningClasses.length; j++) {
                    if(spinningClasses[j].getDate().isSame(calendarDay.getDate(), 'day')) {
                        calendarDay.addSpinningClass(spinningClasses[j]);
                    }
                }

                weekCalendar.push(calendarDay);
            }

            instructorProfile.week = weekCalendar;

        } catch(error){
            LoggerService.$logger().error(error);
        }

        return instructorProfile;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    var getDayOfWeek = function(day) {
        return (day>=0 && day<=7)? DEFAULT_VALUES.DAYS_OF_WEEK[day]: -1;
    };

    var getVenues = function(data) {
        return data.weekly_schedules.venues;
    }

    return {
        broadcast: broadcast,
        getInstructorProfile: getInstructorProfile,
        setInstructorProfile: setInstructorProfile,
        getDayOfWeek: getDayOfWeek,
        getVenues: getVenues,
    };

}]);