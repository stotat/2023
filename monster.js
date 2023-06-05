var fill_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){
        this.r = args.r || random(50,70) // 預設值，基本資料（包括有物件的顏色、位置、速度、大小⋯⋯）
        this.p = args.p || createVector(random(width), random(height)) // 怪物的外圍
        this.v = args.v || createVector(random(-1,1), random(-1,1)) // 怪物起始的位置（以向量方式表示該座標）
        this.color = args.color || random(monster_colors) // 怪物顏色
        this.mode = random(['happy','bad'])
    }

    draw(){
        push()
            translate(this.p.x, this.p.y)
            fill(this.color)
            noStroke() // 不要框線
            ellipse(0,0,this.r)
            if(this.mode == 'happy'){ // 眼睛為全圓
                fill(255)
                ellipse(0,0,this.r/2)
                fill(0)
                ellipse(0,0,this.r/3)
            }else{ // 眼睛為半圓
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill(0)
                arc(0,0,this.r/3,this.r/3,0,PI)
            }
            // 產生腳
            stroke(this.color)
            strokeWeight(4)
            noFill()
            begingShape()
                for(var i = 0; i < (this.r/2); i++){
                    vertex(this.r/2+i, sin(i/5+frameCount/10)*10)
                }
            endShape()
        pop()
    }
    
    update(){  
        this.p.add(this.v)
        if(this.p.x <= 0 || this.p.x >= width)
        {
            this.v.x = -this.v.x
        }
        if(this.p.y <= 0 || this.p.y >= height)
        {
            this.v.y = -this.v.y
        }
    }
}