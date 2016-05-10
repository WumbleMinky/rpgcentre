import { Template } from 'meteor/templating';

import './login.html';

Template.loginButton.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.loginEmail.value;
        var password = event.target.loginPassword.value;
        Meteor.loginWithPassword(email, password);
    },
});