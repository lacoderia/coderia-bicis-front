'use strict';

nbici.controller('TestController', ['$rootScope', '$scope', 'TestService', function($rootScope, $scope, TestService){

    $scope.routes = [];

    var getRoutes = function(){
        TestService.getRoutes()
            .success(function(data){
                if(data){
                    console.log(data);
                    $scope.routes = data;
                }
            })
            .error(function(){
                console.log('HUBO UN ERROR AL OBTENER LAS RUTAS');
            });
    };

    var init = function(){
        getRoutes();
    };

    init();

}]);