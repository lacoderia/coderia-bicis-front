'use strict';

nbici.controller('TestController', ['$rootScope', '$scope', 'TestService', function($rootScope, $scope, TestService){

    $scope.routes = [
        {"id": 1, "name": "Ruta 1", "description": "ruta de prueba", "active": true, "url": "http://servicios.coderia.mx/routes/1.json"}
    ];

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