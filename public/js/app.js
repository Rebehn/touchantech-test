$(() => {
  console.log('loaded');
  function getSchools() {
    $.ajax({
      method: 'GET',
      url: '/schools'
    })
    .done((data) => {
      $.each(data, (index, school) => {
        console.log(school);
      });
    });
  }
  getSchools();
});
