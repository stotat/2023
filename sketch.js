let points = [[0,0],[-1,0],[-2,-1],[-2,4],[-4,4],[-4,3],[-3,2.8],[-3,-4],[-2,-4],[-2,-3],[-2,-4],[-1,-4],[-1,-3],[0,-3],[0,-4],[1,-4],[1,-3],[1,-4],[2,-4],[2,-2],[6,-2],[2,-1],[1,0],[0,0],[-1,0][-2,-1]];
var stroke_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
var fill_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
let bg
let timer = 10 // 計時器初始值
let intervalId
let end
let gameOver = false; // 追蹤遊戲是否結束的變數

function preload(){ // 最早執行的程式碼
  dinosaur_sound = loadSound('sound/oh-oh.wav')
  bullet_sound = loadSound('sound/gun.wav')
  plustime_sound = loadSound('ding.mp3')
}

var ball // 代表單一個物件，利用這個變數來做正在處理的物件
var balls = [] // 陣列，放所有的物件資料
var bullet
var bullets = []
var score = 0
var dog
var dogs = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('bg.jpeg');
  intervalId = setInterval(updateTimer, 1000);
  // 產生幾個物件
  for(var j=0; j<30; j=j+1)
  {
    ball = new Obj({}) // 產生一個新的物件，暫時放入到ball的變數中
    balls.push(ball) // 把ball物件放入到ball物件群(陣列)中
  }

  for(var j=0; j<2; j=j+1)
  {
    dog = new Obj1({}) // 產生一個新的物件，暫時放入到ball的變數中
    dogs.push(dog) // 把ball物件放入到ball物件群(陣列)中
  }
}

function draw() { 
  background(bg);
  if (timer > 0) {
    push()
      textSize(50)
      strokeWeight(4)
      stroke(255)
      text('得分', 20, 50);
      text(score, 135, 50);
      text("時間 " + timer, 20, 115);      
    pop()
  } else {
    push()
      textSize(50)
      strokeWeight(4)
      stroke(255)
      textAlign(CENTER);
      text("遊戲結束", width / 2, height / 2 + 130);
      text("點擊螢幕重新開始遊戲", width / 2, height / 2 + 200);
      if (score >= 15) {
        textSize(100)
        text("挑戰成功", width / 2, height / 2 - 100)
     } else {
        textSize(100)
        text("挑戰失敗", width / 2, height / 2 - 100)
     }
    pop()
  }
  for(let ball of balls){ // 針對陣列變數，取出陣列內一個一個的物件
    ball.draw()
    ball.update()
     // 由此判斷每隻大象有沒有接觸到每一個飛彈
     for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)) // 判斷ball與bullet有沒有碰觸
      {
        score = score + 1
        dinosaur_sound.play()
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
     }
  }
  for(let dog of dogs){ // 針對陣列變數，取出陣列內一個一個的物件
    dog.draw()
    dog.update()
     // 由此判斷每隻大象有沒有接觸到每一個飛彈
     for(let bullet of bullets){
      if(dog.isBallInRanger(bullet.p.x,bullet.p.y)) // 判斷ball與bullet有沒有碰觸
      {
        timer = timer+2
        plustime_sound.play()
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
      }
     }
  }

  for(let bullet of bullets){ // 針對飛彈倉庫的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  push()  
  textSize(50)
  strokeWeight(4)
  stroke(255)
  text('得分',20,50)
  text(score,135,50)
  text("時間 " + timer, 20, 115); 
  pop()

  // 畫出中間的砲台--------------------------------------
  push()
    let dx = mouseX - width/2 // 滑鼠座標到中心點座標的x軸的距離
    let dy = mouseY - height/2 // 滑鼠座標到中心點座標的y軸的距離
    let angle = atan2(dy, dx) // 利用反tan算出角度

    translate(width/2, height/2)
    rotate(angle) // 讓三角形翻轉一個angle角度
    noStroke()
    fill(0)
    ellipse(0,0,60)
    fill(90)
    triangle(50, 0, -25, -25, -25, 25)
  pop()
}

function mousePressed(){
  bullet = new Bullet({})
  bullets.push(bullet) // 把這一筆資料放入飛彈倉庫
  bullet_sound.play()

  if (timer <= 0) {
    // 時間結束，重新開始遊戲
    resetGame();
  } else {
    // 遊戲進行中，發射飛彈
    bullet = new Bullet({});
    bullets.push(bullet);
    bullet_sound.play();
  }
}

function updateTimer() {
  timer--
  if (timer <= 0) {
    clearInterval(intervalId);
  }
}

function resetGame() {
  // 重新設定遊戲相關變數
  timer = 10;
  score = 0;

  // 重新產生幾個物件
  balls = [];
  for (var j = 0; j < 30; j = j + 1) {
    ball = new Obj({});
    balls.push(ball);
  }
  bullets = [];

  // 重新啟動計時器
  intervalId = setInterval(updateTimer, 1000);
}