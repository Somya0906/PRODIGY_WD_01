document.addEventListener("DOMContentLoaded", () => {

    let boxes = document.querySelectorAll(".box");
    let resetbutton = document.querySelector("#reset-btn");
    let newbutton = document.querySelector("#newbtn");
    let msgContainer = document.querySelector(".msg-container");
    let msg = document.querySelector("#msg");
    let modeSelection = document.querySelector("#mode-selection");
    let container = document.querySelector(".container");
    let heading = document.querySelector("#heading");
    
    let turnO = true; //player with X, player with O
    let count = 0; //To Track Draw
    let isAI = false; // To track if playing against AI
    
    const Patterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];
    document.querySelector("#player-vs-player").addEventListener("click", () => {
      startGame(false);
    });
    
    document.querySelector("#player-vs-ai").addEventListener("click", () => {
      startGame(true);
    });
    
    const resetGame = () => {
      turnO = true;
      count = 0;
      enable();
      msgContainer.classList.add("hide");
    };
    const resetGame1 = () => {
      turnO = true;
      count = 0;
      enable();
      msgContainer.classList.add("hide");
      heading.classList.remove("hide");
      modeSelection.classList.remove("hide");
      container.classList.add("hide");
      
      resetbutton.parentElement.classList.add("hide");
    
      console.log("Game reset: showing mode selection and heading.");
      console.log("Mode selection element visibility after reset:", modeSelection.classList);
    };
    
    const startGame = (aiMode) => {
      isAI = aiMode;
      turnO = true;
      count = 0;
      enable();
      modeSelection.classList.add("hide");
      container.classList.remove("hide");
      resetbutton.parentElement.classList.remove("hide");
      heading.classList.add("hide");
    
    };
    
    
    
    
    
    const playerMove = (e) => {
      let box = e.target;
      if (turnO) {
          //playerO
          box.innerText = "O";
          turnO = false;
      } else {
          //playerX
          box.innerText = "X";
          turnO = true;
      }
        box.setAttribute("disabled", true);
        count++;
    
        let winner = checkWinner();
    
        if (count === 9 && !winner) {
          gameDraw();
        }
        if (isAI && !turnO && !winner) {
          setTimeout(makeAIMove, 500);
      }
      };
      const makeAIMove = () => { // AI-related: Function to make AI move
        let emptyBoxes = Array.from(boxes).filter(box => !box.innerText); // AI-related: Find all empty boxes
        if (emptyBoxes.length === 0) return;
      
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]; // AI-related: Select a random empty box
        randomBox.innerText = "X";
        randomBox.setAttribute("disabled", true);
        turnO = true;
        count++;
      
        let winner = checkWinner();
      
        if (count === 9 && !winner) {
          gameDraw();
        }
      };
    const gameDraw = () => {
      msg.innerText = 'Game was a Draw.';
      msgContainer.classList.remove("hide");
      disable();
    };
    
    const disable = () => {
      for (let box of boxes) {
        box.setAttribute("disabled", true);
      }
    };
    
    const enable = () => {
      for (let box of boxes) {
        box.removeAttribute("disabled");
        box.innerText = "";
      }
    };
    
    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
      disable();
    };
    
    const checkWinner = () => {
      for (let pattern of Patterns) {
        let positionValue = boxes[pattern[0]].innerText;
        let position2Value = boxes[pattern[1]].innerText;
        let position3Value = boxes[pattern[2]].innerText;
    
        if (positionValue !== "" && positionValue === position2Value && positionValue === position3Value) {
          showWinner(positionValue);
          return true;
        }
      }
      return false;
    };
    boxes.forEach((box) => {
      box.addEventListener("click",  playerMove)
    }); 
    
    resetbutton.addEventListener("click", resetGame);
    newbutton.addEventListener("click", resetGame1);
    });