<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'CalendarService' );
    wp_enqueue_script( 'CalendarController' );

?>

<div id="calendar" ng-controller="CalendarController as calendarCtrl" ng-init="calendarCtrl.init(<?php echo get_weekly_schedule() . ', ' . get_instructors() . ', ' . get_class_types(); ?>)" ng-show="calendarCtrl.isVisible()" class="calendar-component animate-visibility">
    <h2>Reserva tu lugar</h2>
    <p class="et_pb_text_align_center">Selecciona un horario</p>
    <div class="calendar">
        <div class="calendar-filters">
            <div class="week-label">{{ ::calendarCtrl.getWeekLabel() }}</div>
            <div class="week-filters">
                <div class="filter-container">
                    <label>Instructor:</label>
                    <select class="filter" ng-model="calendarCtrl.selectedInstructor" ng-options="instructor.getName() for instructor in calendarCtrl.instructors track by instructor.getId()">
                        <option value="">Todos</option>
                    </select>
                </div>
                <div class="filter-container">
                    <label>Tipo de Clase:</label>
                    <select class="filter" ng-model="calendarCtrl.selectedClassType" ng-options="classType.name for classType in calendarCtrl.classTypes track by classType.id">
                        <option value="">Todos</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="color-dictionary">
            <div class="color" ng-repeat="venue in calendarCtrl.venues">
                <div class="color-name">{{ ::venue.name }}</div>
                <div class="color-circle" style="{{ ::venue.style }}"></div>
            </div>
        </div>

        <!-- Desktop version -->
        <ul ng-if="!calendarCtrl.isMobile()" ng-cloak>
            <li ng-repeat="day in calendarCtrl.week" class="day">
                <div class="day-title">
                    <span class="day-number">{{ ::day.getDate().date() }}</span>
                    <span class="day-label"> {{ ::calendarCtrl.getDayOfWeek(day.getDate().day()) }}</span>
                </div>
                <ul>
                    <li ng-repeat="spinningClass in day.getSpinningClasses() | classByInstructor:calendarCtrl.selectedInstructor | classByType:calendarCtrl.selectedClassType | orderByDate" style="{{calendarCtrl.getDistributionStyles(spinningClass)}}" class="class" ng-class="{ 'enabled': calendarCtrl.isClassEnabled(spinningClass), 'disabled': !calendarCtrl.isClassEnabled(spinningClass), 'selectable': calendarCtrl.isClassSelectable(spinningClass), 'special': spinningClass.getDescription() }">
                        <div ng-click="calendarCtrl.selectSpinningClass(spinningClass)">
                            <div class="ribbon" ng-if="::spinningClass.getIsFree()"><span>GRATIS</span></div>
                            <span class="class-description" ng-if="calendarCtrl.isClassEnabled(spinningClass)">{{ ::spinningClass.getDescription() }}</span>
                            <span class="class-type" ng-if="calendarCtrl.isClassEnabled(spinningClass)">{{ ::spinningClass.getClassTypeName() }}</span>
                            <span class="class-instructor">{{ ::spinningClass.getInstructorName() }}</span>
                            <span class="class-time">{{ ::spinningClass.getDate().format('H:mm')}}</span>
                            <span class="class-title">{{ ::spinningClass.getAvailableSeatsMessage() }}</span>
                        </div>
                        <div class="info-overlay animate-visibility" ng-show="calendarCtrl.isSpinningClassInfoShown(spinningClass)">
                            <span class="class-alternate" ng-if="::spinningClass.getAlternateInstructor()">suple a {{ ::spinningClass.getAlternateInstructor() }}</span>
                            <icon class="icon-close animate-visibility" title="Cerrar" ng-click="calendarCtrl.showSpinningClassInfo(undefined)"></icon>
                        </div>
                        <icon class="icon-info animate-visibility" title="Info" ng-if="::spinningClass.getAlternateInstructor()" ng-click="calendarCtrl.showSpinningClassInfo(spinningClass)" ng-show="!calendarCtrl.isSpinningClassInfoShown(spinningClass)"></icon>
                    </li>
                </ul>
            </li>
        </ul>

        <!-- Mobile version -->
        <ul ng-if="calendarCtrl.isMobile()" ng-cloak>
            <li ng-repeat="day in calendarCtrl.week" class="day" ng-click="calendarCtrl.setSelectedDay(day)" ng-class="{ 'selected': calendarCtrl.isSameDay(day, calendarCtrl.selectedDay) }">
                <div class="day-title">
                    <span class="day-number">{{ ::day.getDate().date() }}</span>
                    <span class="day-label"> {{ ::calendarCtrl.getDayOfWeek(day.getDate().day()) }}</span>
                </div>
            </li>
        </ul>
        <ul ng-if="calendarCtrl.isMobile()" class="classes-container">
            <li ng-repeat="spinningClass in calendarCtrl.selectedDay.getSpinningClasses() | classByInstructor:calendarCtrl.selectedInstructor | classByType:calendarCtrl.selectedClassType | orderByDate" style="{{calendarCtrl.getDistributionStyles(spinningClass)}}" class="class" ng-class="{ 'enabled': calendarCtrl.isClassEnabled(spinningClass), 'disabled': !calendarCtrl.isClassEnabled(spinningClass), 'selectable': calendarCtrl.isClassSelectable(spinningClass), 'special': spinningClass.getDescription() }">
                <div ng-click="calendarCtrl.selectSpinningClass(spinningClass)">
                    <div class="ribbon" ng-if="::spinningClass.getIsFree()"><span>GRATIS</span></div>
                    <span class="class-description" ng-if="calendarCtrl.isClassEnabled(spinningClass)">{{ ::spinningClass.getDescription() }}</span>
                    <span class="class-instructor">{{ ::spinningClass.getInstructorName() }}</span>
                    <span class="class-time">{{ ::spinningClass.getDate().format('H:mm')}}</span>
                    <span class="class-title">{{ ::spinningClass.getAvailableSeatsMessage() }}</span>
                </div>
                <div class="info-overlay animate-visibility" ng-show="calendarCtrl.isSpinningClassInfoShown(spinningClass)">
                    <span class="class-alternate" ng-if="::spinningClass.getAlternateInstructor()">suple a {{ ::spinningClass.getAlternateInstructor() }}</span>
                    <icon class="icon-close animate-visibility" title="Cerrar" ng-click="calendarCtrl.showSpinningClassInfo(undefined)"></icon>
                </div>
                <icon class="icon-info animate-visibility" title="Info" ng-if="::spinningClass.getAlternateInstructor()" ng-click="calendarCtrl.showSpinningClassInfo(spinningClass)" ng-show="!calendarCtrl.isSpinningClassInfoShown(spinningClass)"></icon>
            </li>
            <li ng-if="!calendarCtrl.selectedDay.getSpinningClasses().length" >
                La búsqueda no trajo resultados
            </li>
        </ul>
    </div>
</div>