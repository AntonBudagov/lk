;(function () {
  'use strict';
  console.log('mainPage');

  [].slice.call(document.querySelectorAll('.sectionContent')).forEach(function(menu) {
    var menuItems = menu.querySelectorAll('.sectionContent-item'),
      setCurrent = function(ev) {
        ev.preventDefault();

        // var item = ev.target.parentNode; // li

        // content
          $(this).parent().parent().find('.desc').removeClass('active').eq($(this).index()).addClass('active');


        // return if already current
        if( $(this).hasClass('active') ) {
          return false;
        }
        // remove current
        $('.sectionContent-item').removeClass('active')

        // set current
        $(this).addClass('active');
      };

    [].slice.call(menuItems).forEach(function(el) {
      el.addEventListener('click', setCurrent);
    });
  });

  // Slider One-----------------------------------------------------------------
  var sliderOne = {
        nav : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        items: 1,
        dots: false
      };
  $('#sliderOne').owlCarousel(sliderOne)
  // Carusel Review-------------------------------------------------------------
  var reviewCarusel = {
      nav : true,
      items: 3,
      dots: false,
      center: false,
      mouseDrag: false
    };
    $('#reviewCarusel').owlCarousel(reviewCarusel);

    [].slice.call(document.querySelectorAll('#reviewCarusel')).forEach(function(review) {
      var reviewItem = review.querySelectorAll('.owl-item '),
      sets = function(ev) {
        // ev.preventDefault();
        // content description
        // return if already current
        if( $(this).children().hasClass('focusItem') ) {
          return false;
        }
        // remove current
        $('.owl-item').children().removeClass('focusItem')

        // set current
        $(this).children().addClass('focusItem');

        $(this).parents('.review').find('.description .desc').removeClass('active').eq($(this).index()).addClass('active');
      };

    [].slice.call(reviewItem).forEach(function(el) {
      el.addEventListener('click', sets);
    });

  });


})(window);

