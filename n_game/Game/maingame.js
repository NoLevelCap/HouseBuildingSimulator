
var building, bld_container;

function maingame(){
  initPreRooms();

  bld_container = new Container();
  stage.addChild(bld_container);

  building = new Building();
  state = maingame_play;
}

function maingame_play(){
  for (var roomid in building.content) {
    var room = building.content[roomid];
    //console.log(room.Sprite.texture);
  }
}
