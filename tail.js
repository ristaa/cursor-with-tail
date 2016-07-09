var clicking = false;
var lineWidth = 16;
var timeOut;
var currentX;
var currentY;
var positionsX = []; 
var positionsY = []; 

window.addEventListener( 'mousedown', function( event ){
  clicking = true;
});

window.addEventListener( 'mouseup', function( event ){ 
  clicking = false;
});

var canvas = document.getElementById('myCanvas');

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener( 'mousemove', function( event ){
  if(clicking == false) return;
  
  //clearTimeout(timeOut);
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');

  currentX = event.pageX;
  currentY = event.pageY;
  
  // Create a canvas that we will use as a mask
  var maskCanvas = document.createElement('canvas');
  // Ensure same dimensions
  maskCanvas.width = canvas.width;
  maskCanvas.height = canvas.height;
  var maskCtx = maskCanvas.getContext('2d');

  // This color is the one of the filled shape
  maskCtx.fillStyle = "#333";
  // Fill the mask
  maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
  // Set xor operation
  maskCtx.globalCompositeOperation = 'xor';
  // Draw the shape you want to take out
  maskCtx.arc(event.pageX,event.pageY,2000,0,2*Math.PI);
  maskCtx.fill();

  // Draw mask on the image, and done !
  context.drawImage(maskCanvas, 0, 0);

  // rect color
  context.beginPath();   
  context.rect(event.pageX,event.pageY,lineWidth,lineWidth);
  
  context.strokeStyle = document.getElementById('brush-color').value;
  context.fillStyle = document.getElementById('brush-color').value;
  context.fill();

  timeOut = setInterval(function(){
    
  positionsX.push(currentX);
  
  if(positionsX.length === 400){
    positionsX.shift();
  }
  
  positionsY.push(currentY);
  
  if(positionsY.length === 400){
    positionsY.shift();
  }
    

    for(var i=0; i<289; i++){
      context.clearRect(positionsX[i], positionsY[i], 16, 16);
    }

  }, 10);

});