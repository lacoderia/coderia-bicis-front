<?php /* Template Name: Instructor Template */

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

                                <?php
                                the_content();
                                ?>

                                <!-- Instructor Profile -->
                                <?php locate_template( array( 'app/components/instructor-profile/instructorProfileTemplate.php' ), true, true ); ?>

                                <!-- Classroom -->
                                <?php locate_template( array( 'app/components/classroom/classroomTemplate.php' ), true, true ); ?>

                                <!-- Payment -->
                                <?php locate_template( array( 'app/components/payment/paymentTemplate.php' ), true, true ); ?>

                                <!-- Booking -->
                                <?php locate_template( array( 'app/components/booking/bookingTemplate.php' ), true, true ); ?>

                                <!-- Packs -->
                                <?php locate_template( array( 'app/components/packs/packTemplate.php' ), true, true ); ?>

                                <!-- Instructors -->
                                <div style="margin-top: 8rem;">
                                    <?php locate_template( array( 'app/components/instructors/instructorTemplate.php' ), true, true ); ?>
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