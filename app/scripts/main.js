'use strict';

////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// GLOBALS
////////////////////////////////////////////////////////////
var strProURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-pro';
var strConURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-con';
var strNeutralURL = 'http://tiny-pizza-server.herokuapp.com/collections/jdill-neutral';

var prosCollection = new ArgumentCollection({url: strProURL});
var consCollection = new ArgumentCollection({url: strConURL});
var neutralsCollection = new ArgumentCollection({url: strNeutralURL});

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
			new ArgumentView({model: pro, type: 'pros'});
		});
	});

	consCollection.fetch().done(function() {
		consCollection.each(function(con) {
			new ArgumentView({model: con, type: 'cons'});
		});
	});

	neutralsCollection.fetch().done(function() {
		neutralsCollection.each(function(neutral) {
			new ArgumentView({model: neutral, type: 'neutrals'});
		});
	});
}

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// EVENTS
////////////////////////////////////////////////////////////
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
			new ArgumentView({model: objModel, type: 'pros'});

			break;

		case 'con':
			var objModel = consCollection.add({description: strArgument});
			objModel.save();
			new ArgumentView({model: objModel, type: 'cons'});

			break;

		case 'neutral':
			var objModel = neutralsCollection.add({description: strArgument});
			objModel.save();
			new ArgumentView({model: objModel, type: 'neutrals'});

			break;

		default:
			break;
	}

	$('.new-argument-field').val('');
	$('input:radio[name=new-argument-type]').attr('checked', false);
});

// BUTTONS FOR RESPONSIVE FEATURES
$('.pros-selector').click(function() {
	$('.pros').show();
	$('.pros-selector').css('opacity', '0.5');

	$('.cons').hide();
	$('.cons-selector').css('opacity', '1');

	$('.neutrals').hide();
	$('.neutrals-selector').css('opacity', '1');
});

$('.cons-selector').click(function() {
	$('.pros').hide();
	$('.pros-selector').css('opacity', '1');

	$('.cons').show();
	$('.cons-selector').css('opacity', '0.5');

	$('.neutrals').hide();
	$('.neutrals-selector').css('opacity', '1');
});

$('.neutrals-selector').click(function() {
	$('.pros').hide();
	$('.pros-selector').css('opacity', '1');

	$('.cons').hide();
	$('.cons-selector').css('opacity', '1');

	$('.neutrals').show();
	$('.neutrals-selector').css('opacity', '0.5');
});