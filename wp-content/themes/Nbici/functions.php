<?php

define('child_template_directory', dirname( get_bloginfo('stylesheet_url')) );

add_action( 'wp_enqueue_scripts', 'nbici_enqueue_assets' );
function nbici_enqueue_assets() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
}

add_action( 'wp_enqueue_scripts', 'coderia_register_angular_scripts' );
function coderia_register_angular_scripts() {

	wp_register_script( 'angularjs', get_stylesheet_directory_uri() . '/js/bower_components/angular/angular.min.js' );
	wp_register_script( 'angularjs-route', get_stylesheet_directory_uri() . '/js/bower_components/angular-route/angular-route.min.js' );
	wp_register_script( 'app', get_stylesheet_directory_uri() . '/app/application.js' );
    wp_register_script( 'TestService', get_stylesheet_directory_uri() . '/app/components/test_component/testService.js' );
	wp_register_script( 'TestController', get_stylesheet_directory_uri() . '/app/components/test_component/testController.js' );

}