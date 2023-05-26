const cards = document.querySelectorAll(".card");
const startBtn = document.querySelector("button");
const startScreen = document.querySelector(".start");
const startText = document.querySelector("h1");
const box = document.querySelector(".box");

let nums = [
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
  secondIndex;

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Start Game") {
    startBtn.textContent = "New Game";

    startCounter();

    setTimeout(() => {
      startScreen.style.display = "none";

      for (let i = 0; i < img.length; i++) {
        let random = getRandom(nums.length);
        img[i].src = nums[random];
        nums.splice(random, 1);
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

function startCounter(){
  startScreen.style.display = "flex";
    setTimeout(() => {
      startText.textContent = "2";
    }, 1000);

    setTimeout(() => {
      startText.textContent = "1";
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
