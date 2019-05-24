class myScene extends Phaser.Scene {

    constructor (config)
    {
      super(config);
    }

    preload ()
    {
      this.load.plugin('BasePlugin', 'lib/BasePlugin.js', true);
    }

    create ()
    {
      this.sys.install('BasePlugin');
      let plugin = this.plugins.get('BasePlugin');
      plugin.createVideo(this, 'video-1', 400, 100, 'video-1', 'media/spongebob-walk.mp4', 640, 400, true)
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);

game.scene.add('myScene', myScene, true);
