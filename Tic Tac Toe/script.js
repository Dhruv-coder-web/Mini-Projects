let boxes = document.querySelectorAll(".game-btn");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new-btn");
let winMsgContainer = document.querySelector(".winner-container");
let winMsg = document.querySelector(".msg");

let count = 0;
var turnO = true;

const winPattern = [
    [0 ,1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO)
        {
            box.innerText = "O";
            box.style.color = "darkblue";
            var whoosh1 = new Audio("whoosh1.mp3")
            whoosh1.play("Audio");
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            box.style.color = "crimson";
            var whoosh2 = new Audio("whoosh2.mp3")
            whoosh2.play("Audio");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner)
        {
            Draw();
        }
    });
});

let resetGame = () => {
    turnO = true;
    enableGame();
    count = 0;
    winMsgContainer.classList.add("hide");
};

let enableGame = () => {
    for(box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
};

let disableGame = () => {
    for(box of boxes)
    {
        box.disabled = true;
    }
};

let Winner = (player) => {
    winMsg.innerText = `Congratulations! \nWinner is ${player}`;
    winMsgContainer.classList.remove("hide");
    disableGame();
};

let Draw = () => {
    winMsg.innerText = "Game was Draw!";
    winMsgContainer.classList.remove("hide");
    disableGame();
};

const checkWinner = () => {
    for(let Pattern of winPattern)
    {
        let position1 = boxes[Pattern[0]].innerText; 
        let position2 = boxes[Pattern[1]].innerText; 
        let position3 = boxes[Pattern[2]].innerText; 

        if(position1 != "" && position2 != "" && position3 != "")
        {
            if(position1 === position2 && position2 === position3)
            {
                Winner(position1);
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);