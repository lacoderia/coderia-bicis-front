<!-- BEGIN - Custom Codería Code -->
<div class="push"></div>
</div>
</div>
</div>
<!-- END - Custom Codería Code -->

<?php
if ( et_theme_builder_overrides_layout( ET_THEME_BUILDER_HEADER_LAYOUT_POST_TYPE ) || et_theme_builder_overrides_layout( ET_THEME_BUILDER_FOOTER_LAYOUT_POST_TYPE ) ) {
    // Skip rendering anything as this partial is being buffered anyway.
    // In addition, avoids get_sidebar() issues since that uses
    // locate_template() with require_once.
    return;
}

/**
 * Fires after the main content, before the footer is output.
 *
 * @since 3.10
 */
do_action( 'et_after_main_content' );

if ( 'on' === et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

	<span class="et_pb_scroll_top et-pb-icon"></span>

<?php endif;

if ( ! is_page_template( 'page-template-blank.php' ) ) : ?>

			<footer id="main-footer">
				<?php get_sidebar( 'footer' ); ?>


		<?php
			if ( has_nav_menu( 'footer-menu' ) ) : ?>

				<div id="et-footer-nav">
					<div class="container">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'footer-menu',
								'depth'          => '1',
								'menu_class'     => 'bottom-nav',
								'container'      => '',
								'fallback_cb'    => '',
							) );
						?>
					</div>
				</div> <!-- #et-footer-nav -->

			<?php endif; ?>

				<div id="footer-bottom" style="padding: 15px 0 !important;">
					<div class="container clearfix">
						<?php
							// if ( false !== et_get_option( 'show_footer_social_icons', true ) ) {
							// 	get_template_part( 'includes/social_icons', 'footer' );
							// }
						?>
						<div class="footer-bottom-container">
							<div style="display:flex;">
								<span style="margin-top:3px">powered by</span>
								<a href="http://coderia.mx" target="_blank">
									<img src="https://n-bici.com/wp-content/uploads/coderia/coderia_logo.png" style="margin-left:8px; height:27px; width:100px" />
								</a>
							</div>
							<div>
								<ul>
									<li class="et-social-icon et-social-facebook">
										<a href="https://www.facebook.com/nbicisanluis/" class="icon" style="color: white;">
											<span>Facebook</span>
										</a>
									</li>
								</ul>
							</div>
							<a href="https://n-bici.com/wp-content/themes/divi-child/docs/terminos-y-condiciones-nbici-20220427.pdf" target="_blank" style="color: white;">Términos y condiciones</a>
						</div>
					</div>	<!-- .container -->
				</div>
			</footer> <!-- #main-footer -->
		</div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

	</div> <!-- #page-container -->

	<?php wp_footer(); ?>
</body>
</html>
