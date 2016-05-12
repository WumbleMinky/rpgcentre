import { Template } from 'meteor/templating';

import './usernavbutton.html';

Template.userNavButton.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
});