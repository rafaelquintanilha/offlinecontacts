Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('contacts', {path: '/'}),
  this.route('new'),
  this.route('edit', {path: 'edit/:_id'})
});