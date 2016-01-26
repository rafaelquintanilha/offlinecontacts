ContactsSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 20
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  lastUpdated: {
    type: Date,
    optional: true
  }
});

Contacts = new Meteor.Collection('Contacts');

if (Meteor.isClient) Ground.Collection(Contacts);

Meteor.methods({
  addContact: function(doc) {
    check(doc, ContactsSchema);
    var obj = {name: doc.name, email: doc.email, createdAt: new Date};
    return Contacts.insert(obj);
  },
  editContact: function(obj) {
    _.extend(obj.updateDoc.$set, {lastUpdated: new Date});
    check(obj._id, String);
    check(obj.updateDoc.$set, ContactsSchema);
    return Contacts.update({_id: obj._id}, obj.updateDoc);
  },
  removeContact: function(id) {
    check(id, String);
    return Contacts.remove(id);
  }
});

if ( Meteor.isClient ) {
  Ground.methodResume([
      'addContact',
      'editContact',
      'removeContact'
  ]);
}
