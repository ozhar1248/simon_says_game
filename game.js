var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red" , "blue" , "green", "yellow"];

var started = false;
var level = 0;
var in_presenting_sequence = true;

$("#level-title").click(startGame);

$(".btn").click(
  function ()
  {
    if (!started || in_presenting_sequence)
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
  in_presenting_sequence = true;
  level += 1;
  $("#level-title").text("Level "+level);
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var len = gamePattern.length;
  for (let i = 0; i < len; ++i)
  {
    animateSelect(i, len);
  }
  userClickedPattern = [];
}

function animateSelect(index, len)
{
  var color = gamePattern[index];
  setTimeout( function()
    {
      $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color);
      if (index+1 === len)
      {
        in_presenting_sequence = false;
      }
    }, 700*index);
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
