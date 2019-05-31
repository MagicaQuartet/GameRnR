$(function() {
  $('.jumbotron').hide().delay(1000).fadeIn(1000);

  let imageIndex = 0;

  function slideShow(idx) {
    $($('.background').get(imageIndex)).fadeOut(3000);
    imageIndex = (imageIndex + 1) % 4;
    $($('.background').get(imageIndex)).fadeIn(3000);
  }

  setInterval(slideShow, 10000, imageIndex);
});
