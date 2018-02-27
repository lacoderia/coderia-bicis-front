<?php
    wp_enqueue_script( 'SyncService' );
    wp_enqueue_script( 'SyncController' );

?>

<div id="sync-link" ng-controller="SyncController as syncCtrl" class="sync-component" ng-init="syncCtrl.init()">
    <h2>¿Sabías que ahora puedes usar tus clases en Nbox?</h2>
    <p>Las clases que compras en NBici pueden ser utilizadas en Nbox</p>
    <a class="cool-button" style="margin-top:40px" ng-click="syncCtrl.goToSyncPage()">más información</a>
</div>