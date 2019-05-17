'use strict';

nbici.controller('NotificationController', ['$scope', 'SessionService', 'UtilsService', 'SocialService', 'localStorageService', 'DEFAULT_VALUES', function($scope, SessionService, UtilsService, SocialService, localStorageService, DEFAULT_VALUES){

    // Private variables
    /**
     *
     */
    var notificationCtrl = this;

    notificationCtrl.homeUrl;
    notificationCtrl.purchaseMessage;
    notificationCtrl.bookingMessage;
    notificationCtrl.bookingBicycleNumber;

    /**
     *
     */
    notificationCtrl.shareFB = function() {
        SocialService.shareFB();
    };

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

        if (booking && booking.bicycleNumber) {
            var date = moment(booking.date);
            notificationCtrl.bookingMessage = booking.instructor + ' te espera el día ' + date.date() + ' de ' + DEFAULT_VALUES.LABEL_MONTHS[date.month()] + ' a las ' + date.format('H:mm') + ' hrs.';
            notificationCtrl.bookingBicycleNumber = 'Tu bici es la número ' + booking.bicycleNumber;
        }
        localStorageService.remove('nbc-booking');

        SocialService.configTwitter();

    }

}]);