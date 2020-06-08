nbici.filter('streamByInstructor', function(){
    /**
     * Filter streaming class list by instructor
     * @return _streams
     */
    return function(streams, instructor) {

        var _streams = [];
        if(instructor) {
            for(var i=0; i<streams.length; i++) {
                var currentStream = streams[i];
                if(currentStream.getInstructorId() == instructor.getId()){
                    _streams.push(currentStream);
                }
            }

        } else {
            _streams = streams;
        }

        return _streams;

    }
});