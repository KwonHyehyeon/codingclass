// 01 HTML / CSS : 구조 만들고 디자인하기
// 02 클릭한 카드 뒤집기
// 03 두 개의 카드 뒤집고 확인하기 (첫번째, 두번째 카드의 정보)
const memoryWrap = document.querySelector(".memory__wrap"); // 메모리 게임창 전체 박스
const memoryCards = memoryWrap.querySelectorAll(".cards li"); //
const memoryBtn = document.querySelector(".memory__info__btn");
const memoryInfo = document.querySelector(".memory__info");
let cardOne, cardTwo; // 카드 저장
let disableDeck = false; //
let matchedCard = 0; //

memoryBtn.addEventListener("click", ()=>{

  memoryInfo.style.display= "none";
// 카드 뒤집기 (카드의 정보 가져오기)
function flipCard(e) {
  // alert("뒤집어져라");
  let clickedCard = e.target;
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
    matchedCard++;
    soundMatch.play();
    // alert("같은 이미지")
    if (matchedCard == 8) {
      alert("game over");
      soundSuccess.play();
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    // 일치하지 않을 경우 (BGM, 좌우 진동)
    // alert("다른 이미지")
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



// 폴더 누르면 나오게 작업
