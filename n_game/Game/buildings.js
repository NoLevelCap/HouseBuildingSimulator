var prooms = [];

function Building(){
  this.content = generateRooms();
}

function generateRooms(){
  var blds = [[]];
  for (var y = 0; y < 10; y++) {
    floor = new Array(10);
    var mx = 0;
    for (var x = 0; x < 10; x++) {
      prm = prooms["Main"];
      if(x % 2 == 0){
          prm = prooms["Long"];
      }
      if(x % 3 == 0 && y > 0){
          prm = prooms["Three_Lower"];
      }
      floor[x] = new Room(prm, x, y, mx);
      mx += prm.width;
    }
    blds[y] = floor;
  }
  return blds;
}

function Room(PreRoom, x, y, mx){
  this.tid = PreRoom.tid;
  this.x = x;
  this.y = y;
  this.Sprite = new Sprite(id[PreRoom.tid + ".png"])
  this.Sprite.position.set(mx, y*PreRoom.height);
  bld_container.addChild(this.Sprite);
}

function PreRoom(tid, fs){
  this.tid = tid;
  this.fs = fs;
  this.width = fs*24;
  this.height = 16;
}

function initPreRooms(){
  prooms["Main"] = new PreRoom("building_0", 1, 1);
  prooms["Long"] = new PreRoom("building_long_0", 2, 1);
  prooms["Three_Upper"] = new PreRoom("building_long_1", 2, 1);
  prooms["Three_Lower"] = new PreRoom("building_long_2", 2, 1);

  prooms["Three_Lower"].upper = prooms["Three_Upper"];
  prooms["Three_Upper"].lower = prooms["Three_Lower"];
}
