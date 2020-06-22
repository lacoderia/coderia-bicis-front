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
                    <select class="filter" ng-model="streamingCtrl.selectedIntensity" ng-options="intensity.description for intensity in streamingCtrl.intensityCatalog">
                        <option value="">Todas</option>
                    </select>
                </div>
            </span>
            <div class="streams-list">
                <stream ng-repeat="stream in filteredStreams = (streamingCtrl.streams | streamByInstructor:streamingCtrl.selectedInstructor | streamByDuration:streamingCtrl.selectedDuration | streamByIntensity:streamingCtrl.selectedIntensity.level)" ng-class="{ 'featured' : stream.getFeatured() }">
                    <div>
                        <div class="cover-container" style="background-image: url({{ stream.getCover() }})" ng-class="{ 'themed' : stream.getDescription() }">
                            <img ng-src="{{ stream.getCover() }}" class="stream-cover" />
                            <div class="stream-overlay" ng-click="streamingCtrl.handleStreamClick(stream)">
                                <a class="stream-button locked-button" ng-if="!stream.getPlayable()">
                                    <span class='et-pb-icon'>&#xe06c;</span>
                                </a>
                                <a class="stream-button play-button" ng-if="stream.getPlayable()">
                                    <span class='et-pb-icon'>&#x49;</span>
                                </a>
                            </div>
                            <span class="stream-duration">{{ stream.getDuration() }}</span>
                            <div class="ribbon" ng-if="stream.getDescription()"><span>TEMÁTICA</span></div>
                        </div>
                        <div class="stream-info">
                            <div class="stream-name">{{ stream.getTitle() }}
                                <span class="stream-instructor">con {{ stream.getInstructorName() }}</span>
                            </div>
                            <div class="two-column-row">
                                <span class="stream-intensity">
                                    <div style="margin-right: 8px">Intensidad {{ streamingCtrl.getIntensityDescription(stream.getIntensity()) }}</div>
                                    <div class="biceps-icon" ng-repeat="x in [].constructor(stream.getIntensity()) track by $index"></div>
                                </span>
                                <span class="stream-remaining-time" ng-if="stream.getPlayable()">
                                    <div style="margin-right: 8px">Tiempo restante: {{ stream.getEndDate().fromNow(true) }}</div>
                                </span>
                            </div>
                            <span class="stream-description">{{ stream.getDescription() }}</span>
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
        <stream class="featured">
            <div>
                <div class="cover-container" style="background-image: url({{ streamingCtrl.getPlayerStreamCover() }})" ng-if="!streamingCtrl.getPlayerStreamPlayable()">
                    <img ng-src="{{ streamingCtrl.getPlayerStreamCover() }}" class="stream-cover" />
                    <div class="stream-overlay" ng-if="!streamingCtrl.getPlayerStreamPlayable()" ng-click="streamingCtrl.handleStreamClick(streamingCtrl.playerStream)">
                        <a class="stream-button locked-button" ng-if="!stream.getPlayable()">
                            <span class='et-pb-icon'>&#xe06c;</span>
                        </a>
                        <div class="stream-remaining-time" ng-if="stream.getPlayable()">Tiempo restante: {{ stream.getEndDate().fromNow(true) }}</div>
                    </div>
                    <span class="stream-duration">{{ streamingCtrl.getPlayerStreamDuration() }}</span>
                </div>
                <div class="player-container" ng-if="streamingCtrl.getPlayerStreamPlayable()">
                    <div class="vimeo-container" ng-bind-html="streamingCtrl.getPlayerStreamEmbedCode()"></div>
                </div>
                <div class="stream-description">
                    <div class="stream-name">{{ streamingCtrl.getPlayerStreamTitle() }}
                        <span class="stream-instructor">con {{ streamingCtrl.getPlayerStreamInstructorName() }}</span>
                    </div>
                    <div class="two-column-row">
                        <span class="stream-intensity">
                            <div style="margin-right: 8px">Intensidad {{ streamingCtrl.getPlayerStreamIntensityDescription() }}</div>
                            <div class="biceps-icon" ng-repeat="x in [].constructor(stream.getIntensity()) track by $index"></div>
                        </span>
                        <span class="stream-remaining-time" ng-if="streamingCtrl.getPlayerStreamPlayable()">
                            <div style="margin-right: 8px">Tiempo restante: {{ streamingCtrl.getPlayerStreamEndDate().fromNow(true) }}</div>
                        </span>
                    </div>
                </div>
            </div>
        </stream>
    </div>
    
    <div id="streaming-booking-component" class="streaming-booking-component animate-visibility" ng-show="streamingCtrl.isBookingVisible()">
        <h2>Iniciar entrenamiento: {{ streamingCtrl.getSelectedStreamTitle() }}</h2>
        <div class="booking-info">
            <div class="booking-row">
                <span class="booking-label">Instructor:</span>
                <span class="booking-text"><span ng-if="!streamingCtrl.getSelectedStreamInstructorName()">---</span>{{ streamingCtrl.getSelectedStreamInstructorName() }}</span>
            </div>
            <div class="booking-row">
                <span class="booking-label">Duración:</span>
                <span class="booking-text">{{ streamingCtrl.getSelectedStreamDuration() }}</span>
            </div>
            <div class="booking-row">
                <span class="booking-label">Intensidad:</span>
                <div class="booking-text-container">
                    <span class="booking-text">{{ streamingCtrl.getSelectedStreamIntensityDescription() }}</span>
                    <span class="stream-intensity">
                        <div class="biceps-icon" ng-repeat="x in [].constructor(streamingCtrl.getSelectedStreamIntensity()) track by $index"></div>
                    </span>
                </div>
            </div>
        </div>
        <button 
            class="button-blue" 
            ng-disabled="!streamingCtrl.getSelectedStreamId()" 
            ng-click="streamingCtrl.bookStream()"
            ng-if="streamingCtrl.showBookButton()"
        >
            {{ streamingCtrl.getBookButtonText() }}
        </button>
        <div style="margin: 8px 0">{{ streamingCtrl.getOrButtonText() }}</div>
        <button 
            class="button-blue" 
            ng-click="streamingCtrl.goToPacksPage()" 
            ng-if="streamingCtrl.showBuyPackButton()"
        >
            Comprar paquete
        </button>
    </div>
</div>