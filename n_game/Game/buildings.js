function Building(){
  this.content = generateRooms();
}

function generateRooms(){
  return [new Room(0, 0, 0), new Room(1, 1, 0)];
}

function Room(tid, x, y){
  this.tid = tid;
  this.x = x;
  this.y = y;
  this.Sprite;

  this.render = new function(){

  }
}
