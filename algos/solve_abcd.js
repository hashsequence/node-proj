function Tuple() {
  this.ele = arguments;
}

Tuple.prototype.get = function()
{
  var res = []
  for (var i in this.ele)
  {
    res.push(this.ele[i]);
  }
  return res;
}

function solve_abcd(a,b) {
var map = {
  pair1 : {},
  pair2 : {}
};

var display = [];
for (var a = 1; a <= 10; a++)
{
  for (var b = 1; b <= 10; b++) {
    if (map.pair1[a*a + b*b] === undefined)
    {
      map.pair1[a*a + b*b] = [];
    }
    map.pair1[a*a + b*b].push(new Tuple(a,b));
  }
}

for (var a = 1; a <= 10; a++)
{
  for (var b = 1; b <= 10; b++) {
    if (map.pair2[a*a + b*b] === undefined)
    {
      map.pair2[a*a + b*b] = [];
    }
    map.pair2[a*a + b*b].push(new Tuple(a,b));
  }
}

console.log("done iterating");
for (var result in map.pair1) {
  for (var i = 0; i < map.pair1[result].length; i++) {
    for (var j = 0; j < map.pair1[result].length; j++) {
    display.push([].concat(map.pair1[result][i].get(), map.pair1[result][j].get()));
    }
  }
}


console.log(display);
}

solve_abcd();
