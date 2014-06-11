'use strict';

var ProsView = Backbone.View.extend({
	prosTemplate: _.template($('.pros-template').text()),

	events: {
		"click .con-button" 	: "moveToCons",
		"click .neutral-button"	: "moveToNeutrals",
		"click .delete-button"	: "destroy"
	},

	initialize: function() {
		this.listenTo(this.model, 'add change', this.render);

		$('.pros').append(this.el);

		this.render();
	},

	render: function() {
		var prosRendered = this.prosTemplate(this.model.attributes);
		this.$el.html(prosRendered);
	},

	moveToCons: function() {
		var objModel = consCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new ConsView({model: objModel});
	},

	moveToNeutrals: function() {
		var objModel = neutralsCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new NeutralsView({model: objModel});
	},

	destroy: function() {
		this.model.destroy();
		this.remove();
	}
});