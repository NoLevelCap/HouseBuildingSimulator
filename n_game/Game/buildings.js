var prooms = [];
var pblocks = [];

function Building(){
  this.content = generateRooms();
}

function generateRooms(){
  var blds = [[]];
  for (var y = 0; y < 10; y++) {
    floor = new Array(10);
    var mx = 0;
    for (var x = 0; x < 10; x++) {
    /*  prm = prooms["Main"];
      if(x % 2 == 0){
          prm = prooms["Long"];
      }
      if(x % 3 == 0 && y > 0){
          prm = prooms["Three_Lower"];
      }
      floor[x] = new Room(prm, x, y, mx);
      mx += prm.width;*/
      prm = prooms["Main"];
      floor[x] = new Room(prm, x, y, mx);
      mx += prm.width;
    }
    blds[y] = floor;
  }
  return blds;
}

function Room(PreRoom, x, y, mx){
  this.room = new Container();
  this.x = x;
  this.y = y;
  this.mx = mx;
  this.blocks = PreRoom.blocks;
  this.preroom = PreRoom;
  this.roomimage = [];
  this.initSprites = new function(){
    for (var room in this.blocks) {
      if (this.blocks.hasOwnProperty(room)) {
        console.log(room);
        //  this.roomimage[room] = new Sprite(id[tid + ".png"])
      }
    }
  };

  this.initSprites();
  //up, left, right, down
}

function Block(tid){
  this.tid = tid;
  this.width = 24;
  this.height = 16;
  this.up = -1;
  this.down = -1;
  this.right = -1;
  this.bottom = -1;

  this.setContainer = new function(container){
    //container.addChild(this.sprite);
  };
}

function PreRoom(blocks){
  this.blocks = blocks;
}

function initPreRooms(){
  initBlocks();

  prooms["Main"] = new PreRoom([pblocks["single"]]);
  //prooms["Long"] = new PreRoom("building_long_0", 2, 1);
  //prooms["Three_Upper"] = new PreRoom("building_long_1", 2, 1);
  //prooms["Three_Lower"] = new PreRoom("building_long_2", 2, 1);

  //prooms["Three_Lower"].upper = prooms["Three_Upper"];
  //prooms["Three_Upper"].lower = prooms["Three_Lower"];
}

function initBlocks(){
  pblocks["single"] = new Block("building_0");
}
