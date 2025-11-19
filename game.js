const game = document.getElementById("game");
const player = document.getElementById("player");


let playerX = 175;
let speed = 15;
let score = 0;
const sushiImages = [
  {img:"images/sushi1.png", points: 2},
  {img:"images/sushi2.png", points: 1},
  {img:"images/sushi3.png", points: 3},
  {img:"images/sushi4.png", points: 8},
  {img:"images/sushi5.png", points: 4},
  {img:"images/sushi6.png", points: 5},
  {img:"images/sushi7.png",  points: 6},
  {img:"images/sushi8.png", points: 7}
];
const catchSound = new Audio("catch.mp3");
const bgMusic = new Audio("bgmusic.mp3");
bgMusic.play();
const win = new Audio("win.mp3");

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
sushi.style.backgroundImage = `url(${randomImg.img})`;
const sushiwidth = sushi.offsetWidth;
  sushi.style.left = Math.random() * (gamewidth - sushiwidth) + "px";
  game.appendChild(sushi);

  let sushiY = 0;
  const fall = setInterval(() => {
    sushiY += speed;
    sushi.style.top = sushiY + "px";

    const playerRect = player.getBoundingClientRect();
    const sushiRect = sushi.getBoundingClientRect();
    
    if(sushiRect.left < playerRect.right && sushiRect.right > playerRect.left && sushiRect.top < playerRect.bottom && sushiRect.bottom > playerRect.top)
    {score += randomImg.points
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
    win.play();
  
    clearInterval(countdown);
    alert(`Time's up! Your sushi is ${score}`);
    clearInterval(sushiSpawner)

    setTimeout(() => {
      startButton.style.visibility = "visible";
      startButton.disabled = false;
    }, 2000);
  }
},1000)
};
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startButton.style.visibility = "hidden";
 
  startGame();
  
  bgMusic.play().catch(e => console.log("Play error:", e));

})
