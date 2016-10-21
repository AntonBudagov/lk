;(function () {
  console.log('authors-needed');

  $('.addLocationWork').click(function(){
    $(this).parent().find('.locationWork').append(`
        <div class="groupInput"><label>Место работы<span class="required"> *</span></label><input type="text" placeholder="Место работы"></div><div class="groupInput"><label>Должность<span class="required"> *</span></label><input type="text" placeholder="Должность"></div>
      `)
  });
  $('.addLocationEducation').click(function(){
      alert(1)
      $(this).parent().find('.education').append(`
        <div class="leftFormContent">
        <div class="educationList">
          <div class="groupInput">
            <label>ВУЗ<span class="required"> *</span></label>
            <input type="text" placeholder="ВУЗ">
          </div>
          <div class="groupInput">
            <label>Факультет<span class="required"> *</span></label>
            <input type="text" placeholder="Факультет">
          </div>
        </div>
      </div>
      <div class="rightFormContent">
        <div class="groupInput">
          <label>Специальность<span class="required"> *</span></label>
          <input type="text" placeholder="Специальность">
        </div>
      </div>
      `)
    });


  $('.groupList .title').click(function () {

      var text = $(this).parent().children('.panel');

      if (text.is(':hidden')) {
        text.slideDown('200');
        $(this).parent().children('span').html('-');
      } else {
        text.slideUp('200');
        $(this).parent().children('span').html('+');
      }

    });

/*
--------------------------------------------------------------------------------
  count checkbox
--------------------------------------------------------------------------------
*/
function checkedBox(){
  var inputs = document.getElementsByTagName("input"); //or document.forms[0].elements;
    var cbs = []; //will contain all checkboxes
    var checked = []; //will contain all checked checkboxes
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        cbs.push(inputs[i]);
        if (inputs[i].checked) {
          checked.push(inputs[i]);
        }
      }
    }
  var nbChecked = checked.length; //number of checked checkboxes
  $('#count').text(' '+nbChecked);
}
// event for checkbox
$('input[type=checkbox]').change(function(){
  checkedBox();
})


}());
