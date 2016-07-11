$(document).ready(function(){
  $('nav a').on('click', function(){
    // current class assignments
    $('nav li.current').removeClass('current');
    $(this).parent().addClass('current');

    // set the text for the heading
    $('h1#heading').text($(this).text());

    // grab and filter the link text
    var category = $(this).text().toLowerCase().replace(' ','-');

    // remove the hidden class if all-projects is selected
    if(category === 'all-projects'){
      $('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
    }else{
      $('ul#gallery li').each(function(){
        if(!$(this).hasClass(category)){
          $(this).hide().addClass('hidden');
        }else{
          $(this).fadeIn('slow').removeClass('hidden');
        }

      });
    }
    return false; //prevent standard link behaviour.
  });


// mouseenter handler for the over lay
  $('ul#gallery li').on('mouseenter', function(){
    // get data attribute alues;
    var title = $(this).children().data('title');
    var desc = $(this).children().data('desc');

    // validate it
    if(desc === null){
      desc = 'Click to enlarge';
    }
    if(title === null){
      title = '';
    }

    //create the overlay div
    $(this).append('<div class="overlay"></div>');

    //get the div
    var overlay = $(this).children('.overlay');

    //Add html to overlay
    overlay.html('<h3>' + title + '</h3><p>' + desc + '</p>');
    // make it visible
    overlay.fadeIn(800);

  });

  //mouse leave overlay event
  $('ul#gallery li').on('mouseleave', function(){
    var overlay = $(this).children('.overlay');

    overlay.fadeOut(500);
    overlay.remove();
  });
});
