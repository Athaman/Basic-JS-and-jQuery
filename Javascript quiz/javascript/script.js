function submitAnswers(){
  var totalQuestions = 5;
  var score = 0;

  // get user input
  var q1 = document.forms["quizForm"]["q1"].value;
  var q2 = document.forms["quizForm"]["q2"].value;
  var q3 = document.forms["quizForm"]["q3"].value;
  var q4 = document.forms["quizForm"]["q4"].value;
  var q5 = document.forms["quizForm"]["q5"].value;

  // simple form validation
  for(var i = 1; i <= totalQuestions; i++){
    if(eval('q'+i) === null || eval('q'+i) === ''){
      alert('You missed question ' + i);
      return false;
    }
  }

  //set correct answers

  var answers = ["c", "a", "d", "b", "d"];

  // check answers
  for(var j = 1; j <= totalQuestions; j++)
    if(eval('q'+j) === answers[j-1]){
      score++;
    }
    alert("You scored " + score + " out of " + totalQuestions);


    //display results in page
    var results = document.getElementById('results');
    results.innerHTML = '<h3>You scored <span>' + score + '</span> out of <span>' + totalQuestions + '</span></h3>';
    return false;
}
