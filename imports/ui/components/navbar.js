import { Template } from 'meteor/templating';

import './login.js';
import './register.js';
import './usernavbutton.js';

import './navbar.html';

Template.navbar.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
    'shown.bs.modal #registration-modal': function(event){
        Session.set('registerModalOpen', true);
    },
    'hidden.bs.modal #registration-modal': function(event){
        Session.set('registerModalOpen', false);
        delete Session.keys['registerModalOpen'];
    }
});

Template.navbar.helpers({
    noUserOrOpenModal: function(){
        return Session.get('registerModalOpen') || !Meteor.user()
    }
});