<?php
/**
* Template Name: Home template

*/
?>

<div class="page-wrapper">

<?php get_header(); ?>
<main id="content" class="content">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <header class="header">
            <h1 class="entry-title"><?php the_title(); ?></h1>
        </header>
        <div class="entry-content">
            <?php the_content(); ?>
        </div>
    </article>
    <?php endwhile; endif; ?>
</main>



</div>

<?php get_footer(); ?>