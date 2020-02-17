'use strict';

nbici.controller('SmoothiesController', ['$scope', '$document', '$timeout', 'SessionService', 'SmoothiesService', 'LoggerService', 'localStorageService', 'usSpinnerService', function($scope, $document, $timeout, SessionService, SmoothiesService, LoggerService, localStorageService, usSpinnerService){

    var smoothiesCtrl = this;

    var booking = undefined;

    // Scope variables
    
    smoothiesCtrl.productsCatalog = undefined;
    smoothiesCtrl.cards = undefined;
    smoothiesCtrl.selectedCard = undefined;
    smoothiesCtrl.orderComments = undefined;
    smoothiesCtrl.processingPayment = false;

    // Private variables

    /**
     * Determines if the menu container is shown
     * @type {boolean}
     */
    var showMenu = false;

    /**
     * Determines if the purchase confirmation is shown
     * @type {boolean}
     */
    var showPurchaseConfirmation = false;

    /**
     * Determines if the purchase confirmation is shown
     * @type {boolean}
     */
    var purchaseAvailable = true;

    // Function definition

    /**
     * Determines if the smoothies container is shown
     * @returns {boolean}
     */
    smoothiesCtrl.isMenuVisible = function() {
        return showMenu;
    };

    /**
     * Determines if the smoothies container is shown
     * @returns {boolean}
     */
    smoothiesCtrl.isPurchaseConfirmationVisible = function() {
        return showPurchaseConfirmation;
    };

    /**
     * Determines if the user can order products
     * @returns {boolean}
     */
    smoothiesCtrl.isPurchaseAvailable = function() {
        return purchaseAvailable;
    };

    /**
     *
     * @param show
     */
    var setShowMenu = function(show) {
        showMenu = show;
    };

     /**
     *
     * @param show
     */
    var setShowPurchaseConfirmation = function(show) {
        showPurchaseConfirmation = show;
    };

    /**
     * Listen the click event triggered by the category picture
     * @param $event
     * @param category
     */
    smoothiesCtrl.selectCategory = function(category) {
        SmoothiesService.setSelectedCategory(category);
        setShowMenu(true);
    };

    smoothiesCtrl.getSelectedCategory = function() {
        return SmoothiesService.getSelectedCategory();
    };

    smoothiesCtrl.isSelectedCategory = function(category) {
        return (SmoothiesService.getSelectedCategory() && category.id == SmoothiesService.getSelectedCategory().id);
    };

    smoothiesCtrl.addProduct = function(product) {
        SmoothiesService.addProduct(product);
        smoothiesCtrl.productsCatalog = SmoothiesService.getProductsCatalog();
    }

    smoothiesCtrl.removeProduct = function(product) {
        SmoothiesService.removeProduct(product);
        smoothiesCtrl.productsCatalog = SmoothiesService.getProductsCatalog();
    }

    smoothiesCtrl.getOrderTotal = function() {
        return SmoothiesService.getOrderTotal();
    }

    smoothiesCtrl.placeOrder = function() {
        var appointmentId = undefined;
        if (booking && booking.id) {
            appointmentId = booking.id
        }

        var orderTotal = SmoothiesService.getOrderTotal();
        var cardId = smoothiesCtrl.selectedCard ? smoothiesCtrl.selectedCard.getUid() : undefined;
        var notes = smoothiesCtrl.orderComments;
        var menuItems = [];

        for(var i=0; i<smoothiesCtrl.productsCatalog.length; i++) {
            for(var j=0; j<smoothiesCtrl.productsCatalog[i].products.length; j++) {
                if (smoothiesCtrl.productsCatalog[i].products[j].quantity > 0) {
                    menuItems.push({
                        id: smoothiesCtrl.productsCatalog[i].products[j].product.getId(),
                        amount: smoothiesCtrl.productsCatalog[i].products[j].quantity,
                    });
                }
            }   
        }

        if (cardId && orderTotal > 0) {
            usSpinnerService.spin('full-spinner');
            smoothiesCtrl.processingPayment = true;

            SmoothiesService.placeOrder(appointmentId, orderTotal, cardId, notes, menuItems)
                .then(function(data) {
                    if(data.menu_purchase) {
                        usSpinnerService.stop('full-spinner');
                        smoothiesCtrl.processingPayment = false;

                        setShowMenu(false);
                        setShowPurchaseConfirmation(true);
                    }
                }, function(error) {
                    if(error && error.errors){
                        var errorMessage = '<strong>¡Oops! Hubo un error al procesar el pago</strong>, ' + error.errors[0].title;
                        alertify.log(errorMessage, 'error', 5000);
                    } else {
                        var errorMessage = '<strong>¡Oops! Hubo un error al procesar el pago</strong>, por favor intenta de nuevo';
                        alertify.log(errorMessage, 'error', 5000);
                    }
                    LoggerService.$logger().error(error);
                    usSpinnerService.stop('full-spinner');
                    smoothiesCtrl.processingPayment = false;
                });
        }

    }

    /**
     * Inits the controller
     */
    smoothiesCtrl.init = function(productsCatalog, cards) {
        SmoothiesService.setProductsCatalog(productsCatalog);
        smoothiesCtrl.productsCatalog = SmoothiesService.getProductsCatalog();

        SmoothiesService.setCards(cards);
        smoothiesCtrl.cards = SmoothiesService.getCards();
        smoothiesCtrl.selectedCard = SmoothiesService.getPrimaryCard();

        booking = localStorageService.get('nbc-booking');
        if (booking && booking.showMenu) {
            purchaseAvailable = true;
        } else {
            purchaseAvailable = false;
        }
    };

}]);