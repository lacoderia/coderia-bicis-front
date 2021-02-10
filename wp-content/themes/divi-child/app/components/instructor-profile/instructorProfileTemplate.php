<?php

    wp_enqueue_script( 'InstructorProfileService' );
    wp_enqueue_script( 'InstructorProfileController' );

?>

<div ng-controller="InstructorProfileController as instructorProfileCtrl" ng-init="instructorProfileCtrl.init(<?php echo get_instructor_profile(); ?>)" class="instructors-profile-component animate-visibility">

    <instructor>
        <bio>
            <h2>{{ instructorProfileCtrl.instructorProfile.first_name }}</h2>
            <p ng-bind-html="instructorProfileCtrl.instructorProfile.bio"></p>
        </bio>
        <picture>
            <img ng-src="{{instructorProfileCtrl.instructorProfile.picture_2}}" title="{{ instructorProfileCtrl.instructorProfile.first_name }}">
        </picture>
    </instructor>
    
    <div id="calendar" class="calendar" ng-show="instructorProfileCtrl.isVisible()">
        <h2 class="et_pb_text_align_center">Reserva tu lugar con {{ instructorProfileCtrl.instructorProfile.first_name }}</h2>
        <p class="et_pb_text_align_center">Selecciona un horario</p>
        <div class="calendar-filters">
            <span class="week-label">{{ ::instructorProfileCtrl.getWeekLabel() }}</span>
        </div>
        <div class="color-dictionary">
            <div class="color" ng-repeat="venue in instructorProfileCtrl.venues">
                <div class="color-name">{{ ::venue.name }}</div>
                <div class="color-circle" style="{{ ::venue.style }}"></div>
            </div>
        </div>
        <ul>
            <li ng-repeat="day in instructorProfileCtrl.instructorProfile.week" class="day" ng-if="instructorProfileCtrl.hasClassesAvailable(day)">
                <div class="day-label">
                    <span class="day-number">{{ ::day.getDate().date() }}</span>
                    <span class="day-title"> {{ ::instructorProfileCtrl.getDayOfWeek(day.getDate().day()) }}</span>
                </div>
                <ul>
                    <li ng-repeat="spinningClass in day.getSpinningClasses() | orderByDate" style="{{instructorProfileCtrl.getDistributionStyles(spinningClass)}}" class="class" ng-class="{ 'enabled': instructorProfileCtrl.isClassEnabled(spinningClass), 'disabled': !instructorProfileCtrl.isClassEnabled(spinningClass), 'selectable': instructorProfileCtrl.isClassSelectable(spinningClass), 'warning': spinningClass.getAvailableSeats() <= 10, 'special': spinningClass.getDescription() }">
                        <div ng-click="instructorProfileCtrl.selectSpinningClass(spinningClass)">
                            <div class="ribbon" ng-if="::spinningClass.getIsFree()"><span>GRATIS</span></div>
                            <span class="class-description" ng-if="instructorProfileCtrl.isClassEnabled(spinningClass)">{{ ::spinningClass.getDescription() }}</span>
                            <span class="class-time">{{ ::spinningClass.getDate().format('H:mm')}}</span>
                            <span class="class-title">{{ ::spinningClass.getAvailableSeatsMessage(true) }}</span>
                        </div>
                        <div class="info-overlay animate-visibility" ng-show="instructorProfileCtrl.isSpinningClassInfoShown(spinningClass)">
                            <span class="class-alternate" ng-if="::spinningClass.getAlternateInstructor()">suple a {{ ::spinningClass.getAlternateInstructor() }}</span>
                            <icon class="icon-close animate-visibility" title="Cerrar" ng-click="instructorProfileCtrl.showSpinningClassInfo(undefined)"></icon>
                        </div>
                        <icon class="icon-info animate-visibility" title="Info" ng-if="::spinningClass.getAlternateInstructor()" ng-click="instructorProfileCtrl.showSpinningClassInfo(spinningClass)" ng-show="!instructorProfileCtrl.isSpinningClassInfoShown(spinningClass)"></icon>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

</div>
