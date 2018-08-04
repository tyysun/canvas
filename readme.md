# canvas画板   

接触canvas,使用canvas制作的一个简洁的画板   

效果地址: https://tyysun.github.io/canvas/index.html

## 主要特点
- 8种颜色供选择，基本满足一般的需求
- 3种粗细的画笔
- 橡皮擦功能
- 下载功能
- 清空画布
- 支持触摸屏和非触摸屏使用

![](https://upload-images.jianshu.io/upload_images/3429455-5a289b8622f3fc48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 核心代码

```
<canvas id="canvas" width="300px" height="300px"></canvas>

//初始化canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//使画板在浏览器内全屏显示
let pageWidth = document.documentElement.clientWidth
let pageHeight = document.documentElement.clientHeight
canvas.width = pageWidth
canvas.height = pageHeight

//设定画布背景色
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//特性检测 判断是否是触摸屏
if (document.body.ontouchstart !== undefined) {
  触摸屏
  }else{
    非触摸屏
  }
触摸屏使用canvas.ontouchstart，canvas.ontouchmove，canvas.ontouchend监测事件
非触摸屏使用canvas.onmousedown，canvas.onmousemove，canvas.onmouseup
//点击鼠标
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
 
//画圆函数
function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.fillStyle
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
//画线函数
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

```

