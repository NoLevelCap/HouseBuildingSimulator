var prooms = [];
var pblocks = [];
var a = 20;

function Building(){
  this.content = generateRooms(generateBase());
}

function generateBase(){
  var blds = [[]];
  for (var y = 0; y < a; y++) {
    floor = new Array(a);
    for (var x = 0; x < a; x++) {
      var block = prooms[0].homeblock;
      floor[x] = new Sprite(id[block.tid]);
      floor[x].block = block;
      floor[x].position.set(x*24, y*16);
      floor[x].isBase = true;
      bld_container.addChild(floor[x]);
    }
    blds[y] = floor;
  }
  return blds;
}

function generateRooms(bldng){
  new Room(prooms["intro"], 0, 0, bldng);



  /*for (var x = 0; x < a; x++) {
    for (var y = 0; y < a; y++) {
      if(bldng[y][x].isBase){
        //console.log(bldng[y][x].isBase);
        prm = prooms["intro"];
        newRoom = new Room(prm, x, y, bldng);
      }
    }
  }*/
  //console.log(bldng);

  /*
  am = 12;
  for (var i = 0; i < 12; i++) {
    x = Math.Round(Math.random() * a);
    y = Math.Round(Math.random() * a);
      if(bldng[y][x].isBase){
        //console.log(bldng[y][x].isBase);
        prm = prooms["Main"];
        newRoom = new Room(prm, x, y, bldng);
  }
  console.log(bldng);
  */

  return bldng;
}

function Room(PreRoom, x, y, bldng){
  this.x = x;
  this.y = y;
  this.block = PreRoom.homeblock;
  this.preroom = PreRoom;
  this.roomimage = [];
  this.initSprites = function(bldng){
    rid = 0;
    answer = this.checkComplete(this.block, rid, this.x, this.y, bldng);
    //console.log(answer);

    for (var z in this.roomimage) {
      if (this.roomimage.hasOwnProperty(z)) {
        this.resetBlock(this.roomimage[z].block);
      }
    }

    this.roomimage = [];
    rid = 0;

    if(answer){

      this.addBlock(this.block, rid, this.x, this.y, bldng);

      for (var z in this.roomimage) {
        if (this.roomimage.hasOwnProperty(z)) {
          this.resetBlock(this.roomimage[z].block);
        }
      }
    }
  };

  this.addBlock = function(block, rid, x, y, bldng){
    if(x >= 0 && x < a && y >= 0 && y < a){
      if(bldng[y][x].isBase){
        bldng[y][x].texture = id[block.tid];
        bldng[y][x].block = block;
        bldng[y][x].isBase = block.isBase;
        this.roomimage[rid] = bldng[y][x];
        //console.log(this.roomimage[rid]);
        block.submitted = true;
        rid++;

        this.checkUp(block, rid, x, y, bldng);
        this.checkRight(block, rid, x, y, bldng);
        this.checkLeft(block, rid, x, y, bldng);
        this.checkDown(block, rid, x, y, bldng);
      }
    }
  }

    this.checkComplete = function(block, rid, x, y, bldng){
      answer = true;
      block.submitted = true;
      this.roomimage[rid] = block;
      this.roomimage[rid].block = block;
      rid++;
      if(x >= 0 && x < a && y >= 0 && y < a){
        if(bldng[y][x].isBase){

          if(block.up != -1){
            if(!block.up.submitted){
              if(!this.checkComplete(block.up, rid, x, y-1, bldng)){
                answer = false;
              }
            }
          }

          if(block.right != -1){
            if(!block.right.submitted){
              if(!this.checkComplete(block.right, rid, x+1, y, bldng)){
                answer = false;
              }
            }
          }

          if(block.down != -1){
            if(!block.down.submitted){
              if(!this.checkComplete(block.down,  rid, x, y+1, bldng)){
                answer = false;
              }
            }
          }

          if(block.left != -1){
            if(!block.left.submitted){
              if(!this.checkComplete(block.left,  rid, x-1, y, bldng)){
                answer = false;
              }
            }
          }

          //console.log(x + "/" + y + "fine");

        } else {
          //console.log(block + "occupado");
          answer = false;
        }
      }  else {
        //console.log(block + " offscreen " + x + "/" + y);
        answer = false;
      }

      return answer;
    }

  this.checkUp = function(block, rid, x, y, bldng){
    if(block.up != -1){
      if(!block.up.submitted){
        this.addBlock(block.up, rid, x, y-1, bldng);
      }
    }
  }

  this.checkRight = function(block, rid, x, y, bldng){
    if(block.right != -1){
      if(!block.right.submitted){
        this.addBlock(block.right, rid, x+1, y, bldng);
      }
    }
  }

  this.checkLeft = function(block, rid, x, y, bldng){
    if(block.left != -1){
      if(!block.left.submitted){
        this.addBlock(block.left, rid, x-1, y, bldng);
      }
    }
  }

  this.checkDown = function(block, rid, x, y, bldng){
    if(block.down != -1){
      if(!block.down.submitted){
        this.addBlock(block.down, rid, x, y+1, bldng);
      }
    }
  }

  this.resetBlock = function resetBlock(block){
    block.submitted = false;
  }

  this.initSprites(bldng);
  //up, left, right, down
}

function Block(b, preroom){
  this.block = blocks[b];
  preroom.addBlock(this.block);
  this.tid = this.block.tid + ".png";
  this.width = this.block.width;
  this.height = this.block.height;
  this.ldoor = this.block.ldoor;
  this.rdoor = this.block.rdoor;
  this.inopening = this.block.innerOpening;
  this.submitted = this.block.submitted;
  this.isBase = this.block.isBase;


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
  if(this.block.up!=-1){preroom.cy++; this.setUp(new Block(this.block.up, preroom)); preroom.cy--;}else{this.up = this.block.up};
  if(this.block.right!=-1){preroom.cx++; this.setRight(new Block(this.block.right, preroom)); preroom.cx--;}else{this.right = this.block.right};
  if(this.block.left!=-1){preroom.cx--; this.setLeft(new Block(this.block.left, preroom)); preroom.cx++;}else{this.left = this.block.left};
  if(this.block.down!=-1){preroom.cy--; this.setDown(new Block(this.block.down, preroom)); preroom.cy++;}else{this.down = this.block.down};

  this.setRightDoor = function(){
    this.rdoor = true;
  }
  this.setLeftDoor = function(){
    this.ldoor = true;
  }

  this.setInnerOpenings = function(openings){
    this.inopening = openings;
  }
  console.log(this);
}

function blockData(x, y, block){
  this.x = x;
  this.y = y;
  this.block = block;
}



function PreRoom(homeblock){
  this.width = 24; //define propper bounds
  this.height = 16; //define proper bounds
  this.cx = 0;
  this.cy = 0;
  this.blocks = [];
  //add a check to see if there is a homeblock, flag an error otherwise.

  this.addBlock = function(block){
    this.blocks.push(new blockData(this.cx, this.cy, block))
  }

  this.homeblock = new Block(homeblock, this);

  this.findDoors = function(){
    doors = [];
    for (var i = 0; i < this.blocks.length; i++) {
      if(this.blocks[i].block.ldoor){
        doors.push(new Vector2(this.blocks[i].x-1, this.blocks[i].y));

      }
      if(this.blocks[i].block.rdoor){
        doors.push(new Vector2(this.blocks[i].x+1, this.blocks[i].y));
      }
    }
    console.log(doors);
    return 0;
  }

  this.doorposition = this.findDoors();
  console.log(this);
}

function initPreRooms(){
  initBlocks();

  //prooms[1] = new PreRoom(pblocks["basic"]);
  prooms[0] = new PreRoom("base");
  prooms["intro"] = new PreRoom("intro");
  //prooms["intro"]= new PreRoom(pblocks["intro"]);
}

function initBlocks(){
  // for (var blid in blocks) {
  //   if (blocks.hasOwnProperty(blid)) {
  //     block = blocks[blid];
  //     pblocks[block.name] = new Block(block);
  //   }
  // }
  /*pblocks["basic"] = new Block("rms_0");
  pblocks["base"] = new Block("rms_1");
  pblocks["base"].isBase = true;

  pblocks["intro"] = new Block("rms_2");
  pblocks["intro"].setRight(new Block("rms_3"));*/
}

function loadBlocks(){
}
