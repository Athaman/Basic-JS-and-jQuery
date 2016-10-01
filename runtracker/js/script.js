$(function(){
  $('.date').each(function(){
    $(this).datepicker();
  });
});


$(document).one('pageinit', function(){

  /*
   *  Show the runs on homepage
   */
  showRuns();
  function showRuns(){
    // fetch runs
    var runs = getRunsObject();

    // check if empty
    if(runs != '' && runs != null){
      for(var i = 0; i < runs.length; i++){
        $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong>'
          + runs[i]['date'] + '<br /><strong>Distance: </strong>' + runs[i]['distance']
          +'<div class="controls"><a href="#edit" id="editLink" data-distance="'+runs[i]['distance']
          + '" data-date="'+runs[i]["date"]+'">Edit</a> | '
          + '<a href="#" id="deleteLink" data-distance="'+runs[i]['distance']
          + '" data-date="'+runs[i]["date"]+'" onclick="return confirm(\'Are You Sure?\')">Delete</a></div></li>');
      }

      $('#home').bind('pageinit', function(){
        $('#stats').listview('refresh');
      });
    }else{
      $('#stats').html('<p>You have no logged runs</p>');
    }
  }

  /*
   * Delete a run section
   */

   $('#stats').on('tap', '#deleteLink', deleteRun);

   function deleteRun(){
     // reference the current date and distance
     var distance = $(this).data('distance');
     var date = $(this).data('date');

     // grab the runs item
     var runs = getRunsObject();

     // loop through for matches to this run
     for(var i = 0; i<runs.length; i++){
       if(distance == runs[i].distance && date == runs[i].date){
         runs.splice(i, 1);
         break
       }
     }
     // save the updated runs item back to local storage as a string
     localStorage.setItem('runs', JSON.stringify(runs));

     // notify the user
     alert('Run Deleted');

     //redirect
     window.location.href = "index.html";

     //block form submission
     return false;
   }

   /*
    * clear all the runs
    */
    $('#clearRuns').on('tap', clearRuns);

    function clearRuns(){
      // remove the local storage item
      localStorage.removeItem('runs');

      // redirect for refresh
      window.location.href = "index.html";

    }

  /*
   * Edit a run section
   */

   // set the current date and distance
   $('#stats').on('tap','#editLink', setCurrent);

   function setCurrent(){
     // set as local storage items
     localStorage.setItem('currentDistance', $(this).data('distance'));
     localStorage.setItem('currentDate', $(this).data('date'));

     // insert into the form fields for edit page.
     $('#editDistance').val(localStorage.getItem('currentDistance'));
     $('#editDate').val(localStorage.getItem('currentDate'));
   }

   // handler
   $('#submitEdit').on('tap', editRun);

   function editRun(){
     // get the current data
     var currentDistance = localStorage.getItem('currentDistance');
     var currentDate= localStorage.getItem('currentDate');
     var runs = getRunsObject();

     // remove run from existing local storage information
     for (var i = 0; i < runs.length; i++){
       if(runs[i].distance == currentDistance && runs[i].date == currentDate){
         runs.splice(i, 1);
         break;
       }
     }

     // get form values
     var distance = $('#editDistance').val();
     var date = $('#editDate').val();

     // update the run object
     var updated_run = {
       date: date,
       distance: parseFloat(distance)
     }

     // add the update run into the runs array
     runs.push(updated_run);

     alert('Run Updated');

     // store the array as a string in localStorage
     localStorage.setItem('runs', JSON.stringify(runs));

     // redirect
     window.location.href='index.html';

     // block form submission
     return false;
   }

  /*
   * Add a run section
   */

  // add handler
  $('#submitAdd').on('tap', addRun);


  // add a run function
  function addRun(){
    // get the form values
    var distance = $('#addDistance').val();
    var date = $('#addDate').val();

    // create the run object
    var run = {
      date: date,
      distance: parseFloat(distance)
    };

    // fetch existing runs
    var runs = getRunsObject();

    // add this run to existing runs
    runs.push(run);

    alert('Run Added');

    // convert runs array to string then store in local storage
    localStorage.setItem('runs', JSON.stringify(runs));

    // redirect
    window.location.href = "index.html";

    // block form submission
    return false;

  }

  // fetch existing runs
  function getRunsObject(){
    // set an array for storage
    var runs = new Array();

    // get current runs from localstorage
    var currentRuns = localStorage.getItem('runs');

    // check local storage
    if(currentRuns != null){
      // add it to runs
      var runs = JSON.parse(currentRuns);
    }

    return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date);});
  }
});
