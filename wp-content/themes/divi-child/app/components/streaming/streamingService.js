'use strict';

nbici.factory('StreamingService', ['$http', '$q', '$rootScope', 'SessionService', 'LoggerService', 'API_URL_BASE', function($http, $q, $rootScope, SessionService, LoggerService, API_URL_BASE){

    // Variables definition
 
    var service;
    var streams = [];
    var selectedStream;
    var playerStream;

    // Service API Definition
    /**
     *
     * @param msg
     * @param data
     */
    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    /**
     * Returns the streams list
     * @returns {*[]}
     */
    var getStreams = function() {
        return angular.copy(streams);
    };

    var transformToStreamObject = function(item) {
        var instructor = new Instructor();
        if(item.instructor){
            instructor.setId(item.instructor.id);
            instructor.setName(item.instructor.first_name);
        }
        return new Stream(
            item.id, 
            item.title,
            item.description,
            instructor.getId(), 
            instructor.getName(), 
            item.length, 
            item.intensity, 
            item.insertion_code ? true : false,
            API_URL_BASE + item.photo,
            item.insertion_code,
            item.start ? new moment(item.start).add(1, 'day') : undefined,
            item.featured
            );
    }

    var transformToStreamArray = function(array){
        var list = [];

        try {
            for(var i=0; i<array.length; i++) {
                var item = array[i];
                list.push(transformToStreamObject(item));
            }
        } catch(error) {
            LoggerService.$logger().error(error);
        }

        return list;
    };

    var setStreams = function(streamsList) {
        if(streamsList){
            streams = transformToStreamArray(streamsList);
        }
    };

    var getStreamById = function(streamId) {
        for(var i=0; i<streams.length; i++){
            if(streams[i].getId() == streamId){
                return streams[i];
            }
        }
    }

    var getPlayerStream = function() {
        return angular.copy(playerStream);
    };

    var setPlayerStream = function(stream) {
        playerStream = stream instanceof Stream ? stream : transformToStreamObject(stream);
    }

    var callPlayerStream = function(streamId) {
        var streamingServiceURL = API_URL_BASE + '/streaming_classes/' + streamId;
        return $http.get(streamingServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    var stream = data.streaming_class;
                    stream.start = data.available_streaming_class.start;
                    setPlayerStream(stream);
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                if(error.data && error.data.errors[0].id == 'error_showing_purchased_streaming_class') {
                    var stream = getStreamById(streamId);
                    stream && setPlayerStream(stream);
                }
                return $q.reject(error.data);
            });
    }

    var refreshStreamsPlayability = function(playableStreams) {
        for(var i=0; i<streams.length; i++){
            for(var j=0; j<playableStreams.length; j++){
                if(streams[i].getId() == playableStreams[j].streaming_class.id){
                    streams[i].setPlayable(true);
                    streams[i].setEndDate(new moment(playableStreams[j].start).add(1, 'day'))
                }
            }   
        }
        // Update selectedStream if necessary
        if(selectedStream) {
            selectedStream = getStreamById(selectedStream.getId());
        }
    }

    var setSelectedStream = function(stream) {
        selectedStream = stream;
    };

    var getSelectedStream = function() {
        return angular.copy(selectedStream);
    };

    var bookStream = function() {
        var streamingServiceURL = API_URL_BASE + '/available_streaming_classes/purchase';
        return $http.post(streamingServiceURL, { streaming_class_id: selectedStream.getId() })
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    SessionService.get().setClassesLeft(data.available_streaming_class.user.classes_left);
                    SessionService.get().setStreamingClassesLeft(data.available_streaming_class.user.streaming_classes_left);
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    };

    var getUserPlayableStreams = function() {
        var streamingServiceURL = API_URL_BASE + '/available_streaming_classes';
        return $http.get(streamingServiceURL)
            .then(function(response) {
                var data = response.data;
                if (typeof data === 'object') {
                    refreshStreamsPlayability(data.available_streaming_classes)
                    return data;
                } else {
                    return $q.reject(data);
                }
            }, function(error){
                return $q.reject(error.data);
            });
    }

    service = {
        broadcast: broadcast,
        getStreams: getStreams,
        setStreams: setStreams,
        getPlayerStream: getPlayerStream,
        callPlayerStream: callPlayerStream,
        getUserPlayableStreams: getUserPlayableStreams,
        setSelectedStream: setSelectedStream,
        getSelectedStream: getSelectedStream,
        bookStream: bookStream,
    };

    return service;

}]);