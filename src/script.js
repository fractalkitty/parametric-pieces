//Break it Down
//WCCChallenge
//published on medium: https://sophiawood.medium.com/parametric-pieces-e165ff3e15af
//comments are a poem

let pieces; //we are but arrays of different versions of ourselves
let timeOfNow; //never the same, yet self similar
let jiggleBool = false; //with or without the same energy
let red1, green1, blue1; //fragments tied with color
function setup() {
  createCanvas(600, 600); //we have a canvas to paint ourselves
  pieces = []; //with a breath, we start with nothing
  frameCount = 0; //the beginning of our time - a relative start
  angleMode(DEGREES); //with relative orientation
  strokeWeight(0.5); //---to just touch with a brush - lightly
  red1 = random(0, 25); // warm
  green1 = random(10, 25); //and
  blue1 = random(10, 25); //cool
  mixer = random(1, 3); // with a little unknown
  background(mixer * red1, mixer * green1, mixer * blue1); //we build a background
  pieces.push(new PiecesOfYou(width / 4, width / 4, width / 2)); //on which we can start as an array of one thought
}
function draw() {
  timeOfNow = frameCount / 2; //but thoughts move
  translate(width / 2, width / 2); //and so do canvases

  for (let i = 0; i < pieces.length; i++) {
    pieces[i].translate(); //each element of us has a path
    pieces[i].beSeen(); //sometimes seen
  }
  if (timeOfNow % 180 === 0) {
    noLoop(); //sometimes paused
  }
}

class PiecesOfYou {
  constructor(x, y, w) {
    this.x = -width / 2 + x; //the location
    this.y = -width / 2 + y; //of each element
    this.x1 = this.x; //remembers
    this.y1 = this.y; //its origin
    this.w = w; //sometimes grand, sometimes a grain
    this.mix = random(0.5, 15); //defined
    this.mix2 = random(10, 20); //with colors
    this.c = color(
      red1 * this.mix + random(-20, 20), //red
      green1 * this.mix + random(-20, 20), //green
      blue1 * this.mix + random(-20, 20) //blue
    );
    this.s = color(red1 * this.mix2, green1 * this.mix2, blue1 * this.mix2); //colors of the day, week, life
    this.uniqueness = random(-width / 5, width / 5); //unique in time
    this.a1 = random(-4, 4); //each fragment
    this.b1 = random(-4, 4); //each piece
    this.c1 = random(-4, 4); //each element --- parametric
  }
  beSeen() {
    fill(this.c); //each piece, fragment, element
    stroke(this.s); //becomes
    rect(this.x, this.y, this.w, this.w); //and dances
  }
  translate() {
    let aLittleExtra = 0;
    if (jiggleBool) {
      //sometimes as fire
      aLittleExtra = random(-5, 5) * sin(timeOfNow);
    } else {
      aLittleExtra = 0; //sometimes as water
    }
    this.x =
      this.x1 +
      ((this.a1 * this.w) / 4) * sin(timeOfNow * this.c1) * sin(timeOfNow) +
      this.uniqueness * sin(timeOfNow) * cos(timeOfNow);
    this.y =
      this.y1 +
      ((this.b1 * this.w) / 4) * cos(timeOfNow - this.x) * sin(timeOfNow) +
      this.uniqueness * sin(timeOfNow) * sin(timeOfNow * this.b1) -
      aLittleExtra;
    //on our canvas
  }
}

function mousePressed() {
  loop(); //we awake
  thisOne = -1;
  for (let i = 0; i < pieces.length; i++) {
    //when pieces of us are roused - there is growth
    if (
      mouseX >= width / 2 + pieces[i].x &&
      mouseX <= width / 2 + pieces[i].x + pieces[i].w &&
      mouseY >= width / 2 + pieces[i].y &&
      mouseY <= width / 2 + pieces[i].y + pieces[i].w
    ) {
      thisOne = i;
    }
  }
  if (thisOne != -1) {
    //one becomes many - fractured, yet more
    pieces.push(
      new PiecesOfYou(
        pieces[thisOne].x1 + width / 2,
        pieces[thisOne].y1 + width / 2,
        pieces[thisOne].w / 2
      )
    );
    pieces.push(
      new PiecesOfYou(
        pieces[thisOne].x1 + width / 2 + pieces[thisOne].w / 2,
        pieces[thisOne].y1 + width / 2,
        pieces[thisOne].w / 2
      )
    );
    pieces.push(
      new PiecesOfYou(
        pieces[thisOne].x1 + width / 2,
        pieces[thisOne].y1 + width / 2 + pieces[thisOne].w / 2,
        pieces[thisOne].w / 2
      )
    );
    pieces.push(
      new PiecesOfYou(
        pieces[thisOne].x1 + width / 2 + pieces[thisOne].w / 2,
        pieces[thisOne].y1 + width / 2 + pieces[thisOne].w / 2,
        pieces[thisOne].w / 2
      )
    );
    pieces.splice(thisOne, 1);
  }
}

function keyPressed() {
  if (keyCode === 74) {
    jiggleBool = !jiggleBool;
  }
  if (keyCode === 82) {
    loop();
    setup();
  }
}
