const game = document.getElementById("game");
const player = document.getElementById("player");


let playerX = 175;
let speed = 11;
let score = 0;
const sushiImages = ["images/sushi1.png","images/sushi2.png","images/sushi3.png","images/sushi4.png","images/sushi5.png","images/sushi6.png","images/sushi7.png","images/sushi8.png"];
const catchSound = new Audio("catch.mp3");



document.addEventListener("keydown", (e) => {
  const gamewidth = game.clientWidth;
  const playerwidth = player.offsetWidth;
  if (e.key === "ArrowLeft" && playerX > 0)
    {   
    playerX -= 20;
    player.style.transform = "scaleX(1)";
    }

  if (e.key === "ArrowRight" && playerX < gamewidth - playerwidth)
    { 
      playerX += 20;
      player.style.transform = "scaleX(-1)";
    }

  player.style.left = playerX + "px";
});
game.addEventListener("touchmove", (e) => {
  const gameRect = game.getBoundingClientRect();
  let touchX = e.touches[0].clientX - gameRect.left;

  playerX = touchX - player.offsetWidth / 2;

  if(playerX < 0) playerX = 0;
  if(playerX >  gameRect.width - player.offsetWidth){
    playerX = gameRect.width - player.offsetWidth;
  }
  player.style.left = playerX + "px";
})

function createSushi() {
  const gamewidth = game.clientWidth;
  const sushi = document.createElement("div");
  sushi.classList.add("sushi");
  const randomImg = sushiImages[Math.floor(Math.random() * sushiImages.length)];
  sushi.style.backgroundImage = `url(${randomImg})`;
  game.appendChild(sushi);
  sushi.syle.top = "-80";
  const sushiwidth = sushi.offsetWidth;
  
  const sushiMax = Math.max(0, gamewidth - sushiwidth);
  sushi.style.left = Math.random() * sushiMax + "px";

    let sushiY = 0;
    const fall = setInterval(() => {
    sushiY += speed;
    sushi.style.top = sushiY + "px";

    const playerRect = player.getBoundingClientRect();
    const sushiRect = sushi.getBoundingClientRect();
    
    if(sushiRect.left < playerRect.right && sushiRect.right > playerRect.left && sushiRect.top < playerRect.bottom && sushiRect.bottom > playerRect.top)
    {score++
     document.getElementById("score").textContent = `score: ${score}`;
     sushi.remove();
     catchSound.play();
     clearInterval(fall);
     return;
    }

      if (sushiY > 650) {
      sushi.remove();
      clearInterval(fall);
      return;
    }
  }, 20);

}

function startGame(){
score = 0;
let timeLeft = 30;
document.getElementById("score").textContent = `Score: ${score}`;
document.getElementById("timer").textContent = `Time: ${timeLeft}`;



const sushiSpawner = setInterval(createSushi, 1000);

  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${timeLeft}`;

  const countdown = setInterval(() => {timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}`;
  
  if(timeLeft <= 0){
    clearInterval(countdown);
    alert(`Time's up! Your sushi is ${score}`);
    clearInterval(sushiSpawner)

    setTimeout(() => {
      startButton.disabled = false;
    }, 2000);
  }
},1000)
};
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startGame();
})
