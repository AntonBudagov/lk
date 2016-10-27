;(function () {

  console.log('main');

/*
--------------------------------------------------------------------------------
modal window
--------------------------------------------------------------------------------
*/

$('.modal-trigger').leanModal();

$('.groupDay .btn').on('click', function(){
  $('.groupDay .btn').removeClass('active')
  $(this).addClass('active')

});
/*
--------------------------------------------------------------------------------
jquery.maskedinput.min
--------------------------------------------------------------------------------
*/
jQuery(function($){
  $(".phoneValidation").mask("+7 (999) 999-99-99");
});

/*
--------------------------------------------------------------------------------
select DropDown
--------------------------------------------------------------------------------
*/
$('.select').on('click','.default-value',function(){

    var parent = $(this).closest('.select');
      if (!parent.hasClass('is-open')){
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
      }else{
        parent.removeClass('is-open');
      }

    }).on('click','ul > li',function(){
      var parent = $(this).closest('.select');
      parent.removeClass('is-open').find('.default-value').text( $(this).text() );
    });

}());
