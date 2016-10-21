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

  $('#datepicker').data('datepicker')

}());
