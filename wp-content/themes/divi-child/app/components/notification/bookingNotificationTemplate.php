<?php
    wp_enqueue_script( 'NotificationController' );
?>

<div id="booking-notification" ng-controller="NotificationController as notificationCtrl" ng-init="notificationCtrl.init()">
    <h1 style="text-align: center; color: #fff;">{{ notificationCtrl.bookingTitle }}</h1>
    <h3 style="text-align: center; color: #fff;">{{ notificationCtrl.bookingMessage }}</h3>
    <h3 style="text-align: center; color: #fff;">{{ notificationCtrl.bookingBicycleNumber }}</h3>
    <div ng-show="notificationCtrl.isBookingTipsVisible()">
        <p style="text-align: center; color: #fff;">Te recordamos:</p>
        <ul style="margin: auto; max-width: 400px;" ng-if="!notificationCtrl.isWaitingList()">
            <li>Si deseas cancelar la clase puedes hacerlo únicamente con 12 horas de anticipación, de lo contrario no hay reembolso y pierdes tu clase.</li>
            <li>Recuerda hidratarte antes, durante y después de la clase.</li>
            <li>Lleva ropa que transpire, ya que puede subir mucho la temperatura en el estudio.</li>
            <li>No olvides hacer uso de los lockers, ya que no nos hacemos responsables por cosas perdidas.</li>
            <li>Llega 10 minutos antes, ya que una vez iniciada la clase no podrás pasar al salón.</li>
        </ul>
        <ul style="margin: auto; max-width: 400px;" ng-if="notificationCtrl.isWaitingList()">
            <li>Si se libera algún lugar te notificaremos por correo electrónico con los datos de la clase.</li>
            <li>En caso de no haber lugar, se te regresará tu clase automáticamente.</li>
            <li>Recuerda que si es una clase especial se te regresará en monedero, el cual solo podrás ocupar en compra de paquetes.</li>
        </ul>
    </div>
    <div style="text-align: center;">
        <a ng-click="notificationCtrl.setShowBookingTips(true)" ng-hide="notificationCtrl.isBookingTipsVisible()" style="cursor: pointer">Mostrar detalles</a>
        <a ng-click="notificationCtrl.setShowBookingTips(false)" ng-show="notificationCtrl.isBookingTipsVisible()" style="cursor: pointer">Ocultar detalles</a>
    </div>
</div>