nbici.filter('classByInstructor', function(){
    /**
     * Filter spinning class list by instructor
     * @return _spinningClasses
     */
    return function(spinningClasses, instructor) {

        var _spinningClasses = [];
        if(instructor) {
            for(var i=0; i<spinningClasses.length; i++) {
                var currentClass = spinningClasses[i];
                if(currentClass.getInstructorId() == instructor.getId()){
                    _spinningClasses.push(currentClass);
                }
            }

        } else {
            _spinningClasses = spinningClasses;
        }

        return _spinningClasses;

    }
});