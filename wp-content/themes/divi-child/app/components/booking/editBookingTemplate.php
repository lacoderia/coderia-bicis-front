<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'BookingService' );
    wp_enqueue_script( 'BookingController' );
?>

<div id="booking" class="booking-component animate-visibility" ng-controller="BookingController as bookingCtrl" ng-show="bookingCtrl.isVisible()">
    <h2>Verifica tu reservación</h2>
    <div class="booking-info">
        <div><span class="booking-date">Fecha de reservación:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().date">---</span>{{ bookingCtrl.getBooking().date.local('es').format('MMMM D, h:mm a') }}</span></div>
        <div><span class="booking-bike">No. de bici anterior:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getMyBike()">---</span><span class="current-seat">{{ bookingCtrl.getMyBike().getNumber() }}</span></span></div>
        <div><span class="booking-bike">No. de bici seleccionada:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().bike.getNumber()">---</span>{{ bookingCtrl.getBooking().bike.getNumber() }}</span></div>
        <div><span class="booking-instructor">Tu instructor será:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getInstructorName()">---</span>{{ bookingCtrl.getInstructorName() }}</span></div>
        <div ng-if="bookingCtrl.getBooking().classTypeName"><span class="booking-instructor">Tipo de clase:</span> <span class="booking-label">{{ bookingCtrl.getBooking().classTypeName }}</span></div>
    </div>
    <button class="button-blue" ng-disabled="bookingCtrl.getBooking().bike === undefined" ng-click="bookingCtrl.editBook()">Edita tu reserva ahora</button>
</div>