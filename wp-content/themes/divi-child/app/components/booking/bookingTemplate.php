<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'BookingService' );
    wp_enqueue_script( 'BookingController' );
?>

<div id="booking" class="booking-component animate-visibility" ng-controller="BookingController as bookingCtrl" ng-show="bookingCtrl.isVisible()">
    <div ng-if="!bookingCtrl.classroomIsFull()">
        <h2>Verifica tu reservación</h2>
        <div class="booking-info">
            <div><span class="booking-date">Fecha de reservación:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().date">---</span>{{ bookingCtrl.getBooking().date.local('es').format('MMMM D, h:mm a') }}</span></div>
            <div><span class="booking-bike">No. de bici:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().bike.getNumber()">---</span>{{ bookingCtrl.getBooking().bike.getNumber() }}</span></div>
            <div><span class="booking-instructor">Tu instructor será:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getInstructorName()">---</span>{{ bookingCtrl.getInstructorName() }}</span></div>
        </div>
        <div ng-if="!bookingCtrl.isBookingPaymentOptionsVisible()">
            <button class="button-blue" ng-click="bookingCtrl.book()" ng-if="bookingCtrl.userHasClassesLeft()">Reserva ahora</button>
        </div>
        <div ng-if="bookingCtrl.isBookingPaymentOptionsVisible()">
            <button class="button-blue" ng-click="bookingCtrl.book()" ng-if="bookingCtrl.userHasClassesLeft()">Reserva con créditos</button>
            <div ng-if="bookingCtrl.userHasClassesLeft()">o</div>
            <button class="button-blue" ng-click="bookingCtrl.showBookingPaymentForm()">Reserva con cargo a mi tarjeta</button>
        </div>
    </div>
    <div ng-if="bookingCtrl.classroomIsFull()">
        <div ng-if="bookingCtrl.isWaitingListOpen()">
            <h2>¡Únete a nuestra lista de espera!</h2>
            <div style="margin: 30px 0; font-weight: normal;">
                Si alguna bici se libera te la asignaremos y recibirás una confirmación por correo electrónico.<br><br>
                En caso de no haber lugar, se te regresará tu clase automáticamente. Recuerda que si es una clase especial se te regresará en monedero, el cual solo podrás ocupar en compra de paquetes.
            </div>
            <div class="booking-info">
                <div><span class="booking-date">Fecha de reservación:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().date">---</span>{{ bookingCtrl.getBooking().date.local('es').format('MMMM D, h:mm a') }}</span></div>
                <div><span class="booking-bike">No. de bici:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getBooking().bike.getNumber()">---</span>{{ bookingCtrl.getBooking().bike.getNumber() }}</span></div>
                <div><span class="booking-instructor">Tu instructor será:</span> <span class="booking-label"><span ng-if="!bookingCtrl.getInstructorName()">---</span>{{ bookingCtrl.getInstructorName() }}</span></div>
            </div>
            <button class="button-blue" ng-click="bookingCtrl.book()" style="margin: 20px 0;">Unirme a la lista de espera</button>
            <div class="actions">
                <a href="" class="close-link" ng-click="bookingCtrl.closeClassroom()">Regresar a los horarios</a>
            </div>
        </div>
        <div ng-if="!bookingCtrl.isWaitingListOpen()">
            <h2>¡Lánzate al estudio!</h2>
            <div style="margin: 30px 0; font-weight: normal;">La lista de espera ya está cerrada, pero es muy probable que alguien no asista a la clase y podamos darte su bici.</div>
            <div class="actions">
                <a href="" class="close-link" ng-click="bookingCtrl.closeClassroom()">Regresar a los horarios</a>
            </div>
        </div>
    </div> 
</div>
