let timer = 0; // 计时器的初始值
let intervalId; // setInterval()函数返回的ID

function setup() {
  createCanvas(400, 400);
  
  // 每1000毫秒(1秒)执行一次updateTimer()函数
  intervalId = setInterval(updateTimer, 1000);
}

function draw() {
  background(220);
  textSize(32);
  text("Time: " + timer, 20, 50);
}

function updateTimer() {
  timer++; // 计时器加1
}