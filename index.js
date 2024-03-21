var cards = [
  "ciri.png",
  "geralt.png",
  "jaskier.png",
  "iorweth.png",
  "triss.png",
  "yen.png",
  "ciri.png",
  "geralt.png",
  "jaskier.png",
  "iorweth.png",
  "triss.png",
  "yen.png",
];

var oneVisible = false;
var turnCounter = 0;
var visibleId;
var lock = false;
var pairsLeft = 6;

cards.sort(function (a, b) {
  return 0.5 - Math.random();
});

for (var i = 0; i < cards.length; i++) {
  document.querySelectorAll(".card")[i].addEventListener("click", function () {
    revealCard(this.id);
  });
}

function revealCard(id) {
  //getter
  var opacityValue = $("#" + id).css("opacity");

  if (Number(opacityValue) !== 0 && lock === false) {
    lock = true;

    var image = "url(img/" + cards[id.substring(1)] + ")";

    $("#" + id).css("background-image", image);
    $("#" + id).addClass("cardA");
    $("#" + id).removeClass("card");

    if (oneVisible === false) {
      //first card
      oneVisible = true;
      visibleId = id;

      lock = false;
    } else {
      //second card
      if (
        cards[visibleId.substring(1)] === cards[id.substring(1)] &&
        visibleId !== id
      ) {
        setTimeout(function () {
          hide2Cards(id, visibleId);
        }, 750);
      } else {
        setTimeout(function () {
          restore2Cards(id, visibleId);
        }, 1000);
      }

      if (visibleId !== id) {
        turnCounter++;
      }

      $(".score").html("Turn counter: " + turnCounter);
      oneVisible = false;
    }
  }
}

function hide2Cards(id1, id2) {
  //setter
  $("#" + id1).css("opacity", "0");
  $("#" + id2).css("opacity", "0");

  pairsLeft--;

  if (pairsLeft === 0) {
    $(".board").html(
      "<h1>You win!<br>Done in " +
        turnCounter +
        " turns.</h1><button class='reload'>Click to reload</button>"
    );
    $(".reload").on("click", function () {
      location.reload();
    });
    $(".board").addClass("boardA");
    $(".boardA").removeClass("board");
    $(".score").css("color", "#26282e");
  }

  lock = false;
}

function restore2Cards(id1, id2) {
  $("#" + id1).css("background-image", "url(img/karta.png)");
  $("#" + id1).addClass("card");
  $("#" + id1).removeClass("cardA");

  $("#" + id2).css("background-image", "url(img/karta.png)");
  $("#" + id2).addClass("card");
  $("#" + id2).removeClass("cardA");

  lock = false;
}
