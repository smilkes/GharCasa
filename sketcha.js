


function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');  
  
}

function draw() {
	
console.log('begin P5.js demo');
// first canvas
	
  background("thistle");
  


}

function space () {
/*var x = 80;
var y = 30;
var w = 80;
var h = 60;	
	
  if ((mouseX > x) && (mouseX < x+w) &&
    (mouseY > y) && (mouseY < y+h)) {
    fill(0);
  } 
  else {
    fill(255);
  }*/
  rect(mouseX, mouseY, 30, 20);
  
}

function mouseClicked() {
  ellipse(mouseX, mouseY, 105, 105);
  console.log("event");
  // prevent default
  return false;
}


HTMLButtonElement.onclick = refreshCanvas;
function refreshCanvas() {
	var parentElement = canvas.parentElement;
    var emptyCanvas = canvas.cloneNode(false);
	element = document.getElementById("canvas");
    parentElement.appendChild(emptyCanvas);	
	element.parentNode.removeChild(element);

    //parentElement.removeChild(canvas);
    parentElement.appendChild(emptyCanvas);
}