/**
 * Created by owen on 26/02/16.
 */

'use strict';

nbici.factory('TestService', ['$http', '$q', 'DEFAULT_VALUES', function($http, $q, DEFAULT_VALUES){

    var getRoutes = function(assetType){

        var serviceURL = 'http://servicios.coderia.mx/routes.json';
        return $http.get(serviceURL, {})
            .success(function(data){
                if(data){
                    console.log(data);
                }
            })

        return [];
    };

    var service = {
        getRoutes: getRoutes,
    };

    return service;

}]);