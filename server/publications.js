Meteor.publish('contacts', function() {
  return Contacts.find();
});

Meteor.publish('contact', function(_id) {
  return Contacts.find({_id: _id});
});