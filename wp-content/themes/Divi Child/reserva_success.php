<?php /* Template Name: Reserva Success Template */

get_header();

$is_page_builder_used = et_pb_is_pagebuilder_used( get_the_ID() );

?>

    <div id="main-content">

        <?php if ( ! $is_page_builder_used ) : ?>

        <div class="container">
            <div id="content-area" class="clearfix">
                <div id="left-area">

                    <?php endif; ?>

                    <?php while ( have_posts() ) : the_post(); ?>

                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                            <?php if ( ! $is_page_builder_used ) : ?>

                                <h1 class="main_title" style="display: none;"><?php the_title(); ?></h1>
                                <?php
                                $thumb = '';

                                $width = (int) apply_filters( 'et_pb_index_blog_image_width', 1080 );

                                $height = (int) apply_filters( 'et_pb_index_blog_image_height', 675 );
                                $classtext = 'et_featured_image';
                                $titletext = get_the_title();
                                $thumbnail = get_thumbnail( $width, $height, $classtext, $titletext, $titletext, false, 'Blogimage' );
                                $thumb = $thumbnail["thumb"];

                                if ( 'on' === et_get_option( 'divi_page_thumbnails', 'false' ) && '' !== $thumb )
                                    print_thumbnail( $thumb, $thumbnail["use_timthumb"], $titletext, $width, $height );
                                ?>

                            <?php endif; ?>

                            <div class="entry-content">

                                <style id="et-builder-module-design-395-cached-inline-styles">
                                    div.et_pb_section.et_pb_section_0 {
                                        background-image:url(https://n-bici.com/wp-content/uploads/2016/04/reserva.jpg) !important;
                                        background-size: unset;
                                        background-color: black !important;
                                        background-position-y: 0;
                                    }
                                    
                                    .et_pb_section_0.et_pb_section{
                                        background-color:#000 !important;
                                    }

                                    .et_pb_row_0.et_pb_row{
                                        padding-top:50px!important;
                                        padding-bottom:50px!important;
                                    }

                                    .et_pb_text_0.et_pb_text{
                                        color:#ffffff!important;
                                    }
                                    
                                    @media only screen and (min-width:981px){
                                        .et_pb_row_0.et_pb_row{padding-top:150px;padding-bottom:250px}
                                    }
                                    
                                    @media only screen and (max-width:980px){
                                        .et_pb_section_0.et_pb_section{padding-top:50px;padding-right:0px;padding-bottom:50px;padding-left:0px}
                                    }
                                </style>

                                <div id="et-boc" class="et-boc">
                                    <div class="et-l et-l--post">
                                        <div class="et_builder_inner_content et_pb_gutters3">
                                            <div class="et_pb_section et_pb_section_0 et_pb_with_background et_section_regular">
                                                <div class="et_pb_row et_pb_row_0">
                                                    <div class="et_pb_column et_pb_column_4_4 et_pb_column_0  et_pb_css_mix_blend_mode_passthrough et-last-child">
                                                        <div class="et_pb_module et_pb_text et_pb_text_0  et_pb_text_align_left et_pb_bg_layout_light">
                                                            <div class="et_pb_text_inner">
                                                                
                                                                <!-- Booking Notification -->
                                                                <?php locate_template( array( 'app/components/notification/bookingNotificationTemplate.php' ), true, true ); ?>

                                                            </div>
                                                        </div> <!-- .et_pb_text -->

                                                        <!-- Smoothies -->
                                                        <?php locate_template( array( 'app/components/smoothies/smoothiesTemplate.php' ), true, true ); ?>


                                                    </div> <!-- .et_pb_column -->
                                                </div> <!-- .et_pb_row -->
                                            </div> <!-- .et_pb_section -->
                                        </div><!-- .et_builder_inner_content -->
                                    </div><!-- .et-l -->
                                </div>

                                <?php
                                if ( ! $is_page_builder_used )
                                    wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'Divi' ), 'after' => '</div>' ) );
                                ?>
                            </div> <!-- .entry-content -->

                            <?php
                            if ( ! $is_page_builder_used && comments_open() && 'on' === et_get_option( 'divi_show_pagescomments', 'false' ) ) comments_template( '', true );
                            ?>

                        </article> <!-- .et_pb_post -->

                    <?php endwhile; ?>

                    <?php if ( ! $is_page_builder_used ) : ?>

                </div> <!-- #left-area -->

                <?php get_sidebar(); ?>
            </div> <!-- #content-area -->
        </div> <!-- .container -->

    <?php endif; ?>

    </div> <!-- #main-content -->

<?php get_footer(); ?>