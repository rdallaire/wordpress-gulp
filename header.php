<?php get_template_part( 'partials/head' ); ?>


<body <?php body_class(); ?>>
<div id="wrapper" class="hfeed">

  <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_html( get_bloginfo( 'name' ) ); ?>" rel="home"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a>

  <div id="site-description"><?php bloginfo( 'description' ); ?></div>

  <nav id="menu">
    <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
  </nav>

  <div id="container">
