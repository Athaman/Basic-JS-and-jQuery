//search bar handler
$(function(){
  var searchField = $('#query');
  var icon = $('#search-btn');

  // Focus event
  $(searchField).on('focus', function(){
    $(this).animate({
      width:'100%'
    }, 400);
    $(icon).animate({
      right:'10px'
    }, 400);
  });

  //blur event
  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width:'45%'
      }, 400, function(){});
      $(icon).animate({
        right: '360px'
      }, 400, function(){});
    }
  });

  $('#search-form').submit(function(e){
    e.preventDefault();
  });
})



function search(){
  // clear the results section
  $('#results').html('');
  $('#buttons').html('');

  // get form input
   q = $('#query').val();

  // do some getting from the API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      type:'video',
      key: 'AIzaSyBEqFcdanQfzc5_GVclqcVFaL1bkn0PKqc'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        //log the data
        console.log(data);

        $.each(data.items, function(i, item){
          // get the output
          var output = getOutput(item);

          // put the results in the page
          $('#results').append(output);

        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //display the buttons
        $('#buttons').append(buttons);

    }
  );
}

function nextPage(){
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type:'video',
			key: 'AIzaSyBEqFcdanQfzc5_GVclqcVFaL1bkn0PKqc'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				// Log Data
				console.log(data);

				$.each(data.items, function(i, item){
					// Get Output
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				// Display Buttons
				$('#buttons').append(buttons);
			}
	);
}


function prevPage(){

  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');
  // clear the results section
  $('#results').html('');
  $('#buttons').html('');

  // get form input
  q = $('#query').val();


  // do some getting from the API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type:'video',
      key: 'AIzaSyBEqFcdanQfzc5_GVclqcVFaL1bkn0PKqc'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        //log the data
        console.log(data);

        $.each(data.items, function(i, item){
          // get the output
          var output = getOutput(item);

          // put the results in the page
          $('#results').append(output);

        });

        var buttons = getButtons(prevPageToken, nextPageToken);

        //display the buttons
        $('#buttons').append(buttons);

    }
  );

}
//build the output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  // build the return string
  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="' + thumb + '">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/' + videoId + '">' + title + '</a></h3>' +
  '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate +'</small>' +
  '<p>' + description + '</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';
  return output;
}


function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput= '<div class="button-container">'+
    '<button id="next-button" class="paging-button" data-token="' + nextPageToken +'" data-query="' + q + '"' +
    'onClick="nextPage();">Next Page</button></div>';
  }else{
    var btnoutput= '<div class="button-container">'+
    '<button id="prev-button" class="paging-button" data-token="' + prevPageToken +'" data-query="' + q + '"' +
    'onClick="prevPage();">Prev Page</button>' +
    '<button id="next-button" class="paging-button" data-token="' + nextPageToken +'" data-query="' + q + '"' +
    'onClick="nextPage();">Next Page</button></div>';
  }
  return btnoutput;
}
