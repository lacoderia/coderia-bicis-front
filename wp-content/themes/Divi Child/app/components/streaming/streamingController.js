'use strict';

nbici.controller('StreamingController', ['$scope', '$document', '$timeout', '$sce', 'SessionService', 'StreamingService', 'InstructorService', 'UtilsService', 'LoggerService', 'usSpinnerService', function($scope, $document, $timeout, $sce, SessionService, StreamingService, InstructorService, UtilsService, LoggerService, usSpinnerService){

    var streamingCtrl = this;

    // Scope variables
    /**
     * Streams list
     * @type {undefined}
     */
    streamingCtrl.streams = undefined;

    /**
     * Player stream
     * @type {undefined}
     */
    streamingCtrl.playerStream = undefined;

    /**
     * Instructors list
     * @type {Array}
     */
    streamingCtrl.instructors = [];

    /**
     * @type {undefined}
     * @private
     */
    streamingCtrl.selectedInstructor = undefined;

    /**
     * @type {undefined}
     * @private
     */
    streamingCtrl.selectedDuration = undefined;

    /**
     * @type {undefined}
     * @private
     */
    streamingCtrl.selectedIntensity = undefined;

    // Private variables

    /**
     * Determines if the catalog component is shown
     * @type {boolean}
     */
    var showCatalog = false;

     /**
     * Determines if the player component is shown
     * @type {boolean}
     */
    var showPlayer = false;

     /**
     * Determines if the booking component is shown
     * @type {boolean}
     */
    var showBooking = false;

    // Listeners

    /**
     * Listens for 'sessionCreated' event, run after normal login or requested login
     */
    $scope.$on('sessionCreated', function($event, args) {
        refreshUserPlayableStreams();
    });

    // Function definition

    /**
     * Determines if the catalog component is shown
     * @returns {boolean}
     */
    streamingCtrl.isCatalogVisible = function() {
        return showCatalog;
    };

    /**
     * Determines if the player component is shown
     * @returns {boolean}
     */
    streamingCtrl.isPlayerVisible = function() {
        return showPlayer;
    };

    /**
     * Determines if the booking component is shown
     * @returns {boolean}
     */
    streamingCtrl.isBookingVisible = function() {
        return showBooking;
    };

    /**
     * @param show
     */
    var setShowCatalog = function(show) {
        showCatalog = show;
    };

    /**
     * @param show
     */
    var setShowPlayer = function(show) {
        showPlayer = show;
    };

    /**
     * @param show
     */
    var setShowBooking = function(show) {
        showBooking = show;
    };

    var refreshUserPlayableStreams = function() {
        usSpinnerService.spin('full-spinner');
        StreamingService.getUserPlayableStreams()
        .then(function(data) {
            if(data.available_streaming_classes) {
                streamingCtrl.streams = StreamingService.getStreams();
                if (StreamingService.getSelectedStream()){
                    streamingCtrl.handleStreamClick(StreamingService.getSelectedStream());
                }
                usSpinnerService.stop('full-spinner');
            }
        }, function(error) {
            if(error && error.errors){
                var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                alertify.log(errorMessage, 'error', 5000);
            } else {
                var errorMessage = '<strong>¡Oops! Error al obtener las clases N Casa compradas</strong>, por favor intenta de nuevo';
                alertify.log(errorMessage, 'error', 5000);
            }
            LoggerService.$logger().error(error);
            usSpinnerService.stop('full-spinner');
        });
    }

    /**
     * Gets a particular stream data to show it in the player
     * @param streamId
     */
    var getPlayerStream = function(streamId) {
        usSpinnerService.spin('full-spinner');
        StreamingService.callPlayerStream(streamId)
            .then(function(data) {
                if(data.streaming_class) {
                    streamingCtrl.playerStream = StreamingService.getPlayerStream();
                    usSpinnerService.stop('full-spinner');
                }
            }, function(error) {
                if(error && error.errors){
                    if(error.errors[0].id == 'error_showing_purchased_streaming_class') {
                        streamingCtrl.playerStream = StreamingService.getPlayerStream();
                        if(!streamingCtrl.playerStream){
                            window.location.href = UtilsService.getHomeUrl() + 'n-bici-n-casa';
                        }
                    }
                } else {
                    var errorMessage = '<strong>¡Oops! Error al obtener la clase N Casa</strong>, por favor intenta de nuevo';
                    alertify.log(errorMessage, 'error', 5000);
                }
                LoggerService.$logger().error(error);
                usSpinnerService.stop('full-spinner');
            });
    }

    var watchStream = function(streamId) {
        getPlayerStream(streamId);
        setShowCatalog(false);
        setShowBooking(false);
        setShowPlayer(true);
    }

    var confirmBookStream = function() {
        usSpinnerService.spin('full-spinner');
        StreamingService.bookStream()
            .then(function(data) {
                var streamId = data ? data.available_streaming_class.streaming_class.id : undefined;
                if(streamId) {
                    window.history.pushState(null, null, '?id=' + streamId);
                    watchStream(streamId);
                }
            }, function(error) {
                if(error && error.errors){
                    var errorMessage = "<strong>¡Oops!</strong> " + error.errors[0].title;
                    alertify.log(errorMessage, 'error', 5000);
                } else {
                    var errorMessage = '<strong>¡Oops! Error al comprar la clase N casa</strong>, por favor intenta de nuevo';
                    alertify.log(errorMessage, 'error', 5000);
                }
                LoggerService.$logger().error(error);
                usSpinnerService.stop('full-spinner');
            });
    }

    streamingCtrl.handleStreamClick = function(stream) {
        StreamingService.setSelectedStream(stream);

        if(SessionService.isAuthenticated()) {
            if(stream.getPlayable()){
                window.history.pushState(null, null, '?id=' + stream.getId());
                watchStream(stream.getId());
            } else {
                setShowBooking(true);
                $timeout(function(){
                    var bookingContainer = angular.element(document.getElementById('streaming-booking-component'));
                    $document.scrollToElement(bookingContainer,120, 800);
                }, 0);
            }

        } else {
            StreamingService.broadcast('showLogin');
        }
    };

    streamingCtrl.getSelectedStreamId = function() {
        return StreamingService.getSelectedStream() && StreamingService.getSelectedStream().getId();
    }

    streamingCtrl.getSelectedStreamTitle = function() {
        return StreamingService.getSelectedStream() && StreamingService.getSelectedStream().getTitle();
    }

    streamingCtrl.getSelectedStreamInstructorName = function() {
        return StreamingService.getSelectedStream() && StreamingService.getSelectedStream().getInstructorName();
    }

    streamingCtrl.getSelectedStreamDuration = function() {
        return StreamingService.getSelectedStream() && StreamingService.getSelectedStream().getDuration();
    }

    streamingCtrl.getPlayerStreamTitle = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getTitle();
    }

    streamingCtrl.getPlayerStreamCover = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getCover();
    }

    streamingCtrl.getPlayerStreamDuration = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getDuration();
    }

    streamingCtrl.getPlayerStreamIntensity = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getIntensity();
    }

    streamingCtrl.getPlayerStreamInstructorName = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getInstructorName();
    }

    streamingCtrl.getPlayerStreamPlayable = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getPlayable();
    }

    streamingCtrl.getPlayerStreamEmbedCode = function() {
        return streamingCtrl.playerStream && $sce.trustAsHtml(streamingCtrl.playerStream.getEmbedCode());
    }

    streamingCtrl.getPlayerStreamEndDate = function() {
        return streamingCtrl.playerStream && streamingCtrl.playerStream.getEndDate();
    }

    /**
     * Purchase streaming access
     */
    streamingCtrl.bookStream = function() {
        alertify.set({ labels: {
            ok     : "Si",
            cancel : "No"
        } });

        if( SessionService.get().getStreamingClassesLeft()){
            confirmBookStream();
        } else if (SessionService.get().getClassesLeft()) {
            alertify.confirm( 'No tienes clases N casa. ¿Deseas usar tus clases presenciales?', function(e) {
                if(e) {
                    confirmBookStream();
                }
            });
        } else {
            window.location.href = UtilsService.getHomeUrl() + 'compra-de-paquetes';
        }
    };

    /**
     * Inits the controller
     */
    streamingCtrl.init = function(streamId, streams, instructors) {

        if (streamId) {
            watchStream(streamId);
        } else {
            setShowCatalog(true);
        }

        InstructorService.setInstructors(instructors);
        streamingCtrl.instructors = InstructorService.getInstructors();

        StreamingService.setStreams(streams);
        streamingCtrl.streams = StreamingService.getStreams();

        if(SessionService.isAuthenticated()) {
            refreshUserPlayableStreams();
        } 
    };

}]);