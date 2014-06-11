"use strict";function loadArguments(){prosCollection.fetch().done(function(){prosCollection.each(function(a){new ProsView({model:a})})}),consCollection.fetch().done(function(){consCollection.each(function(a){new ConsView({model:a})})}),neutralsCollection.fetch().done(function(){neutralsCollection.each(function(a){new NeutralsView({model:a})})})}var strProURL="http://tiny-pizza-server.herokuapp.com/collections/jdill-pro",strConURL="http://tiny-pizza-server.herokuapp.com/collections/jdill-con",strNeutralURL="http://tiny-pizza-server.herokuapp.com/collections/jdill-neutral",ArgumentModel=Backbone.Model.extend({idAttribute:"_id"}),ProsCollection=Backbone.Collection.extend({model:ArgumentModel,url:strProURL}),ConsCollection=Backbone.Collection.extend({model:ArgumentModel,url:strConURL}),NeutralsCollection=Backbone.Collection.extend({model:ArgumentModel,url:strNeutralURL}),ProsView=Backbone.View.extend({prosTemplate:_.template($(".pros-template").text()),events:{"click .con-button":"moveToCons","click .neutral-button":"moveToNeutrals","click .delete-button":"destroy"},initialize:function(){this.listenTo(this.model,"add change",this.render),$(".pros").append(this.el),this.render()},render:function(){var a=this.prosTemplate(this.model.attributes);this.$el.html(a)},moveToCons:function(){var a=consCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new ConsView({model:a})},moveToNeutrals:function(){var a=neutralsCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new NeutralsView({model:a})},destroy:function(){this.model.destroy(),this.remove()}}),ConsView=Backbone.View.extend({consTemplate:_.template($(".cons-template").text()),events:{"click .pro-button":"moveToPros","click .neutral-button":"moveToNeutrals","click .delete-button":"destroy"},initialize:function(){this.listenTo(this.model,"add change",this.render),$(".cons").append(this.el),this.render()},render:function(){var a=this.consTemplate(this.model.attributes);this.$el.html(a)},moveToPros:function(){var a=prosCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new ProsView({model:a})},moveToNeutrals:function(){var a=neutralsCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new NeutralsView({model:a})},destroy:function(){this.model.destroy(),this.remove()}}),NeutralsView=Backbone.View.extend({neutralsTemplate:_.template($(".neutrals-template").text()),events:{"click .pro-button":"moveToPros","click .con-button":"moveToCons","click .delete-button":"destroy"},initialize:function(){this.listenTo(this.model,"add change",this.render),$(".neutrals").append(this.el),this.render()},render:function(){var a=this.neutralsTemplate(this.model.attributes);this.$el.html(a)},moveToPros:function(){var a=prosCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new ProsView({model:a})},moveToCons:function(){var a=consCollection.add({description:this.$el.find(".description").text()});a.save(),this.model.destroy(),this.remove(),new ConsView({model:a})},destroy:function(){this.model.destroy(),this.remove()}}),prosCollection=new ProsCollection,consCollection=new ConsCollection,neutralsCollection=new NeutralsCollection;$(document).ready(function(){loadArguments()}),$(".new-argument-button").click(function(){var a=$(".new-argument-field").val(),b=$("input:radio[name=new-argument-type]:checked").val();if(""===a)return void alert("You must specify your argument!");if(!b)return void alert("You must specify how you'd classify your argument!");switch(b){case"pro":var c=prosCollection.add({description:a});c.save(),new ProsView({model:c});break;case"con":var c=consCollection.add({description:a});c.save(),new ConsView({model:c});break;case"neutral":var c=neutralsCollection.add({description:a});c.save(),new NeutralsView({model:c})}$(".new-argument-field").val(""),$("input:radio[name=new-argument-type]").attr("checked",!1)});