
var building, bld_container;

function maingame(){
  initPreRooms();

  bld_container = new Container();
  stage.addChild(bld_container);
  //bld_container.position.set(25, 50);

  building = new Building();
  state = maingame_play;
}

function maingame_play(){
  for (var roomid in building.content) {
    var room = building.content[roomid];
    //console.log(room.Sprite.texture);
  }
}
