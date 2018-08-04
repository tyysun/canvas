 


  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let eraserEnabled = false


  resetWindow()
 
  window.onresize = function () {
    resetWindow()
  }

  setCanvasBg();
  


  eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
  }
  pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
  }
  clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCanvasBg();
  }
  download.onclick = function () {
    var name = prompt('输入图片名称');
    if (name) {
      let imgData = canvas.toDataURL();
      let a = document.createElement('a');
      a.href = imgData;
      a.download = name;
      a.click();
    }
  }

  function setCanvasBg() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    // console.log(ctx.fillStyle)
}
  function listionToUser() {
    //按下鼠标
    let using = false
    let lastPoint = { x: undefined, y: undefined }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
      //触屏
      canvas.ontouchstart = function (e) {

        

        var x = e.touches[0].clientX
        var y = e.touches[0].clientY
        using = true
        if (eraserEnabled) {
          ctx.clearRect(x - 5, y - 5, 10, 10)
        } else {

          lastPoint = { x, y }
        }
      }
      canvas.ontouchmove = function (e) {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (using) {
          if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
          } else {
            var newPoint = { x, y }
            drawCircle(x, y, penwidth / 2)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        }
      }
      canvas.ontouchend = function (e) {
        using = false
      }
    } else {
      //非触屏
      canvas.onmousedown = function (e) {
        let x = e.clientX
        let y = e.clientY
        
        using = true
        if (eraserEnabled) {
          ctx.clearRect(x - 5, y - 5, 20, 20)
        } else {

          lastPoint = { x, y }
        }
      }
      //移动鼠标
      canvas.onmousemove = function (e) {
        let x = e.clientX
        let y = e.clientY
        if (using) {
          if (eraserEnabled) {
            ctx.clearRect(x - 5, y - 5, 10, 10)
          } else {
            let newPoint = { x, y }
            drawCircle(x, y, penwidth / 2)
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

  }

  //选择颜色
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  var pencolor = ["#000000", "#FF0033", "#81D8D0", "#330072", "#E20074", "#367C2B", "#FFDE00", "#BF5700"]
  let colorlis = document.querySelectorAll(".color");
  for (let i = 0; i < colorlis.length; i++) {
    colorlis[i].style.background = pencolor[i]
    colorlis[i].onclick = function () {
      ctx.fillStyle = pencolor[i]
      ctx.strokeStyle = pencolor[i]
      for (let i = 0; i < colorlis.length; i++) {
        colorlis[i].classList.remove('active')
      }
      this.classList.add('active')
    }

  }
  ctx.lineWidth = 10
  let penwidth 
  let pensize = ["10px", "15px", "20px"]
  let ps = [10, 15, 20]
  let lis = document.querySelectorAll(".size");

  for (let i = 0; i < lis.length; i++) {

    lis[i].style.width = pensize[i]
    lis[i].style.height = pensize[i]
   
    lis[i].onclick = function () {
      ctx.lineWidth = ps[i]
       penwidth = ctx.lineWidth
      
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.remove('active')
      }
      this.classList.add('active')
    }

  }
  listionToUser()
  function resetWindow() {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
  function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.fillStyle
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.strokeStyle 
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x1, y1)
    ctx.lineWidth = penwidth;  
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }


 
 
