const canvas = $('#tron-canvas');
const ctxt = canvas[0].getContext('2d');

canvas.css('width', '100vw');
canvas.css('height', '100vh');

const canvasWidth = canvas[0].scrollWidth;
const canvasHeight = canvas[0].scrollHeight;

ctxt.canvas.width = canvasWidth;
ctxt.canvas.height = canvasHeight;

setInterval(runBikes, 1);
setInterval(erasePositions, 10000);


let Bike = function (name, color, direction, x, y) {
  this.name = name;
  this.lifes = 3;
  this.speed = 100;
  this.color = color;
  this.positions = [{direction, x, x1: x, y, y1: y}];
}

let bikeOne = new Bike('Hugo', 'orange', 'left', (canvasWidth / 2), (canvasHeight / 2) -10);
let bikeTwo = new Bike('Beto', 'skyblue', 'right', (canvasWidth / 2), (canvasHeight / 2) +10);

Bike.prototype.x = function (change) {
  if (change && this.direction() === 'left') {
    this.positions[this.positions.length - 1].x--;
  } else if (change && this.direction() === 'right') {
    this.positions[this.positions.length - 1].x++;
  }
  return this.positions[this.positions.length - 1].x;
};

Bike.prototype.y = function (change) {
  if (change && this.direction() === 'up') {
    this.positions[this.positions.length - 1].y--;
  } else if (change && this.direction() === 'down') {
    this.positions[this.positions.length - 1].y++;
  }
  return this.positions[this.positions.length - 1].y;    
};

Bike.prototype.direction = function (direction) {
  let x = this.x();
  let x1 = x;
  let y = this.y();
  let y1 = y;

  if (direction === 'up' && this.direction() !== 'up' && this.direction !== 'down') 
    this.positions.push({direction, x, y, y1});
  else if (direction === 'down' && this.direction() !== 'up' && this.direction !== 'down')
    this.positions.push({direction, x, y, y1});
  else if (direction === 'right' && this.direction() !== 'right' && this.direction !== 'left')
    this.positions.push({direction, x, y, x1});
  else if (direction === 'left' && this.direction() !== 'right' && this.direction !== 'left')
    this.positions.push({direction, x, y, x1})
    
  return this.positions[this.positions.length - 1].direction;
};
  
Bike.prototype.hasCrashed = function () {

  let allPositions = bikeOne.positions.concat(bikeTwo.positions);

  for (let i = 0; i < allPositions.length; i++) {
    let heckinPosition = allPositions[i];

    if (this.direction() === 'left' || this.direction() === 'right') {
      if (heckinPosition.direction === 'up' && this.x() === heckinPosition.x 
      && this.y() <= heckinPosition.y1 && this.y() >= heckinPosition.y) {
        this.crash();
      } else if (heckinPosition.direction === 'down' && this.x() === heckinPosition.x 
            && this.y() >= heckinPosition.y1 && this.y() <= heckinPosition.y) {
        this.crash();
      } 
    } else if (this.direction() === 'up' || this.direction() === 'down') {
      if (heckinPosition.direction === 'left' && this.y() === heckinPosition.y 
      && this.x() <= heckinPosition.x1 && this.x() >= heckinPosition.x) {
        this.crash();
      } else if (heckinPosition.direction === 'right' && this.y() === heckinPosition.y 
            && this.x() >= heckinPosition.x1 && this.x() <= heckinPosition.x) {
        this.crash();
      } 
    }
  }
};

Bike.prototype.crash = function() {
  alert(`Perdiste, ${this.name}`);
  this.lifes--;
  if (this.lifes === 0) {
    alert('HAHA');
    this.positions = [];
  }
};

bikeOne.x()

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  let key = e.key;

  if (key === 'w') {
    bikeOne.direction('up');
  } else if (key === 'a') {
    bikeOne.direction('left');
  } else if (key === 's') {
    bikeOne.direction('down');
  } else if (key === 'd') {
    bikeOne.direction('right');
  } else if (key === 'ArrowUp') {
    bikeTwo.direction('up');
  } else if (key === 'ArrowLeft') {
    bikeTwo.direction('left');
  } else if (key === 'ArrowDown') {
    bikeTwo.direction('down');
  } else if (key === 'ArrowRight') {
    bikeTwo.direction('right');
  }

});

function runBikes () {

  if (bikeOne.direction() === 'up') {
    drawUp(bikeOne.color, bikeOne.x(), bikeOne.y());
    bikeOne.y(true);
  } else if (bikeOne.direction() === 'down') {
    drawDown(bikeOne.color, bikeOne.x(), bikeOne.y()); 
    bikeOne.y(true);
  } else if (bikeOne.direction() === 'left') {
    drawLeft(bikeOne.color, bikeOne.x(), bikeOne.y());
    bikeOne.x(true);
  }  else if (bikeOne.direction() === 'right') {
    drawRight(bikeOne.color, bikeOne.x(), bikeOne.y());
    bikeOne.x(true);
  } 
  
  if (bikeTwo.direction() === 'up') {
    drawUp(bikeTwo.color, bikeTwo.x(), bikeTwo.y());
    bikeTwo.y(true);
  } else if (bikeTwo.direction() === 'down') {
    drawDown(bikeTwo.color, bikeTwo.x(), bikeTwo.y()); 
    bikeTwo.y(true);
  } else if (bikeTwo.direction() === 'left') {
    drawLeft(bikeTwo.color, bikeTwo.x(), bikeTwo.y());
    bikeTwo.x(true);
  }  else if (bikeTwo.direction() === 'right') {
    drawRight(bikeTwo.color, bikeTwo.x(), bikeTwo.y());
    bikeTwo.x(true);
  }

  bikeOne.hasCrashed();
  bikeTwo.hasCrashed();

}

function drawUp (color, x, y) {
  ctxt.strokeStyle = color;
  ctxt.beginPath();
  ctxt.moveTo(x, y);
  ctxt.lineTo(x, y - 1);
  ctxt.stroke();
}

function drawDown (color, x, y) {
  ctxt.strokeStyle = color;
  ctxt.beginPath();
  ctxt.moveTo(x, y);
  ctxt.lineTo(x, y + 1);
  ctxt.stroke();
}

function drawRight (color, x, y) {
  ctxt.strokeStyle = color;
  ctxt.beginPath();
  ctxt.moveTo(x, y);
  ctxt.lineTo(x + 1, y);
  ctxt.stroke();
}

function drawLeft (color, x, y) {
  ctxt.strokeStyle = color;
  ctxt.beginPath();
  ctxt.moveTo(x, y);
  ctxt.lineTo(x - 1, y);
  ctxt.stroke();
}

function erasePositions () {
  let bikeOneX = bikeOne.x();
  let bikeOneY = bikeOne.y();
  let bikeOneD = bikeOne.direction();
  let bikeTwoX = bikeTwo.x();
  let bikeTwoY = bikeTwo.y();
  let bikeTwoD = bikeTwo.direction();
  bikeOne.positions = [{direction: bikeOneD, x: bikeOneX, x1: bikeOneX, y: bikeOneY, y1: bikeOneY}];
  bikeTwo.positions = [{direction: bikeTwoD, x: bikeTwoX, x1: bikeTwoX, y: bikeTwoY, y1: bikeTwoY}];

  ctxt.clearRect(0, 0, canvasWidth, canvasHeight);

}


