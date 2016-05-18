import { Template } from 'meteor/templating';

import './new_character_template.html';

Template.new_character_template.onCreated(function(){
    Session.set('fieldsArray', []);
})

Template.new_character_template.events({
    'click .js-add-field': function(event){
        event.preventDefault();
        $(event.target).parent().parent().parent().find('table').append(Blaze.toHTML(Template.fieldRow));
    },
    'click .js-removeField': function(event){
        $(event.target).parent().parent().remove();
    },
    'click #add_section': function(event){
        $('#sections-group').append(Blaze.toHTML(Template.sectionPanel));
    },
    'click .js-removeSection': function(event){
        $(event.target).parent().parent().parent().parent().remove()
    },
})

Template.new_character_template.helpers({
    fieldsArray: function(){
        return Session.get('fieldsArray');
    },
});