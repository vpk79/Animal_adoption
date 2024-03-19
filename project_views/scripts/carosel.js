var caroselWidth = $('#myCarousel2 .carousel-inner')[0].scrollWidth;
var cardWidth = $('#myCarousel2 .carousel-item').width();


var scrollPosition = 0;

$('#myCarousel2 .carousel-control-next').on('click', function(){
    scrollPosition = scrollPosition + cardWidth;
    $('#myCarousel2 .carousel-inner').animate({scrollLeft: scrollPosition}, 600)
});

