var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red" , "blue" , "green", "yellow"];

var started = false;
var level = 0;

$("#level-title").click(startGame);

$(".btn").click(
  function ()
  {
    if (!started)
    {
      return;
    }
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);
  }
);

function startGame()
{
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1])
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence, 1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Click here to start");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name)
{
  new Audio("sounds/"+name+".mp3").play();
}

function nextSequence()
{
  level += 1;
  $("#level-title").html("Level "+level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(
    function() {
      $("#"+currentColour).removeClass("pressed");
    }
  , 100);
}
