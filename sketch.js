let streams = []
let letterSize = 20
let fadeInterval = 1.6
let letter

function setup() {
  createCanvas(
      window.innerWidth,
      window.innerHeight
  );

  background(0)

  let x = 0
  for(let i = 0; i <= width / letterSize; i++) {
    let stream = new Stream()
    stream.generateLetters(x, random(-2000, 0))
    streams.push(stream)
    x += letterSize
  }
  textSize(letterSize)
}

function draw() {
  background(0, 150)
  streams.forEach(function(stream) {
    stream.render()
  })
}



class Letter {
  constructor(x, y, speed, first, opacity) {
    this.x = x
    this.y = y
    this.value = undefined

    this.speed = speed
    this.first = first
    this.opacity = opacity

    this.switchInterval = round(random(2, 20))
  }

  setToRandomLetter() {
    let charType = round(random(0, 5))
    if (frameCount % this.switchInterval == 0){
      if (charType > 1) {
        this.value = String.fromCharCode(0x30A0 + round(random(0, 96)))
      } else {
        this.value = floor(random(0, 10))
      }
    }
  }

  rain() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed
  }
}


class Stream {
  constructor() {
    this.symbols = []
    this.totalSymbols = round(random(5, 30))
    this.speed = random(3, 7)
  }

  generateLetters(x, y) {
    let opacity = 255
    let first = round(random(0, 4)) == 1
    for (let i = 0; i <= this.totalSymbols; i++) {
      letter = new Letter(x, y, this.speed, first, opacity)
      letter.setToRandomLetter()
      this.symbols.push(letter)
      opacity -= (255 / this.totalSymbols) /fadeInterval
      y -= letterSize
      first = false
    }
  }

  render() {
    this.symbols.forEach(function(letter) {
      if (letter.first) {
        fill(57, 255, 180, letter.opacity)
      } else {
        fill(0, 170, 70, letter.opacity)
      }
      text(letter.value, letter.x, letter.y)
      letter.rain()
      letter.setToRandomLetter()
    })
  }
}
