<?php
    wp_enqueue_script( 'Bike' );
    wp_enqueue_script( 'ClassroomService' );
    wp_enqueue_script( 'ClassroomController' );
?>

<div id="classroom" class="classroom-component animate-visibility" ng-controller="ClassroomController as classroomCtrl" ng-show="classroomCtrl.isVisible()">
    <h2>Reserva tu lugar</h2>
    <p>Selecciona una bicicleta</p>
    <div class="classroom-container">
        <div class="bike-instructor"><span>{{ classroomCtrl.getInstructorName() }}</span></div>
        <span class="door">Entrada</span>
        <ul ng-repeat="rows in classroomCtrl.distribution">
            <li class="bike-container" ng-repeat="bike in rows" ng-click="classroomCtrl.selectBike(bike)">
                <div class="bike" ng-class="classroomCtrl.getBikeClass(bike)" ng-if="bike.getStatus() != DEFAULT_VALUES.BIKE_STATUS.INACTIVE">
                    <div class="bike-number">{{ bike.getNumber() }}</div>
                </div>
            </li>
        </ul>
        <div class="actions">
            <a href="" class="close-link" ng-click="classroomCtrl.closeClassroom()">Regresar a los horarios</a>
        </div>
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-1">
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-2">
        <img src="<?php echo get_stylesheet_directory_uri() . '/images/fan_icon.png'; ?>" class="fan fan-3">
    </div>
</div>