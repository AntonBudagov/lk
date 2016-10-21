;(function () {
    console.log('partners');

  // form popup

  $('.partnersGroup .btn').click(function(){
    $(this).parent().find('.formBecomePartner').addClass('active');
  });

  $('.formBecomePartner h5').click(function(){
    $(this).parent().removeClass('active');
  });

  $('.partnersGroupItem .blackSubmit').click(function(e){
    e.preventDefault()
    $(this).parent().parent().parent().find('.formBecomePartner').removeClass('active');
  });


}());
