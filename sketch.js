const speed = 100
const lineWidth = 5
let maxLineHeight

let elements = []
let lines

function setup() {
  maxLineHeight = window.windowHeight - 300
  createCanvas(window.windowWidth - 20, maxLineHeight)
  reset()
}

function reset() {
  selectionAlreadySortedIdx = -1

  lines = floor(width / lineWidth)


  fetch(`https://api.noopschallenge.com/hexbot?width=1&height=${maxLineHeight}&count=${lines}`)
    .then(resp => {
      return resp.json()
    })
    .then(resp => {
      for(elem of resp.colors) {
        console.log(elem)
        elements.push(elem)
      }
      loop()
    })
}

function draw() {
  background(51)
  stroke(0)
  strokeWeight(1)

  for (var i = 0; i < elements.length; i++) {
    fill(elements[i].value)
    rect(i * lineWidth, height, lineWidth, -elements[i].coordinates.y)
  }

  for (var i = 0; i < speed; i++) {
    bubbleSort()
  }
}

function bubbleSort() {
  for (var i = 0; i < elements.length - 1; i++) {
    if (elements[i].coordinates.y > elements[i + 1].coordinates.y) {
      swap(i, i + 1)
      return
    }
  }

  noLoop()
}

function swap(i, j) {
  var tmp = elements[i]
  elements[i] = elements[j]
  elements[j] = tmp
}
