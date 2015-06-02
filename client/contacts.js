Template.contacts.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
			Meteor.subscribe("contacts");
    	};
  	});
});

Template.contacts.helpers({
	'contacts': function() {
		return Contacts.find({});
	}
});

Template.contacts.events({
	'click .button-assertive': function(e) {
		e.preventDefault();
		Meteor.call('removeContact', this._id, function(error, result) {
			if (error) alert(error.reason);
		});
		return;
	}
});

Template.edit.onCreated(function() {
	var self = this;
	self.autorun(function() {
		if ( Meteor.status().connected ) {
      		Meteor.subscribe("contact", Router.current().params._id);
    	}
  	});
});

Template.edit.helpers({
	'selectedDoc': function() {
		return Contacts.findOne(Router.current().params._id);
	}
});

AutoForm.hooks({
	insertContactForm: {
		onSubmit: function(insertDoc) {
			Meteor.call('addContact', insertDoc, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});

AutoForm.hooks({
	editContactForm: {
		onSubmit: function(insertDoc, updateDoc, currentDoc) {
			var obj = {_id: Router.current().params._id, updateDoc: updateDoc};
			Meteor.call('editContact', obj, function(error, result) {
				if (error) alert(error.reason);
			});
			$(".back-button").click();
			return false;
		}
	}
});