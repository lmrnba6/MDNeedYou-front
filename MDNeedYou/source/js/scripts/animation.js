// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation !!!!!!!!!! Does't work I did it on SCSS
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

 
$(window).scroll(function() {
 
if ($(this).scrollTop() > 250) {
 
$('#scrollUp').fadeIn(300);
 
} else {
 
$('#scrollUp').fadeOut(500);
 
}
 
});

})(jQuery); // End of use strict
