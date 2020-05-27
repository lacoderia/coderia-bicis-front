nbici.filter('streamByDuration', function(){
    /**
     * Filter streaming class list by duration
     * @return _streams
     */
    return function(streams, duration) {

        var _streams = [];
        if(duration) {
            for(var i=0; i<streams.length; i++) {
                var currentStream = streams[i];
                if(currentStream.getDuration() == duration){
                    _streams.push(currentStream);
                }
            }

        } else {
            _streams = streams;
        }

        return _streams;

    }
});