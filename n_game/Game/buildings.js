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

      console.log(mx);
      floor[x] = new Room(prm, x, y, mx, 0);
      mx += prm.width;
    }
    blds[y] = floor;
  }
  return blds;
}

function Room(PreRoom, x, y, mx, my){
  this.tid = PreRoom.tid;
  this.x = x;
  this.y = y;
  this.Sprite = new Sprite(id["building_"+PreRoom.tid+".png"])
  this.Sprite.position.set(mx, y*PreRoom.height);
  bld_container.addChild(this.Sprite);
}

function PreRoom(tid, fs, fh){
  this.tid = tid;
  this.fs = fs;
  this.fh = fh;
  this.width = fs*24;
  this.height = fh*16;
}

function initPreRooms(){
  prooms["Main"] = new PreRoom(0, 1, 1);
  prooms["Long"] = new PreRoom(1, 2, 1);
}
