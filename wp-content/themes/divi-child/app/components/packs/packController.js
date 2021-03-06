'use strict';

nbici.controller('PackController', ['$scope', '$document', '$timeout', 'SessionService', 'PackService', 'usSpinnerService', function($scope, $document, $timeout, SessionService, PackService, usSpinnerService){

    var packCtrl = this;

    // Scope variables
    /**
     * Packs list
     * @type {undefined}
     */
    packCtrl.packs = undefined;

    // Private variables

    /**
     * Determines if the packs container is shown
     * @type {boolean}
     */
    var showPacks = false;

    /**
     * Determines if the packs list is shown
     * @type {boolean}
     */
    var showPacksList = true;

    // Listeners

    /**
     * Listens for 'userNeedsClasses' event
     */
    $scope.$on('userNeedsClasses', function($event, args) {
        $timeout(function(){
            setShowPacks(true);
            setShowPacksList(true);
        }, 800);

        $timeout(function(){
            usSpinnerService.stop('full-spinner');

            var calendarContainer = angular.element(document.getElementById('packs'));
            $document.scrollToElement(calendarContainer, 130, 800);
        }, 1200);
    });

    /**
     * Listens for 'userBoughtClasses' event
     */
    $scope.$on('userBoughtClasses', function($event, args) {
        setShowPacks(false);
    });


    /**
     * Listens for 'setCurrentPack' event
     */
    $scope.$on('selectPack', function(){
        packCtrl.selectPack(PackService.getSelectedPack());
    });

    /**
     * Listens for 'closePacksView' event
     */
    $scope.$on('closePacksView', function(){
        setShowPacks(false);
        setShowPacksList(false);
    });

    /**
     * Listens for 'close classroom' event
     */
    $scope.$on('classroomClosed', function($event){
        PackService.resetSelectedPack();
    });

    // Function definition

    /**
     * Determines if the packs container is shown
     * @returns {boolean}
     */
    packCtrl.isVisible = function() {
        return showPacks;
    };

    /**
     * Determines if the packs container is shown
     * @returns {boolean}
     */
    packCtrl.isPacksListVisible = function() {
        return showPacksList;
    };

    /**
     *
     * @param show
     */
    var setShowPacks = function(show) {
        showPacks = show;
    };

    /**
     *
     * @param show
     */
    var setShowPacksList = function(show) {
        showPacksList = show;
    };

    /**
     * Listen the click event triggered by the pack
     * @param $event
     * @param pack
     */
    packCtrl.selectPack = function(pack) {
        PackService.setSelectedPack(pack);

        if(SessionService.isAuthenticated()) {
            PackService.broadcast('packSelected', PackService.getSelectedPack());
        } else {
            PackService.broadcast('showLogin', 'selectPack');
        }
    };

    packCtrl.closePacks = function() {
        PackService.broadcast('closePacksView');
    };

    packCtrl.isSelectedPack = function(pack) {
        return (PackService.getSelectedPack() && pack.getId() == PackService.getSelectedPack().getId());
    };

    packCtrl.isSpecialPack = function(pack) {
        if(pack.getForceSpecialPrice()) {
            return (pack.getSpecialPrice() !== null)? true : false;
        } else if(SessionService.get()){
            return (!SessionService.get().getLastClassPurchased() && pack.getSpecialPrice() !== null)? true : false;
        }else{
            return (pack.getSpecialPrice() !== null)? true : false;
        }
    };

    packCtrl.isUserFirstClass = function() {
        if (SessionService.get() && !SessionService.get().getLastClassPurchased()) {
            return false;
        }
        return true;
    }

    /**
     * Inits the controller
     */
    packCtrl.init = function(packs) {

        // We show the packs container on pages that don't involve booking (home & packs pages)
        if(!document.getElementsByClassName('booking-component').length) {
            setShowPacks(true);
        }

        PackService.setPacks(packs);
        packCtrl.packs = PackService.getPacks();

    };

}]);