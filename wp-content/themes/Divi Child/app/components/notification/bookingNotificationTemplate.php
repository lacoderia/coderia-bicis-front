<?php
    wp_enqueue_script( 'NotificationController' );
?>

<div id="booking-notification" ng-controller="NotificationController as notificationCtrl" ng-init="notificationCtrl.init()">
    <h1 style="text-align: center; color: #fff;">¡Tu reservación está lista!</h1>
    <h3 style="text-align: center; color: #fff;">{{ notificationCtrl.bookingMessage }}</h3>
    <h3 style="text-align: center; color: #fff;">{{ notificationCtrl.bookingBicycleNumber }}</h3>
    <div ng-show="notificationCtrl.isBookingTipsVisible()">
        <p style="text-align: center; color: #fff;">Te recordamos:</p>
        <ul style="margin: auto; max-width: 400px;">
            <li>Si deseas cancelar la clase puedes hacerlo únicamente con 12 horas de anticipación, de lo contrario no hay reembolso y pierdes tu clase.</li>
            <li>Recuerda hidratarte antes, durante y después de la clase.</li>
            <li>Lleva ropa que transpire, ya que puede subir mucho la temperatura en el estudio.</li>
            <li>No olvides hacer uso de los lockers, ya que no nos hacemos responsables por cosas perdidas.</li>
            <li>Llega 10 minutos antes, ya que una vez iniciada la clase no podrás pasar al salón.</li>
        </ul>
    </div>
    <div style="text-align: center;">
        <a ng-click="notificationCtrl.setShowBookingTips(true)" ng-hide="notificationCtrl.isBookingTipsVisible()" style="cursor: pointer">Mostrar detalles</a>
        <a ng-click="notificationCtrl.setShowBookingTips(false)" ng-show="notificationCtrl.isBookingTipsVisible()" style="cursor: pointer">Ocultar detalles</a>
    </div>
</div>