'use strict';

var ArgumentView = Backbone.View.extend({
	events: {
		"click .pro-button"		: "moveToPros",
		"click .con-button" 	: "moveToCons",
		"click .neutral-button"	: "moveToNeutrals",
		"click .delete-button"	: "destroy"
	},

	initialize: function(options) {
		console.log(options.type);

		if (options.type.toLowerCase() !== "pros" && options.type.toLowerCase() !== "cons" && options.type.toLowerCase() !== "neutrals") {
			throw new Error('The provided argument type to the argument view is invalid!');
			return;
		} else {
			this.argumentType = options.type;
			this.argumentTemplate = _.template($('.' + this.argumentType + '-template').text());
		}

		this.listenTo(this.model, 'add change', this.render);

		$('.' + this.argumentType).append(this.el);

		this.render();
	},

	render: function() {
		var argumentRendered = this.argumentTemplate(this.model.attributes);
		this.$el.html(argumentRendered);
		return this;
	},

	moveArgument: function(objCollection, strType) {
		var objModel = objCollection.add({description: this.$el.find('.description').text()});
		objModel.save();

		this.model.destroy();
		this.remove();

		new ArgumentView({model: objModel, type: strType});
	},

	moveToPros: function() {
		this.moveArgument(prosCollection, 'pros');
	},

	moveToCons: function() {
		this.moveArgument(consCollection, 'cons');
	},

	moveToNeutrals: function() {
		this.moveArgument(neutralsCollection, 'neutrals');
	},

	destroy: function() {
		this.model.destroy();
		this.remove();
	}
});