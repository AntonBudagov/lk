;(function () {
  console.log('guarantee');


  $('.select').on('click','.default-value',function(){

  var parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')){
      parent.addClass('is-open');
      $('.select.is-open').not(parent).removeClass('is-open');
    }else{
      parent.removeClass('is-open');
    }
  }).on('click','ul>li',function(){
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.default-value').text( $(this).text() );
  });


}());
