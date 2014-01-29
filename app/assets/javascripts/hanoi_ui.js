(function(root) {
	var Hanoi = root.Hanoi = (root.Hanoi || {});

	var TowersUI = Hanoi.TowersUI = function() {
		this.game = new Hanoi.Game();
	};

	TowersUI.prototype.render = function() {
		$(".game").remove();

		for(var i = 0; i < 3; i++) {
			$('body').append("<div class='tower game' id='" + i + "'></div>");
		}

		var disc_ids = ["small", "medium", "large"];
		var disc_heights = ["bottom", "middle", "top"];

		this.game.towers.forEach(function(tower, t_index) {
			tower.forEach(function(disc, d_index) {
				var current_id = disc_ids[disc];
				var div = $('<div>')
				div.addClass('disc game').attr('id', current_id);
				$('#' + t_index).prepend(div);
				$('#' + current_id).addClass(disc_heights[d_index]);
			})
		})
		this.bindClicks();
	};

	TowersUI.prototype.bindClicks = function() {
		$(".tower").on("click", this.handleTowerClicks.bind(this));
	};

	TowersUI.prototype.handleTowerClicks = function(event) {
		console.log("gets here");
		if(this.game.startTowerIdx === null) {
			this.game.startTowerIdx = event.currentTarget.id;
			console.log(this.game.startTowerIdx)
		}
		else {
			console.log("fdslkafjdksfjas");
			this.game.endTowerIdx = event.currentTarget.id;
			this.game.move();
			this.render();
		}
		if (this.game.isWon()) {
			alert("You won!");
			this.gameOverClicks();
		}
	};

	TowersUI.prototype.gameOverClicks = function() {
		$('.tower').off("click");
	}
})(this);

$(document).ready(function() {
	var gameUI = new Hanoi.TowersUI();
	gameUI.render();
});