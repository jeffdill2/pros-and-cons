'use strict';

var NeutralsView = Backbone.View.extend({
	neutralsTemplate: _.template($('.neutrals-template').text()),

	events: {
		"click .pro-button" 	: "moveToPros",
		"click .con-button"		: "moveToCons",
		"click .delete-button"	: "destroy"
	},

	initialize: function() {
		this.listenTo(this.model, 'add change', this.render);

		$('.neutrals').append(this.el);

		this.render();
	},

	render: function() {
		var neutralsRendered = this.neutralsTemplate(this.model.attributes);
		this.$el.html(neutralsRendered);
		return this;
	},

	moveToPros: function() {
		var objModel = prosCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new ProsView({model: objModel});
	},

	moveToCons: function() {
		var objModel = consCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new ConsView({model: objModel});
	},

	destroy: function() {
		this.model.destroy();
		this.remove();
	}
});