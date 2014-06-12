'use strict';

var ConsView = Backbone.View.extend({
	consTemplate: _.template($('.cons-template').text()),

	events: {
		"click .pro-button" 	: "moveToPros",
		"click .neutral-button"	: "moveToNeutrals",
		"click .delete-button"	: "destroy"
	},

	initialize: function() {
		this.listenTo(this.model, 'add change', this.render);

		$('.cons').append(this.el);

		this.render();
	},

	render: function() {
		var consRendered = this.consTemplate(this.model.attributes);
		this.$el.html(consRendered);
		return this;
	},

	moveToPros: function() {
		var objModel = prosCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new ProsView({model: objModel});
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