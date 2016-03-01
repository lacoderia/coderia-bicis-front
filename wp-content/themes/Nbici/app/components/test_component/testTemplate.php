<?php
    wp_enqueue_script( 'angularjs' );
    wp_enqueue_script( 'angularjs-route' );
    wp_enqueue_script( 'app' );
    wp_enqueue_script( 'TestService' );
    wp_enqueue_script( 'TestController' );
?>

<div ng-controller="TestController as testCtl">
    <ul ng-repeat="route in routes">
        <li>{{ route.id }} - {{ route.name }}</li>
    </ul>
</div>