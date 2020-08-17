window.onload = function() {
var classes = ['svg-train', 'svg-val', 'svg-test']
for (var i = 0; i < classes.length; i++) {
  var rects = document.getElementsByClassName(classes[i]);
  for (var j = 0; j < rects.length; j++) {
      rects[j].addEventListener('mouseover', mouseOverEffect);
      rects[j].addEventListener('mouseout', mouseOutEffect);
  }
}

function mouseOverEffect() {
  this.classList.add("svg-hover");
}
function mouseOutEffect() {
  this.classList.remove("svg-hover");
}
}

