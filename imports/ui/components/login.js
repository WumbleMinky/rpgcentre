import { Template } from 'meteor/templating';

import './login.html';

Template.loginForm.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;
        Meteor.loginWithPassword(email, password, function(error){
          if(error){
            Session.set('loginErrorMessage', "Email and/or password are invalid");
          } else {
            delete Session.keys['loginErrorMessage'];
          }
        });
    },
});

Template.loginForm.helpers({
  loginErrorMessage: function(){
    return Session.get('loginErrorMessage');
  }
});
