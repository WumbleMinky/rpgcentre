import { Template } from 'meteor/templating';

import './login.js';
import './register.js';
import './navbar.html';

Template.navbar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
});