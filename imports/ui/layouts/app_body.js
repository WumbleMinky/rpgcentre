import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery'

import './app_body.html';
import '../components/loginAndRegister.js';

Template.app_body.helpers({
    publicPageOrUser: function(){
        FlowRouter.watchPathChange();
        return FlowRouter.current().route.group.name == 'public' || Meteor.userId();
    },
    noUserOrOpenModal: function(){
        return Session.get('registerModalOpen') || !Meteor.userId()
    }
});

Template.app_body.events({
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