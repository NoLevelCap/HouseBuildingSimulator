

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Extras = PIXI.extras;



var stage = new Container(),
    renderer = autoDetectRenderer(256, 144, {resolution: 4, antialias: false});
document.body.appendChild(renderer.view);
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var state = mainmenu;
var id;

loader.add("Graphics/Buildings.json")
      .load(setup);



function setup(){
  id = resources["Graphics/Buildings.json"].textures;

  gameloop();
}

function gameloop(){
  requestAnimationFrame(gameloop);
  state();
  renderer.render(stage);
}

function mainmenu(){
  state = maingame;
}
