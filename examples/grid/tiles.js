var po = org.polymaps;

var div = document.getElementById("map"),
    svg = div.appendChild(po.svg("svg")),
    g = svg.appendChild(po.svg("g"));

var map = po.map()
    .container(g)
    .angle(.3)
    .add(po.interact());

resize();

var tiles = po.layer(grid)
    .size({x: 128, y: 128});

map.add(tiles);

var rect = g.appendChild(po.svg("rect"));
rect.setAttribute("width", "50%");
rect.setAttribute("height", "50%");

function resize() {
  var x = div.clientWidth / 2,
      y = div.clientHeight / 2;
  g.setAttribute("transform", "translate(" + (x / 2) + "," + (y / 2) + ")");
  map.size({x: x, y: y});
}

function grid(tile) {
  var g = tile.element = po.svg("g");

  var rect = g.appendChild(po.svg("rect")),
      size = tiles.size();
  rect.setAttribute("width", size.x);
  rect.setAttribute("height", size.y);

  var text = g.appendChild(po.svg("text"));
  text.setAttribute("x", 6);
  text.setAttribute("y", 6);
  text.setAttribute("dy", ".71em");
  text.appendChild(document.createTextNode(tile.key));
}

var spin = 0;
setInterval(function() {
  if (spin) map.angle(map.angle() + spin);
}, 30);

function key(e) {
  switch (e.keyCode) {
    case 65: spin = e.type == "keydown" ? -.004 : 0; break;
    case 68: spin = e.type == "keydown" ? .004 : 0; break;
  }
}

window.addEventListener("keydown", key, true);
window.addEventListener("keyup", key, true);
window.addEventListener("resize", resize, false);