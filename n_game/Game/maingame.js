
var building;

function maingame(){
  building = new Building();
  state = maingame_play;
}

function maingame_play(){
  for (var roomid in building.content) {
    var room = building.content[room];
    room.render();
  }
}
