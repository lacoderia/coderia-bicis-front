'use strict';

nbici.factory('SocialService', ['$http', '$q', '$rootScope', 'SessionService', 'API_URL_BASE', function($http, $q, $rootScope, SessionService, API_URL_BASE){

    // Variables definition
    /**
     *  Service object
     */
    var service;

    /**
     *
     * @param msg
     * @param data
     */
    var configTwitter = function(coupon) {
        a2a_config.linkname = "N-Bici";
        a2a_config.linkurl = "www.n-bici.com";

        var twitterTemplate = "Actívate con N Bici http://www.n-bici.com";
        if(coupon) {
            twitterTemplate = "¡Te invito a vivir la experiencia N bici utilizando este cupón: " + coupon + "! Agrégalo al pagar en http://www.n-bici.com";
        }

        a2a_config.templates = {
            twitter: twitterTemplate
        };

    };

    var shareFB = function(coupon) {
        if(coupon){
            FB.ui({
                method: 'feed',
                link: 'http://n-bici.com',
                title: 'CUPÓN: ' + coupon,
                description: '¡Baila sobre ruedas! ¡' + SessionService.get().getFirstName() + ' te invita a vivir la experiencia N bici utilizando este cupón! ¡Agrégalo al hacer tu siguiente compra y rueda con nosotros!',
                caption: 'Obtén un descuento usando este cupón'
            }, function (response) {
            });
        } else {
            FB.ui({
                method: 'feed',
                link: 'http://n-bici.com',
                title: '¡Actívate con N Bici!',
                caption: 'http://n-bici.com'
            }, function (response) {
            });
        }

    };

    service = {
        configTwitter: configTwitter,
        shareFB: shareFB
    };

    return service;

}]);

