'use strict';

nbici.controller('NotificationController', ['$scope', 'SessionService', 'UtilsService', 'SocialService', 'localStorageService', 'DEFAULT_VALUES', function($scope, SessionService, UtilsService, SocialService, localStorageService, DEFAULT_VALUES){

    // Private variables
    /**
     *
     */
    var notificationCtrl = this;

    notificationCtrl.homeUrl;
    notificationCtrl.purchaseMessage;
    notificationCtrl.bookingTitle;
    notificationCtrl.bookingMessage;
    notificationCtrl.bookingBicycleNumber;
    notificationCtrl.bookingCalendarDescription;
    notificationCtrl.bookingDate;

    /**
     * Determines if the booking tips container is shown
     * @type {boolean}
     */
    var showBookingTips = false;

    /**
     *
     */
    notificationCtrl.shareFB = function() {
        SocialService.shareFB();
    };

    /**
     * Determines if the booking tips container is shown
     * @returns {boolean}
     */
    notificationCtrl.isBookingTipsVisible = function() {
        return showBookingTips;
    }

    /**
     *
     * @param show
     */
    notificationCtrl.setShowBookingTips = function(show) {
        showBookingTips = show;
    };

    /**
     *
     */
    notificationCtrl.isWaitingList = function() {
        var booking = localStorageService.get('nbc-booking');
        return booking && !booking.bicycleNumber;
    };

    /**
     * Inits the controller
     */
    notificationCtrl.init = function() {
        notificationCtrl.homeUrl = UtilsService.getHomeUrl();

        // Purchase notification
        var purchase = localStorageService.get('nbc-purchase');

        if (purchase && purchase.classes) {
            notificationCtrl.purchaseMessage = purchase.classes;

            if (purchase.classes > 1) {
                notificationCtrl.purchaseMessage += ' clases - ';
            } else {
                notificationCtrl.purchaseMessage += ' clase - ';
            }

            notificationCtrl.purchaseMessage += '$' + purchase.price + '.00';
        }
        localStorageService.remove('nbc-purchase');

        // Booking notification
        var booking = localStorageService.get('nbc-booking');
        var date = booking ? moment(booking.date) : undefined;

        notificationCtrl.bookingDate = booking.date;

        if (booking && booking.bicycleNumber) {
            notificationCtrl.bookingMessage = date ? booking.instructor + ' te espera el día ' + date.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[date.month()] + ' a las ' + date.format('H:mm') + ' hrs.' : '';
            notificationCtrl.bookingBicycleNumber = 'Tu bici es la número ' + booking.bicycleNumber;
            notificationCtrl.bookingTitle = '¡Tu reservación está lista!';
            notificationCtrl.bookingCalendarDescription = 'Clase de Nbici con ' + booking.instructor;
        } else {
            notificationCtrl.bookingMessage = date ? 'Te anotaste en la lista de espera con ' + booking.instructor + ', el día ' + date.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[date.month()] + ' a las ' + date.format('H:mm') + ' hrs.' : '';
            notificationCtrl.bookingTitle = 'Lista de espera';
            notificationCtrl.bookingCalendarDescription = 'Clase de Nbici (En lista de espera)';
        }

        SocialService.configTwitter();

    }

}]);