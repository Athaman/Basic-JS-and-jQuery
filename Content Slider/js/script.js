$(document).ready(function(){
  //set up some variables
  var speed = 500;            //speed of transitions on arrow click
  var autoSwitch = true;      // boolean for automatic scroll
  var autoSwitchSpeed = 4000; //speed for auto scroll

  // Add initial slides active class
  $('.slide').first().addClass('active');


  //hide all slides
  $('.slide').hide();

  //show the first slide (is active)
  $('.active').show();

  //next handler
  $('#next').on('click', nextSlide);

  //previous handler
  $('#prev').on('click', prevSlide);

  if(autoSwitch){
    setInterval(nextSlide, autoSwitchSpeed);
  }


  function nextSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':last-child')){
      $('.slide').first().addClass('active');
    }else{
      $('.oldActive').next().addClass('active');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slide').fadeOut(speed);
    $('.active').fadeIn(speed);
  }


  function prevSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if($('.oldActive').is(':first-child')){
      $('.slide').last().addClass('active');
    }else{
      $('.oldActive').prev().addClass('active');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slide').fadeOut(speed);
    $('.active').fadeIn(speed);
  }


});
