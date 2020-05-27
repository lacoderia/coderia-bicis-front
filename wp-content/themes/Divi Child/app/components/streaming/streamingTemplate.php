<?php
    wp_enqueue_script( 'InstructorService' );
    wp_enqueue_script( 'Stream' );
    wp_enqueue_script( 'StreamingService' );
    wp_enqueue_script( 'StreamingController' );
?>

<div id="streaming" ng-controller="StreamingController as streamingCtrl" class="streaming-component animate-visibility" ng-init="streamingCtrl.init(<?php echo (isset($_GET['id']) ? $_GET['id'] : 'null') . ', ' . get_streams() . ', ' . get_instructors(); ?>)">
    <div id="streaming-catalog-component" class="streaming-catalog-component animate-visibility" ng-show="streamingCtrl.isCatalogVisible()">
        <h2>¡Bienvenido a N bici N casa!</h2>
        <p>Felicidades por elegir llevar un estilo de vida saludable donde quiera que estés.</p>
        <div class="streams-catalog">
            <span class="streams-filters">
                <div class="filter-container">
                    <label>Instructor:</label>
                    <select class="filter" ng-model="streamingCtrl.selectedInstructor" ng-options="instructor.getName() for instructor in streamingCtrl.instructors track by instructor.getId()">
                        <option value="">Todos</option>
                    </select>
                </div>
                <div class="filter-container">
                    <label>Duración:</label>
                    <select class="filter" ng-model="streamingCtrl.selectedDuration">
                        <option value="">Todos</option>
                        <option value="30 minutos">30 minutos</option>
                        <option value="45 minutos">45 minutos</option>
                        <option value="1 hora">1 hora</option>
                    </select>
                </div>
                <div class="filter-container">
                    <label>Intensidad:</label>
                    <select class="filter" ng-model="streamingCtrl.selectedIntensity">
                        <option value="">Todas</option>
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>
                </div>
            </span>
            <div class="streams-list">
                <stream ng-repeat="stream in filteredStreams = (streamingCtrl.streams | streamByInstructor:streamingCtrl.selectedInstructor | streamByDuration:streamingCtrl.selectedDuration | streamByIntensity:streamingCtrl.selectedIntensity)" ng-class="{ 'featured' : stream.getFeatured() }">
                    <div>
                        <div class="main-container" style="background-image: url({{ stream.getCover() }})">
                            <img ng-src="{{ stream.getCover() }}" class="stream-cover" />
                            <div class="stream-overlay" ng-if="!stream.getPlayable()">
                                <button class="book-button button-blue" ng-click="streamingCtrl.handleStreamClick(stream)">Comprar video</button>
                            </div>
                            <div class="stream-overlay" ng-if="stream.getPlayable()" ng-click="streamingCtrl.handleStreamClick(stream)">
                                <a class="play-button">
                                    <span class='et-pb-icon'>&#x49;</span>
                                </a>
                            </div>
                            <span class="stream-intensity">
                                <div class="biceps-icon" ng-repeat="x in [].constructor(stream.getIntensity()) track by $index"></div>
                            </span>
                            <span class="stream-duration">{{ stream.getDuration() }}</span>
                        </div>
                        <div class="stream-description">
                            <div class="stream-name">{{ stream.getTitle() }}
                                <span class="stream-instructor">con {{ stream.getInstructorName() }}</span>
                            </div>
                            <div class="stream-remaining-time" ng-if="stream.getPlayable()">Tiempo restante {{ stream.getEndDate().fromNow(true) }}</div>
                        </div>
                    </div>
                </stream>
            </div>
            <h4 ng-if="filteredStreams.length === 0" style="text-align: center; margin-top: 4rem;">
                No se encontraron resultados
            </h4>
        </div>
    </div>

    <div id="streaming-player-component" class="streaming-player-component animate-visibility" ng-show="streamingCtrl.isPlayerVisible() && streamingCtrl.playerStream">
        <h2>{{ streamingCtrl.getPlayerStreamTitle() }}</h2>
        <h4>con {{ streamingCtrl.getPlayerStreamInstructorName() }}</h4>
        <stream>
            <div>
                <div class="main-container" style="background-image: url({{ streamingCtrl.getPlayerStreamCover() }})" ng-if="!streamingCtrl.getPlayerStreamPlayable()">
                    <img ng-src="{{ streamingCtrl.getPlayerStreamCover() }}" class="stream-cover" />
                    <div class="stream-overlay" ng-if="!streamingCtrl.getPlayerStreamPlayable()">
                        <button class="book-button button-blue" ng-click="streamingCtrl.handleStreamClick(streamingCtrl.playerStream)">Comprar video</button>
                    </div>
                    <span class="stream-intensity">
                        <div class="biceps-icon" ng-repeat="x in [].constructor(streamingCtrl.getPlayerStreamIntensity()) track by $index"></div>
                    </span>
                    <span class="stream-duration">{{ streamingCtrl.getPlayerStreamDuration() }}</span>
                </div>
                <div class="player-container" ng-if="streamingCtrl.getPlayerStreamPlayable()">
                    <div class="vimeo-container" ng-bind-html="streamingCtrl.getPlayerStreamEmbedCode()"></div>
                    <div class="player-row">
                        <span class="player-label">Tiempo restante:&nbsp;</span>
                        <span>{{ streamingCtrl.getPlayerStreamEndDate().fromNow(true) }}</span>
                    </div>
                    <div class="player-row">
                        <span class="player-label">Intensidad:&nbsp;</span>
                        <span class="stream-intensity">
                            <div class="biceps-icon" ng-repeat="x in [].constructor(streamingCtrl.getPlayerStreamIntensity()) track by $index"></div>
                        </span>
                    </div>
                    <div class="player-row">
                        <span class="player-label">Duración:&nbsp;</span>
                        <span>{{ streamingCtrl.getPlayerStreamDuration() }}</span>
                    </div>
                </div>
            </div>
        </stream>
    </div>
    
    <div id="streaming-booking-component" class="streaming-booking-component animate-visibility" ng-show="streamingCtrl.isBookingVisible()">
        <h2>Verifica tu selección</h2>
        <div class="booking-info">
            <div><span class="booking-row">Stream:</span> <span class="booking-label">{{ streamingCtrl.getSelectedStreamTitle() }}</span></div>
            <div><span class="booking-row">Tu instructor será:</span> <span class="booking-label"><span ng-if="!streamingCtrl.getSelectedStreamInstructorName()">---</span>{{ streamingCtrl.getSelectedStreamInstructorName() }}</span></div>
            <div><span class="booking-row">Duración:</span> <span class="booking-label">{{ streamingCtrl.getSelectedStreamDuration() }}</span></div>
        </div>
        <button class="button-blue" ng-disabled="!streamingCtrl.getSelectedStreamId()" ng-click="streamingCtrl.bookStream()">Comprar ahora</button>
    </div>
</div>