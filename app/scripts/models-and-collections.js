'use strict';

var strProURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-pro';
var strConURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-con';
var strNeutralURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-neutral';

var ArgumentModel = Backbone.Model.extend({
	idAttribute: '_id'
});

var ProsCollection = Backbone.Collection.extend({
	model: 	ArgumentModel,
	url: 	strProURL
});

var ConsCollection = Backbone.Collection.extend({
	model: 	ArgumentModel,
	url: 	strConURL
});

var NeutralsCollection = Backbone.Collection.extend({
	model: 	ArgumentModel,
	url: 	strNeutralURL
});