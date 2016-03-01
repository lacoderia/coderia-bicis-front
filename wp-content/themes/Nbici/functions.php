<?php

function coderia_register_angular_scripts() {

	wp_register_script( 'angularjs', get_stylesheet_directory_uri() . '/js/bower_components/angular/angular.min.js' );
	wp_register_script( 'angularjs-route', get_stylesheet_directory_uri() . '/js/bower_components/angular-route/angular-route.min.js' );
	wp_register_script( 'app', get_stylesheet_directory_uri() . '/app/application.js' );

	// Services
	wp_register_script( 'TestService', get_stylesheet_directory_uri() . '/app/components/test_component/testService.js' );

	// Controllers
	wp_register_script( 'TestController', get_stylesheet_directory_uri() . '/app/components/test_component/testController.js' );

}

add_action( 'wp_enqueue_scripts', 'coderia_register_angular_scripts' );

