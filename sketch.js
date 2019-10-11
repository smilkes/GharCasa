let spaces = [];
let rooms ;
let houses = [];
let upper= 80;
let lower = 30;
let soundos = [];
let events;
let housesNow;
let textScroll = ["Now, space colonies surround the Earth. Every day, development pops among space debris.", "Among the humans that survived, a few live in gated spaceship communities.", "The others flee to space slums, building their homes in borderless space.", "These neighborhoods get populated fast, and communities emerge.", "Nostalgic Earth migrants transmit sound as light,", "creating sonoric landscapes that remind them of their planet","and keep them sane","Life in space is slow and pleasant, ", "But Earth exodus implies new ways of thinking about property and community in space"];
var counter = 0;
var elem = document.getElementById("scroll1"); //+ document.getElementById("scrollTextDiv").innerHTML;
var inst = setInterval(changeText, 5000);
let phrase = "Humans on Earth:"
let humansNeedHouses;
let foggy = 100;
function changeText() {
  elem.innerHTML = textScroll[counter];
  counter++;
  if (counter >= textScroll.length) {
    counter = 0;
    clearInterval(inst);
  }
}



/*function updateStory(message){
  document.getElementById("scroll1").innerHTML = message; //+ document.getElementById("scrollTextDiv").innerHTML;
}
function initialtext(){
  updateStory('1% of humans live in comfortable self-sustaining spaceships.');
}*/



function preload() {
  


  img = loadImage('images/sunrise_background2.png');
  for (i=0; i <=5; i++){
  houses[i]= loadImage('images/house'+ i + '.png');
}
  
  for (i=0; i <=9; i++){
    soundos[i]= loadSound('sounds/sound' + i + '.mp3');
  }
  
}
function setup() {
  createCanvas(950,700);
  humansNeedHouses= int(random(2000,6000));
  
  
  //can delete
 

  var protection = 0;

  while (spaces.length < 10) {



    let rooms = new Space(random(200, width - 50), random(300, height - 50), random(80, 30), random(80, 30),random(houses), random(soundos));
    var overlapping = false;


    for (var j = 0; j < spaces.length; j++) {

      var other = spaces[j];
      var d = dist(rooms.x, rooms.y, other.x, other.y);
      if (d < rooms.d1 + other.d1 || d < rooms.d2 + other.d2) {
        overlapping = true;
      }
    }

    // If not keep it!
    if (!overlapping) {
      spaces.push(rooms);
    }

    // Are we stuck?
    protection++;
    if (protection > 1000000) {
      break;
    }

  }
  //spaces.show();  
}

function draw() {
  

  background(img);
  fill(10,114,0,foggy);
  rect(0 ,0 , 950, 700);

  fill(37, 213, 103);
  textSize(15);
  text(phrase, 700,20);
  text(humansNeedHouses, 850,20);
  
  
  

  for (let i = 0; i < spaces.length; i++) {
    spaces[i].updateSize();
    spaces[i].show();
    spaces[i].updateVol();

    
    
  }
  
}



/*function touchStarted() {
    getAudioContext().resume();
  }*/




function doubleClicked() {
  
  //touchStarted();
  let newSpace = new Space(mouseX, mouseY, random(upper, lower), random(upper, lower),random(houses),random(soundos));
  
  newSpace.playit();
  spaces.push(newSpace);
  

  if (humansNeedHouses > 20) {
    humansNeedHouses+= 20;
    foggy -=1;
  } else {
    alert("Earth is human free.")
  }
  //console.log(events.events.length);

 // console.log(newSpace);
  


}


function keyPressed() {
   /*if (keyCode === DELETE) {*/for (let i = spaces.length - 1; i >= 0; i--) {
    if (spaces[i].contains(mouseX, mouseY)) {
      spaces[i].sound.stop();
      spaces.splice(i, 1);
    }
    

    }
    humansNeedHouses +=20;
  }


class Space {
  constructor(x, y, d1, d2, housesimg, soundsplay) {
    this.x = x;
    this.y = y;
    this.d1 = d1;
    this.d2 = d2;
    this.image = housesimg;
    this.sound = soundsplay;
    //this.brightness = (125) ;
  }


  show() {

   image(this.image,this.x, this.y, this.d1, this.d2);
  }

  playit() {
   
        /*if (this.sound.isPlaying()){
          this.sound.stop();
        } else{*/
          this.sound.play();
        //}
      
    }

  updateVol() {
    //updates the volume of sound depending on distance of house from mouse
    let xdist = mouseX - this.x;
    let ydist = mouseY - this.y;
    let distmouse =  pow(pow(xdist,2) + pow(ydist,2),0.5);
    let decayfactor = 200;
    let volChange = exp((-distmouse)/decayfactor);
    this.sound.setVolume(volChange, 0.1);
  }
  
  updateSize(){
    if (this.sound.isPlaying()){
      this.d1= this.d1*(1+random(-0.01,0.01));
      this.d2= this.d2*(1+ random(-0.01,0.01));
    }
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.d1) {
      return true;
    } else {
      return false;
    }

  }


  intersects(otherr) {
    let d = (this.x, this.y, otherr.x, otherr.y);

    if (d < this.d1 + otherr.d1 || d < this.d2 + otherr.d2) {
      return true;
    } else {
      return false;
    }
  }
}
function housesCount (){
  housesNow = spaces.length;
}

