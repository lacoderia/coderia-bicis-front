'use strict';

nbici.factory('CalendarService', ['$rootScope', 'LoggerService', 'DEFAULT_VALUES', function($rootScope,  LoggerService, DEFAULT_VALUES){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     *
     * @type {Array}
     */
    var weekCalendar = [];

    /**
     *
     *
     */
    var dayClasses = [];

    // Functions definition

    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    var transformToObject = function(array){
        var list = [];

        try {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var instructor = new Instructor();

                if(item.instructor){
                    instructor.setId(item.instructor.id);
                    instructor.setName(item.instructor.first_name);
                }

                var spinningClass = new SpinningClass(item.id, instructor.getId(), instructor.getName(), item.room.id, item.datetime, item.available_seats, item.description, item.free, (item.alternate_instructor ? item.alternate_instructor.first_name : ''), item.price);
                list.push(spinningClass);
            }
        } catch(error){
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     *
     * @param classes
     */
    var setSpinningClasses = function(classes) {
        if(classes){
            dayClasses = transformToObject(classes);
        }
    };

    /**
     *
     * @param spinningClass
     * @param calendarDay
     * @returns {boolean|*}
     */
    var isSameDay = function(spinningClass, calendarDay) {
        return  (spinningClass.getDate().date() == calendarDay.getDate().date()) &&
                (spinningClass.getDate().month() == calendarDay.getDate().month());
    };
    

    /**
     *
     * @param calendarDay
     * @returns {*}
     */
    var getSpinningClasses = function(calendarDay) {
        for(var dayIndex=0; dayIndex<dayClasses.length; dayIndex++) {
            var spinningClass = dayClasses[dayIndex];
            if(isSameDay(spinningClass, calendarDay)) {
                calendarDay.getSpinningClasses().push(spinningClass);
            }
        }

        calendarDay.setSpinningClasses(calendarDay.getSpinningClasses());

        return calendarDay;
    };

    /**
     *
     * @returns {*|Map.<K, V>|Map.<string, V>}
     */
    var getWeek = function(weeklySchedule) {
        setSpinningClasses(weeklySchedule.schedules);

        for(var i=0; i<DEFAULT_VALUES.WEEK_LENGTH; i++) {
            var day = moment(weeklySchedule.start_day).add({'days': i});
            var calendarDay = new CalendarDay(day, []);
            weekCalendar.push(getSpinningClasses(calendarDay));
        }
        return weekCalendar;
    };

    /**
     *
     * @param day
     * @returns {number}
     */
    var getDayOfWeek = function(day) {
        return (day>=0 && day<=7)? DEFAULT_VALUES.DAYS_OF_WEEK[day]: -1;
    };


    service = {
        broadcast: broadcast,
        getWeek: getWeek,
        getDayOfWeek: getDayOfWeek
    };

    return service;

}]);
