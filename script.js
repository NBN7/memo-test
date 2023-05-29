const cards = document.querySelectorAll(".card");
const box = document.querySelector(".box");

const startBtn = document.querySelector("button");

const loadScreen = document.querySelector(".load-screen");
const loadText = document.querySelector("#load-number");

const winScreen = document.querySelector(".win");
const winBtn = document.querySelector("h4");

let imgArr = [
  "./Images/poop.png",
  "./Images/ghost.png",
  "./Images/rock.png",
  "./Images/brain.png",
  "./Images/ninja.png",
  "./Images/wizard.png",
  "./Images/poop.png",
  "./Images/ghost.png",
  "./Images/rock.png",
  "./Images/brain.png",
  "./Images/ninja.png",
  "./Images/wizard.png",
];

const img = document.querySelectorAll("img");

let flag = false,
  firstSelected = "",
  firstIndex,
  secondSelected = "",
  secondIndex,
  matchCards = 0;

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Start Game") {
    startBtn.textContent = "New Game";

    showLoadScreen();

    setTimeout(() => {
      loadScreen.style.display = "none";

      for (let i = 0; i < img.length; i++) {
        let random = getRandom(imgArr.length);
        img[i].src = imgArr[random];
        imgArr.splice(random, 1);
        img[i].style.opacity = 1;

        box.style.pointerEvents = "none";

        setTimeout(() => {
          hideCards(img[i]);          
          box.style.pointerEvents = "auto";
        }, 2000);
      }

      for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => {

          setTimeout(() => {
            box.style.pointerEvents = "auto";
          }, 600);

          if (flag === false) {
            firstSelected = cards[i].lastChild.src;
            firstIndex = i;
            flag = true;
          } else {
            secondSelected = cards[i].lastChild.src;
            secondIndex = i;
            flag = false;
          }
          addAnimation(cards[i]);

          setTimeout(() => {
            cards[i].lastChild.style.opacity = 1;
          }, 350);

          if (firstSelected !== "" && secondSelected !== "") {
            if (firstSelected !== secondSelected) {
              resetValues();

              setTimeout(() => {
                notMatch(cards[firstIndex], cards[secondIndex]);
              }, 600);

              setTimeout(() => {
                removeAnimation(cards[firstIndex], cards[secondIndex]);
              }, 970);
            } else {
              resetValues();

              setTimeout(() => {
                match(cards[firstIndex], cards[secondIndex]);
              }, 600);

              setTimeout(() => {
                showWinScreen();
              }, 1300);
            }
          }
        });
      }
    }, 3000);
  } else {
    location.reload();
    startBtn.textContent = "Start Game";
  }
});

function showLoadScreen(){
  loadScreen.style.display = "flex";
    setTimeout(() => {
      loadText.textContent = "2";
    }, 1000);

    setTimeout(() => {
      loadText.textContent = "1";
    }, 2000);
}

function hideCards(img) {
  img.style.opacity = 0;
}

function addAnimation(card) {
  card.classList.add("flip-animation");
  box.style.pointerEvents = "none";
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function resetValues() {
  firstSelected = "";
  secondSelected = "";
}

function match(cardFirstIndex, cardSecondIndex) {
  cardFirstIndex.classList.add("match-animation");
  cardFirstIndex.style.pointerEvents = "none";

  cardSecondIndex.classList.add("match-animation");
  cardSecondIndex.style.pointerEvents = "none";

  matchCards++;
}

function notMatch(cardFirstIndex, cardSecondIndex) {
  cardFirstIndex.lastChild.style.opacity = 0;
  cardFirstIndex.classList.remove("flip-animation");
  cardFirstIndex.classList.add("back-animation");

  cardSecondIndex.lastChild.style.opacity = 0;
  cardSecondIndex.classList.remove("flip-animation");
  cardSecondIndex.classList.add("back-animation");
}

function removeAnimation(cardFirstIndex, cardSecondIndex) {
  cardFirstIndex.classList.remove("back-animation");
  cardSecondIndex.classList.remove("back-animation");
}

function showWinScreen(){
  if (matchCards === 6){
    winScreen.style.display = "flex";
  }

  winBtn.addEventListener("click", () => {
    location.reload();
  })
}
