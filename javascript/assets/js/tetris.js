const tetrisWrap = document.querySelector(".tetris__wrap");
const playground = tetrisWrap.querySelector(".playground > ul");

// variables
let rows = 15;
let cols = 12;
let tetrisScore = 0; //우리가 알아서 만들기
let duration = 500;
let downInterval;
let tempMovingItem;

// 블록 정보 //tempMovingItem에 저장시켜줄 것임
const movingItem = {
    type: "Tmino",
    // 좌푯값(모양처리)
    direction: 0,   //블록 모양
    top: 0,
    left: 0
}
// 블록 좌푯값
const blocks = {
    Tmino: [
        [[2,1],[0,1],[1,0],[1,1]],  //기본모양
        [[1,2],[0,1],[1,0],[1,1]],  //기본모양2
        [[1,2],[0,1],[2,1],[1,1]],  //기본모양3
        [[2,1],[1,2],[1,0],[1,1]],  //기본모양4
    ],
    Lmino: "",
    Jmino: "",
    Zmino: "",
    Smino: "",
    Omino: "",
    Imino: "",
};

// 시작하기
function init(){
    // 블록 정보를 tempMovingItem에 입력
    tempMovingItem = { ...movingItem };
    // console.log(tempMovingItem)
    prependNewLine();   //블록 라인 만들기
    renderBlocks();     //블록 출력하기
}

// 블록 만들기
function prependNewLine(){
    for(let i=0; i<rows; i++){
        // createElement태그만드는 것
        const li = document.createElement("li");
        const ul = document.createElement("ul");

        for(let j=0; j<cols; j++){
            const matrix = document.createElement("li");
            // 뒤에다 넣어주기 prepend
            ul.prepend(matrix);
        }
        li.prepend(ul);
        playground.prepend(li);
    }
}

// 블록 출력하기
function renderBlocks(){
    // const ty = tempMovingItem.type;
    // const di = tempMovingItem.direction;
    // const to = tempMovingItem.top;
    // const le = tempMovingItem.left;

    // 변수이름 한번에 쓰기 //객체구조분해할당
    const {type, direction, top, left } = tempMovingItem;

    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
        moving.classList.remove(type, "moving");
    });
    // console.log(type)
    // console.log(direction)
    // console.log(top)
    // console.log(left)
    blocks[type][direction].forEach( block => {
        // 좌표
        const x = block[0] + left; // 2 0 1 1
        const y = block[1] + top; // 1 1 0 1

        

        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);

        // 값 있을 때
        if(isAvailable){
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = {...movingItem};
            renderBlocks();
        }

        // console.log({playground})
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}

// 빈칸 확인하기
function checkEmpty(){
    //타겟값 전달받음 // null값이 아닌 경우
    if(!target){
        return false;
    }
    return true;
}

// 블록 움직이기
function moveBlock(moveType, amount){
        tempMovingItem[moveType] += amount;
        renderBlocks();
}
// 이벤트
document.addEventListener("keydown", e => {
    switch(e.keyCode){
        // 콘솔로 키코드 값:39
        //오른쪽 방향키를 눌렀을 때, left 1 움직여라
        case 39 :
            moveBlock("left", 1);
            break;
        case 37 :
            moveBlock("left", -1);
            break;
        case 40 :
            moveBlock("top", 1);
            break;
            
        default:
            break;
    }
})





init();