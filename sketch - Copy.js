let bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r1 = random(20, 60);
    let r2 = random(20, 60);    
    let b = new Bubble(x, y, r1, r2);
    bubbles.push(b);
  }


}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function doubleClicked() {
  
    bubbles.push (new Bubble(mouseX, mouseY, 30, 50));
  }


function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    } else {
      bubbles[i].changeColor(0);
    }
    //bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

/*  
    move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

*/

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    rectMode (CENTER);
    rect (this.x, this.y, this.r * 2, this.r*1.5);
    //ellipse(this.x, this.y, this.r * 2);
  }
}

