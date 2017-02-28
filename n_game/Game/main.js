var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Extras = PIXI.extras;



var stage = new Container(),
    renderer = autoDetectRenderer(256, 144, {resolution: 4, antialias: true});
document.body.appendChild(renderer.view);

var state = mainmenu;

loader.add("Graphics/Buildings.json")
      .load(setup);

function setup(){
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
