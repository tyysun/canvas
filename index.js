var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var eraserEnabled = false
resetWindow()

window.onresize = function () {
  resetWindow()
}
listionToMouse()


eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions x'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}

function listionToMouse() {
  //按下鼠标
  var using = false
  var lastPoint = { x: undefined, y: undefined }
  canvas.onmousedown = function (e) {
    var x = e.clientX
    var y = e.clientY
    using = true
    if (eraserEnabled) {
      ctx.clearRect(x - 5, y - 5, 10, 10)
    } else {
      var x = e.clientX
      var y = e.clientY
      lastPoint = { x, y }
    }
  }
  //移动鼠标
    canvas.onmousemove = function (e) {
    var x = e.clientX
    var y = e.clientY
    if (using) {
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x, y }
        drawCircle(x, y, 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
  }
  //松开鼠标
  canvas.onmouseup = function (e) {
    using = false
  }
}



function resetWindow() {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}
function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.moveTo(x1, y1)
  ctx.lineWidth = 5
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
}
