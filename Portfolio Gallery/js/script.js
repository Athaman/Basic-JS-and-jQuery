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
});
