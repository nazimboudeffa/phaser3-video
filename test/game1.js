class VideoPlugin extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);
    }

    createVideo (scene, id, x, y, texture, file, width, height, loop)
    {
      /* set texture pointer to new canvas. */
    	scene.textures.createCanvas(texture, width, height);
    	Phaser.GameObjects.Image.call(this, scene, x, y, texture);

    	/* gameobject data. */
    	this.id = id;
    	this.x = x;
    	this.y = y;
    	this.width = width;
    	this.height = height;

    	/* video data. */
    	this.loaded = false;
    	this.loop = false;

    	if (loop)
    		this.loop=true;

    	/* create video as html5 video element. */
    	this.video = document.createElement('video');
    	this.video.muted = true;
    	this.video.src = file;

    	/* laziness - should use .call(this, ...) */
    	var _this = this;

    	/* hook video event listener into animation. */
    	this.video.addEventListener('loadeddata', function() {
    		this.play();
    		_this.texture.context.drawImage(this, 0, 0);
    		_this.texture.refresh();
    		_this.loaded = true;
    	});

    	/* loop by playing on 'end' event listener. */
    	if (this.loop) {
    		this.video.addEventListener('ended', function() {
    			this.play();
    		});
    	}

      scene.add.existing(this);
      return this;

    }
}

const config = {
    type:Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

function preload ()
{
    this.load.plugin('myVideoPlugin', VideoPlugin, true);
}

function create ()
{
    let plugin = this.plugins.get('myVideoPlugin');
    plugin.createVideo(this, 'video-1', 400, 100, 'video-1', 'media/spongebob-walk.mp4', 640, 400, true);
}
