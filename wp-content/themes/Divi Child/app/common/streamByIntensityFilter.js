nbici.filter('streamByIntensity', function(){
    /**
     * Filter streaming class list by intensity
     * @return _streams
     */
    return function(streams, intensity) {

        var _streams = [];
        if(intensity) {
            for(var i=0; i<streams.length; i++) {
                var currentStream = streams[i];
                if(currentStream.getIntensity() == intensity){
                    _streams.push(currentStream);
                }
            }

        } else {
            _streams = streams;
        }

        return _streams;

    }
});