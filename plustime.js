// 粒子、類別
class Obj1{ // 一個物件的設定
    constructor(args){ // 預設值，基本資料(包含有物件的顏色、位置、速度、大小...)
      this.p = args.p || createVector(random(width), random(height))
      this.v = createVector(random(-1,1), random(-1,1)) // 產生一個x座標值為random(-1,1)
      this.color = random(fill_colors) // 充滿顏色
      this.stroke = random(stroke_colors) // 線條顏色
      this.size = 50
    }
  draw() // 把物件畫出來的函數
  {
    push();
    translate(this.p.x, this.p.y);
    scale(this.v.x < 0 ? 1 : -1, -1);
    fill(this.color);
    stroke(this.stroke);
    beginShape();
    const numPoints = 50; // 圓形上的點數
    const angleIncrement = (2 * Math.PI) / numPoints; // 角度增量
    for (let i = 0; i < numPoints; i++) {
      const x = Math.cos(i * angleIncrement) * this.size;
      const y = Math.sin(i * angleIncrement) * this.size;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    }

      
    update(){ // 移動後設定位置資料值為何
      // 移動的程式碼---------------------------------------
      this.p.add(this.v) // 此行效果跟上面兩行一樣
      // -------------------------------------------    
   
      // 碰壁的處理程式碼--------------------------------------
      if(this.p.x <= 0 || this.p.x >= width) // <0碰到左邊， >width為碰到右邊
      {
        this.v.x = -this.v.x
      }
      if(this.p.y <= 0 || this.p.y >= height) // <0碰到左邊， >width為碰到右邊
      {
        this.v.y = -this.v.y
      }
    }  
  
    isBallInRanger(x,y){
       
            let d = dist(x, y, this.p.x, this.p.y) // 計算滑鼠按下的點與此物件位置之間的距離
            if(d<this.size){ // 4得由來：去看座標點最大的值，以此作為方框的高與寬
            return true // 代表距離有在範圍內
             }else{
             return false // 代表距離沒有在範圍內
             }   
    
    }

  }
