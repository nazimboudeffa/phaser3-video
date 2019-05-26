/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2018 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser3-plugin-template/blob/master/LICENSE|MIT License}
*/

var BasePlugin = function (scene)
{
    //  The Scene that owns this plugin
    this.scene = scene;

    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted)
    {
        scene.sys.events.once('boot', this.boot, this);
    }
};

//  Static function called by the PluginFile Loader.
BasePlugin.register = function (PluginManager)
{
    //  Register this plugin with the PluginManager, so it can be added to Scenes.

    //  The first argument is the name this plugin will be known as in the PluginManager. It should not conflict with already registered plugins.
    //  The second argument is a reference to the plugin object, which will be instantiated by the PluginManager when the Scene boots.
    //  The third argument is the local mapping. This will make the plugin available under `this.sys.base` and also `this.base` from a Scene if
    //  it has an entry in the InjectionMap.
    PluginManager.register('BasePlugin', BasePlugin, 'base');
};

BasePlugin.prototype = {

    //  Called when the Plugin is booted by the PluginManager.
    //  If you need to reference other systems in the Scene (like the Loader or DisplayList) then set-up those references now, not in the constructor.
    boot: function ()
    {
    },

    //  A test method.
    test: function (name)
    {
    },

    createVideo: function(scene, id, x, y, texture, file, width, height, loop){
      /* set texture pointer to new canvas. */
      scene.textures.createCanvas(texture, width, height);
      Phaser.GameObjects.Image.call(this, scene, x, y, texture);

      /* gameobject data. */
      this.id=id;
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;

      /* video data. */
      this.loaded=false;
      this.loop=false;
      if (loop)
        this.loop=true;

      /* create video as html5 video element. */
      this.video=document.createElement('video');
      this.video.muted=true;
      this.video.src=file;

      /* laziness - should use .call(this, ...) */
      var _this=this;

      /* hook video event listener into animation. */
      this.video.addEventListener('loadeddata', function() {
        this.play();
        _this.texture.context.drawImage(this, 0, 0);
        _this.texture.refresh();
        _this.loaded=true;
      });
      /* loop by playing on 'end' event listener. */
      if (this.loop) {
        this.video.addEventListener('ended', function() {
          this.play();
        });
      }

      //scene.add.existing(this);
    },

    //  Called when a Scene is started by the SceneManager. The Scene is now active, visible and running.
    start: function ()
    {
    },

    //  Called every Scene step - phase 1
    preUpdate: function (time, delta)
    {
    },

    //  Called every Scene step - phase 2
    update: function (time, delta)
    {
      /* phaser's update call. */
      if (this.loaded) {
        this.texture.context.drawImage(this.video, 0, 0);
        /* beware of refresh and issues with overloading the GPU  - need more research here. */
        this.texture.refresh();
        //this.texture.update();
      }
    },

    //  Called every Scene step - phase 3
    postUpdate: function (time, delta)
    {
    },

    //  Called when a Scene is paused. A paused scene doesn't have its Step run, but still renders.
    pause: function ()
    {
    },

    //  Called when a Scene is resumed from a paused state.
    resume: function ()
    {
    },

    //  Called when a Scene is put to sleep. A sleeping scene doesn't update or render, but isn't destroyed or shutdown. preUpdate events still fire.
    sleep: function ()
    {
    },

    //  Called when a Scene is woken from a sleeping state.
    wake: function ()
    {
    },

    //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function ()
    {
    },

    //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
    destroy: function ()
    {
        this.shutdown();

        this.scene = undefined;
    }

};

BasePlugin.prototype.constructor = BasePlugin;

//  Make sure you export the plugin for webpack to expose

module.exports = BasePlugin;
