'use strict';

nbici.factory('SessionService', ['$http', '$rootScope', 'localStorageService', function($http, $rootScope, localStorageService){

    var _session = undefined;

    var broadcast = function(msg, data) {
        $rootScope.$broadcast(msg, data);
    };

    var createSession = function (user) {
        var session = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            classesLeft: user.classes_left,
            streamingClassesLeft: user.streaming_classes_left,
            lastClassPurchased: user.last_class_purchased,
            active: user.active,
            coupon: user.coupon,
            couponValue: user.coupon_value,
            balance: user.credits,
            isTestUser: user.test,
            linked: user.linked
        }
        
        _session = new User(session);
        broadcast('sessionCreated');
    };

    var destroySession = function() {
        _session = undefined;
    };

    var get = function() {
        return angular.copy(_session);
    };

    var isAuthenticated = function() {
        return (this.get())? true : false;
    };

    var isHttpHeaders = function() {
        return (getHttpHeaders() ? true : false);
    };

    var getHttpHeaders = function() {
        return localStorageService.cookie.get('nbc-headers');
    };

    var configHttpHeaders = function() {
        var headers = getHttpHeaders();

        $http.defaults.headers.common['access-token'] = headers.accessToken;
        $http.defaults.headers.common['expiry'] = headers.expiry;
        $http.defaults.headers.common['token-type'] = headers.tokenType;
        $http.defaults.headers.common['uid'] = headers.uid;
        $http.defaults.headers.common['client'] = headers.client;
    };

    var setHttpHeaders = function(headers) {
        localStorageService.cookie.set('nbc-headers', headers);
        configHttpHeaders(headers);
    };

    var unsetHttpHeaders = function() {
        localStorageService.cookie.remove('nbc-headers');

        $http.defaults.headers.common['access-token'] = undefined;
        $http.defaults.headers.common['expiry'] = undefined;
        $http.defaults.headers.common['token-type'] = undefined;
        $http.defaults.headers.common['uid'] = undefined;
        $http.defaults.headers.common['client'] = undefined;
    };

    return{
        destroySession: destroySession,
        createSession: createSession,
        get: get,
        isAuthenticated: isAuthenticated,
        isHttpHeaders: isHttpHeaders,
        setHttpHeaders: setHttpHeaders,
        unsetHttpHeaders: unsetHttpHeaders,
        configHttpHeaders: configHttpHeaders
    };

}]);