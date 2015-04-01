Posts = new Mongo.Collection('posts');
if (Meteor.isClient) {
  // counter starts at 0
  // console.log(Meteor.user());
  Session.set('view', 'user');

  UI.registerHelper('equals', function (a, b) {
    return a === b;
  });

  UI.registerHelper('formatDate', function(context, options) {
    if(context)
      return moment(context).format('MM/DD/YYYY');
  });

  UI.registerHelper('formatDateTime', function(context, options) {
    if(context){
      return moment(context).format('MM/DD/YYYY hh:mm a');
    }
  });


  UI.registerHelper('formatTime', function(context, options) {
    if(context){
      return moment(moment(new Date()).format('MM/DD/YYYY')+' '+context).format('hh:mm a');
    }
  });

  Template.body.helpers({
    view: function () {
      return Session.get('view');
    }
  });
  Template.list.helpers({
    posts: function () {
      return Posts.find({uid: Meteor.userId() });
    }
  });

  Template.list.events({
    'click .new-absence': function () {
      $('.flip-container').addClass('flip');
    },
    'click .close': function () {
      $('.flip-container').removeClass('flip');
    }
  });
  Template.admin.helpers({
    posts: function () {
      return Posts.find({});
    }
  });

  Template.form.events({
    'submit .absence-form': function (event) {
      event.preventDefault();
      var form = $(event.target).serializeArray();

      var data = {};
      form.forEach(function (field) {
        data[field.name] = field.value;
      });

      var post = {
        uid: Meteor.userId(),
        user: Meteor.user().emails[0].address,
        date: new Date(),
        data: data
      };

      
      Posts.insert(post);
      $('.flip-container').removeClass('flip');
      console.log(post);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
