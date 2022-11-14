// 01 HTML / CSS : 구조 만들고 디자인하기
// 02 클릭한 카드 뒤집기
// 03 두 개의 카드 뒤집고 확인하기 (첫번째, 두번째 카드의 정보)
const memoryWrap = document.querySelector(".memory__wrap"); // 메모리 게임창 전체 박스
const memoryCards = memoryWrap.querySelectorAll(".cards li"); //
const memoryBtn = document.querySelector(".memory__info__btn");
const memoryInfo = document.querySelector(".memory__info");
const Replay = document.querySelector(".memory_restart");

const deck = document.querySelector('.memory__card'); 

let moves = 10;


// let activeDeck = []; // Holds selected cards w/max # of 2.
// let matchedDeck = []; // Holds matched cards.




let cardOne, cardTwo; // 카드 저장
let disableDeck = false; //
let matchedCard = 0 // 맞힌 카드
let endCardGame = 0; // 점수
memoryBtn.addEventListener("click", ()=>{
  let matchedCard = 0 // 맞힌 카드
  let endCardGame = 0; // 점수
  memoryInfo.style.display= "none";
// 카드 뒤집기 (카드의 정보 가져오기)
function flipCard(e) {
  // alert("뒤집어져라");
  let clickedCard = e.target;
  // startDaClock();

  // console.log(clickedCard)
  // if(clickedCard !== cardOne){
  if (clickedCard !== cardOne && !disableDeck) {
    //
    clickedCard.classList.add("flip");
    // console.log(clickedCard)
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back img").src;
    let cardTwoImg = cardTwo.querySelector(".back img").src;
    // console.log(cardOneImg)
    matchCards(cardOneImg, cardTwoImg);
    // console.log(cardOneImg)
    // console.log(cardTwoImg)
  }
}
// 두 개의 이미지 비교
function matchCards(img1, img2) {
  // console.log(img1, img2)
  if (img1 == img2) {
    // 같을 경우
    matchedCard += 2;
    endCardGame += 12.5;
    soundMatch.play();
    document.querySelector(".memory__card__correct").innerHTML = matchedCard;
    document.querySelector(".memory__card__score").innerHTML = endCardGame;
    // alert("같은 이미지")
    if (matchedCard == 16) {
      alert("우주 속 동물들을 모두 찾으셨다니 대단합니다!👍🏻");
      soundSuccess.play();
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";// cardOne ="" , cardTwo = "" 원래
    disableDeck = false;
  } else {
    // 일치하지 않을 경우 (BGM, 좌우 진동)
    // alert("다른 이미지")
    moves--;
    starScore();
    setTimeout(() => {
      cardOne.classList.add("shakeX");
      cardTwo.classList.add("shakeX");
    }, 500);
    setTimeout(() => {
      cardOne.classList.remove("shakeX");
      cardTwo.classList.remove("shakeX");
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1600);
    soundUnMatch.play();
  }

  const showMove = document.querySelector('.moves');
  showMove.innerHTML = moves;

  const showPopMove = document.querySelector('.movesPop');
  showPopMove.innerHTML = moves;
}
// 카드 섞기
function shuffledCard() {
  cardOne = cardTwo = "";
  disableDeck = false;
  matchedCard = 0;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let result = arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  memoryCards.forEach((card, index) => {
    card.classList.remove("flip");
    setTimeout(() => {
      card.classList.add("flip");
    }, 200 * index);
    setTimeout(() => {
      card.classList.remove("flip");
    }, 4000);
    let imgTag = card.querySelector(".back img");
    imgTag.src = `../assets/memory/img-${arr[index]}.svg`;
  });
}
shuffledCard();
// 카드 클릭
memoryCards.forEach((card, i) => {
  card.addEventListener("click", flipCard);
});
})

// 배경음악
let sound = [
  "../assets/audio/match2.mp3",
  "../assets/audio/match.mp3",
  "../assets/audio/up.mp3",
];
let soundMatch = new Audio(sound[0]);
let soundUnMatch = new Audio(sound[1]);
let soundSuccess = new Audio(sound[2]);







// allows board to reset on click from Reset icon.
// allows "Play Again?" to reset board & pop-up to be removed on click.
$('.popRestart').click(resetGame);

// $('.card').click(selectCard); // allows cards to be "flipped" on click.
$('.popReturn').click(returnToGame); // allows "Return?" to remove pop-up and return to won game.






// function resetGame () {
//     shuffleDeck (this);
//     resetDeck(this);


//     return resetGame;

// }

function resetGame() {

  moves = 10;
  cardOne = cardTwo = ''; // 카드 저장
  disableDeck = false; //
  matchedCard = 0 // 맞힌 카드
  endCardGame = 0; // 점수

  memoryInfo.style.display = "block";
  memoryBtn.style.pointerEvents = "all";

  $('.starOne').addClass('full');
  $('.starTwo').addClass('full');
  $('.starThree').addClass('full');
}

/*
 * Function toggles winning pop-up message
 */
function togglePop () {
  const modal = document.querySelector('#winPop');

  modal.classList.toggle('hidden');


  return togglePop;
}

// Function toggles pop-up modal to return to game without resetting
function returnToGame () {
  togglePop();

  return returnToGame;
}


 /*
  * Removes star highlight from overall star counts
  */
 function starScore () {
   if (moves === 7) {
     $('.starOne').removeClass('full');
    //  console.log('You lost a star!');
   }
   else if (moves === 3) {
     $('.starTwo').removeClass('full');
    //  console.log('You lost another star!');
   }
   else if (moves === 0) {
    $('.starThree').removeClass('full');
    alert("기회를 다 쓰셨군요?🫠 다시 도전해보세요!");
    resetGame();
  }

   return starScore;
}


// 리플레이 버튼 클릭시
Replay.addEventListener("click", () => {
  resetGame();
})