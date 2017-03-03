var prooms = [];
var pblocks = [];

function Building(){
  this.content = generateRooms();
}

function generateRooms(){
  var blds = [[]];
  a = 1;
  for (var y = 0; y < a; y++) {
    floor = new Array(a);
    var mx = 0;
    for (var x = 0; x < a; x++) {
      floor[x] = new Sprite(id["building_empty"]);
      floor[x].position.set(x*24, y*16);
    }
    blds[y] = floor;
  }
  return blds;
}

function Room(PreRoom, x, y, mx){
  this.x = x;
  this.y = y;
  this.mx = mx;
  this.block = PreRoom.homeblock;
  this.preroom = PreRoom;
  this.roomimage = [];
  this.room.position.set(mx, y*16); //thisneeds to be in the original position
  this.initSprites = function(){
    rid = 0;
    this.addBlock(this.block, rid, 0, 0);

    for (var z in this.roomimage) {
      if (this.roomimage.hasOwnProperty(z)) {
        this.resetBlock(this.roomimage[z].block);
      }
    }

    /*otherroom = false;
    do{
      cr = this.block; // current room
      this.roomimage[rid] = new Sprite(id[cr.tid + ".png"]);
      this.room.addChild(this.roomimage[rid]);

      //workout a treelike system for room manipulation;
    } while(otherroom);*/


  };

  this.addBlock = function addBlock(block, rid, x, y){
    this.roomimage[rid] = new Sprite(id[block.tid + ".png"]);
    this.roomimage[rid].position.set(x*24, y*16);
    this.roomimage[rid].block = block;
    block.submitted = true;
    rid++;

    this.checkUp(block, rid, x, y);
    this.checkRight(block, rid, x, y);
    this.checkLeft(block, rid, x, y);
    this.checkDown(block, rid, x, y);
  }

  this.checkUp = function(block, rid, x, y){
    //console.log("up: " + x + "/" + y + "; " + block.up);
    if(block.up != -1){
      if(!block.up.submitted){
        this.addBlock(block.up, rid, x, y-1);
      }
    }
  }

  this.checkRight = function(block, rid, x, y){
    //console.log("right: " + x + "/" + y + "; " + block.right);
    if(block.right != -1){
      if(!block.right.submitted){
        this.addBlock(block.right, rid, x+1, y);
      }
    }
  }

  this.checkLeft = function(block, rid, x, y){
    //console.log("left: " + x + "/" + y+ "; " + block.left);
    if(block.left != -1){
      if(!block.left.submitted){
        this.addBlock(block.left, rid, x-1, y);
      }
    }
  }

  this.checkDown = function(block, rid, x, y){
    //console.log("down: " + x + "/" + y+ "; " + block.down);
    if(block.down != -1){
      if(!block.down.submitted){
        this.addBlock(block.down, rid, x, y+1);
      }
    }
  }

  this.resetBlock = function resetBlock(block){
    block.submitted = false;
  }

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
  this.left = -1;
  this.submitted = false;

  this.setContainer = function(container){
    container.addChild(this.sprite);
  };

  this.setUp = function(room){
    room.down = this;
    this.up = room;
  }

  this.setDown = function(room){
    room.up = this;
    this.down = room;
  }

  this.setLeft = function(room){
    room.right = this;
    this.left = room;
  }

  this.setRight = function(room){
    room.left = this;
    this.right = room;
  }
}

function PreRoom(homeblock){
  this.homeblock = homeblock;
  this.width = 24; //define propper bounds
  this.height = 16; //define proper bounds
  //add a check to see if there is a homeblock, flag an error otherwise.
}

function initPreRooms(){
  initBlocks();

  prooms["Main"] = new PreRoom(pblocks["single"]);
  //prooms["Long"] = new PreRoom("building_long_0", 2, 1);
  //prooms["Three_Upper"] = new PreRoom("building_long_1", 2, 1);
  //prooms["Three_Lower"] = new PreRoom("building_long_2", 2, 1);

  //prooms["Three_Lower"].upper = prooms["Three_Upper"];
  //prooms["Three_Upper"].lower = prooms["Three_Lower"];
}

function initBlocks(){
  pblocks["single"] = new Block("building_0");
  pblocks["oneabove"] = new Block("building_1");
  pblocks["new"] = new Block("building_2");
  pblocks["r"] = new Block("building_1");
  pblocks["rd"] = new Block("building_3");
  pblocks["rdr"] = new Block("building_4");
  pblocks["single"].setUp(pblocks["oneabove"]);
  pblocks["oneabove"].setUp(pblocks["new"]);
  pblocks["new"].setRight(pblocks["r"]);
  pblocks["r"].setDown(pblocks["rd"]);
  pblocks["single"].setLeft(pblocks["rdr"]);
}
