'use strict';

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// GLOBALS
////////////////////////////////////////////////////////////
var prosCollection = new ProsCollection();
var consCollection = new ConsCollection();
var neutralsCollection = new NeutralsCollection();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////// PAGE LOAD
////////////////////////////////////////////////////////////
$(document).ready(function() {
	loadArguments();
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////// FUNCTIONS
////////////////////////////////////////////////////////////
function loadArguments() {
	prosCollection.fetch().done(function() {
		prosCollection.each(function(pro) {
			new ProsView({model: pro});
		});
	});

	consCollection.fetch().done(function() {
		consCollection.each(function(con) {
			new ConsView({model: con});
		});
	});

	neutralsCollection.fetch().done(function() {
		neutralsCollection.each(function(neutral) {
			new NeutralsView({model: neutral});
		});
	});
}

$('.new-argument-button').click(function() {
	var strArgument = $('.new-argument-field').val();
	var strArgumentType = $('input:radio[name=new-argument-type]:checked').val();

	if (strArgument === '') {
		alert('You must specify your argument!');
		return;
	}

	if (!strArgumentType) {
		alert('You must specify how you\'d classify your argument!');
		return;
	}

	switch(strArgumentType) {
		case 'pro':
			var objModel = prosCollection.add({description: strArgument});
			objModel.save();
			new ProsView({model: objModel});

			break;

		case 'con':
			var objModel = consCollection.add({description: strArgument});
			objModel.save();
			new ConsView({model: objModel});

			break;

		case 'neutral':
			var objModel = neutralsCollection.add({description: strArgument});
			objModel.save();
			new NeutralsView({model: objModel});

			break;

		default:
			break;
	}

	$('.new-argument-field').val('');
	$('input:radio[name=new-argument-type]').attr('checked', false);
});