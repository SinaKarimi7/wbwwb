Game.addToManifest({
	
	logo: "sprites/postcredits/logo.png",
	
	facebook: "sprites/postcredits/facebook.png",
	twitter: "sprites/postcredits/twitter.png",

	end_button: "sprites/postcredits/end_button.json"

});

function Scene_Post_Post_Credits(){
	
	var self = this;
	Scene.call(self);

	self.UNPAUSEABLE = true; // HACK.

	// Layers, yo.
	Game.stage.addChild(MakeSprite("blackout"));
	var cont = new PIXI.Container();
	Game.stage.addChild(cont);
	cont.visible = false;
	cont.addChild(MakeSprite("logo"));

	// _addButton
	var isHovering = false;
	var _addButton = function(x, y, labelFrame, callback){

		var button = new PIXI.Container();
		button.x = x;
		button.y = y; //325;
		cont.addChild(button);

		var bg = MakeMovieClip("end_button");
		bg.anchor.x = bg.anchor.y = 0.5;
		button.addChild(bg);

		var label = MakeMovieClip("end_button");
		label.anchor.x = label.anchor.y = 0.5;
		label.gotoAndStop(labelFrame);
		button.addChild(label);

		// INTERACTIVITY!
		button.interactive = true;
		button.mouseover = button.touchstart = function(){
			isHovering = true;
			bg.gotoAndStop(1);
			Tween_get(button.scale).to({x:1.05, y:1.05}, _s(0.2));
		};
		button.mouseout = function(){
			isHovering = false;
			bg.gotoAndStop(0);
			Tween_get(button.scale).to({x:1, y:1}, _s(0.2));
		};
		button.mousedown = button.touchend = function(){
			isHovering = false;
			Game.sounds.squeak.play();
			callback();
		};

	};
	_addButton(250, 225, 2, function(){
		window.open("http://ncase.me");
	});
	_addButton(480, 225, 3, function(){
		window.open("https://www.patreon.com/ncase");
	});
	_addButton(710, 225, 4, function(){
		Game.sceneManager.gotoScene("Quote");
	});
	_addButton(365, 325, 5, function(){
		window.open("https://hamed.github.io/fa/categories/%D8%B4%D8%B1%D8%AD-%D9%82%D8%A7%D8%A8%D9%84-%D8%A7%DA%A9%D8%AA%D8%B4%D8%A7%D9%81/");
	});
	_addButton(605, 325, 6, function(){
		window.open("https://www.paypal.com/paypalme/allaei");	
	});

	// _addSocialButton
	var _addSocialButton = function(x, icon, callback){

		var button = MakeSprite(icon);
		button.x = x;
		button.y = 419;
		button.anchor.x = button.anchor.y = 0.5;
		cont.addChild(button);

		// INTERACTIVITY!
		button.interactive = true;
		button.mouseover = button.touchstart = function(){
			isHovering = true;
			Tween_get(button.scale).to({x:1.2, y:1.2}, _s(0.2));
		};
		button.mouseout = function(){
			isHovering = false;
			Tween_get(button.scale).to({x:1, y:1}, _s(0.2));
		};
		button.mousedown = button.touchend = function(){
			isHovering = false;
			Game.sounds.squeak.play();
			callback();
		};

	};
	var text = encodeURIComponent(window.SHARE_TEXT);
	var url = encodeURIComponent(window.SHARE_URL);
	_addSocialButton(Game.width/2 - 38, "facebook", function(){
		var href = "https://www.facebook.com/sharer/sharer.php?u="+url+"&t="+text;
		window.open(href);
	});
	_addSocialButton(Game.width/2 + 13, "twitter", function(){
		var href = "https://twitter.com/intent/tweet?text="+text+"%0a"+url;
		//var href = "https://twitter.com/intent/tweet?text="+text+"%20"+url+"&via=ncasenmare";
		window.open(href);
	});

	// CURSOR
    var cursor = new Cursor(self);
    var g = cursor.graphics;
    cont.addChild(g);
    g.scale.x = g.scale.y = 0.5;
    g.x = Game.width/2;
    g.y = Game.height/2;

	// TWEEN ANIM
	Tween_get(cont)
	.wait(_s(BEAT*2))
	.call(function(){
		cont.visible = true;
	});

	// Update!
	self.update = function(){
		cursor.update(isHovering);
	}

}
