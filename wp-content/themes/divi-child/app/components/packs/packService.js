'use strict';

nbici.factory('PackService', ['$rootScope', 'LoggerService', 'SessionService', function($rootScope, LoggerService, SessionService){

    // Variables definition
    /**
     *
     */
    var service;

    /**
     *
     */
    var packs = [];

    /**
     *
     */
    var selectedPack;

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
     * Returns the packs list
     * @returns {*[]}
     */
    var getPacks = function() {
        return angular.copy(packs);
    };

    var transformToObject = function(array){
        var list = [];

        try {
            for(var i=0; i<array.length; i++) {
                var item = array[i];
                list.push(new Pack(item.id, item.description, item.classes, item.price, item.special_price, item.force_special_price, item.expiration));
            }
        } catch(error) {
            LoggerService.$logger().error(error);
        }

        return list;
    };

    /**
     * Set the packs list as an array
     * @param packList
     */
    var setPacks = function(packList) {
        if(packList){
            packs = transformToObject(packList);
        }
    };

    var setSelectedPack = function(pack) {
        selectedPack = pack;
    };

    var getSelectedPack = function() {
        return angular.copy(selectedPack);
    };

    var resetSelectedPack = function() {
        selectedPack = undefined;
    }

    var getSelectedPackPrice = function() {
        if(selectedPack){
            var isFirstPurchase = SessionService.isAuthenticated() && !SessionService.get().getLastClassPurchased()
            var forceSpecialPrice = selectedPack.getForceSpecialPrice();
            if ((isFirstPurchase || forceSpecialPrice) && selectedPack.getSpecialPrice()) {
                return selectedPack.getSpecialPrice();
            } else {
                return selectedPack.getPrice();
            }
        }
    };

    service = {
        broadcast: broadcast,
        getPacks: getPacks,
        setPacks: setPacks,
        setSelectedPack: setSelectedPack,
        getSelectedPack: getSelectedPack,
        getSelectedPackPrice: getSelectedPackPrice,
        resetSelectedPack: resetSelectedPack,
    };

    return service;

}]);