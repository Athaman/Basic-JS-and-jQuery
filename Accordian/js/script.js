// Accordian settings
var action="click";
var speed = "500";

$(document).ready(function(){
  $('li.q').on(action, function(){
    $(this).next()                    //select next element
        .slideToggle(speed)           //slide toggle
          .siblings('li.a')
            .slideUp();

    // get the active question's arrow
    var img= $(this).children('img');

    // remove the rotate class from all other images
    $('img').not(img).removeClass('rotate');

    //toggle the rotate class on the current image.
    img.toggleClass('rotate');
  });
});
