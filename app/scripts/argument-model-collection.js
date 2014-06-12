'use strict';

var ArgumentModel = Backbone.Model.extend({
	idAttribute: '_id'
});

var ArgumentCollection = Backbone.Collection.extend({
	model: ArgumentModel,

	initialize: function(options) {
		this.url = options.url;
	}
});