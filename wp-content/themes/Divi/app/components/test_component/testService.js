/**
 * Created by owen on 26/02/16.
 */

nbici.factory('TestService', ['"$http", "$q"', function($http, $q){


    var getRoutes = function(){
        var routeServiceURL = 'http://servicios.coderia.mx/routes.json';

        return $http.get(routeServiceURL, {})
            .success(function (data){
                if(data){
                    console.log(data);
                }
            })
    };

    return {
        'getRoutes': getRoutes
    };

}]);