<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'Bike' );
    wp_enqueue_script( 'ClassroomService' );
    wp_enqueue_script( 'ClassroomController' );
?>

<div id="classroom" class="classroom-component animate-visibility" ng-controller="ClassroomController as classroomCtrl" ng-init="classroomCtrl.init(<?php echo get_instructors(); ?>)" ng-show="classroomCtrl.isVisible()">
    <h2>Cambia tu lugar</h2>
    <p>Selecciona una bicicleta disponible</p>
    <span us-spinner spinner-key="change-bike-spinner"></span>
    <div class="classroom-container">
        <div class="bike-instructor"><span>{{ classroomCtrl.getInstructorName() }}</span></div>
        <ul ng-repeat="rows in classroomCtrl.distribution">
            <li class="bike-container" ng-repeat="bike in rows" ng-click="classroomCtrl.selectBike(bike)">
                <div class="bike" ng-class="classroomCtrl.getBikeClass(bike)" ng-if="bike.getStatus() != DEFAULT_VALUES.BIKE_STATUS.INACTIVE">
                    <div class="bike-number">{{ bike.getNumber() }}</div>
                    <span ng-if="classroomCtrl.isMyBike(bike)" class="my-bike"></span>
                </div>
            </li>
        </ul>
        <div class="actions">
            <a href="" class="close-link" ng-click="classroomCtrl.closeClassroom()">Regresar a las clases reservadas</a>
        </div>
    </div>
</div>