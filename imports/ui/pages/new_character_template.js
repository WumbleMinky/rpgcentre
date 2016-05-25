import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Systems } from '../../api/systems/systems.js';
import { CharacterTemplates } from '../../api/templates/character.js';
import { $ } from 'meteor/jquery'

import './new_character_template.html';

var section_count = 0;
var field_count = 0;

function validateWithMultiFields(){
    $('input[name="section_name"]').each(function(){
        $(this).rules("add", { required: true, messages: { required: "A section name is required" } });
    });
    $('input[name="field_name"]').each(function(){
        $(this).rules("add", { required: true, messages: { required: "A field name is required" } });
    });
}

Template.new_character_template.onCreated(function(){
    this.subscribe('templates.character');
    this.subscribe('systems');
})

Template.new_character_template.events({
    'click .js-add-field': function(event){
        event.preventDefault();
        var field = $(Blaze.toHTML(Template.fieldRow)).appendTo($(event.target).parent().parent().parent().find('table'));
        var inp = field.find('input.js-field-name');
        inp.attr('name', 'field_name' + field_count);
        inp.rules("add", { required: true, messages: { required: "This field must have a name" } });
        field_count++;
    },
    'click .js-removeField': function(event){
        $(event.target).parent().parent().remove();
    },
    'click #add_section': function(event){
        var section = $(Blaze.toHTML(Template.sectionPanel)).appendTo('#sections-group');
        var inp = section.find('input.js-section-name');
        inp.attr('name', 'section_name' + section_count);
        inp.rules("add", { required: true, messages: { required: "A section name is required" } });
        section_count++;
    },
    'click .js-removeSection': function(event){
        $(event.target).parent().parent().parent().parent().remove()
    },
    'submit form': function(event){
        event.preventDefault();
        
        var temp = {};
        temp['name'] = event.target.template_name.value;
        temp['system'] = event.target.system_name.value;
        temp['userId'] = Meteor.userId();
        temp['fields'] = [];
        
        var sections = $('.js-section').each(function( index ){
            var section_name = $(this).find('input.js-section-name').val();
            $(this).find('input.js-field-name').each(function( index ){
                var field_name = $(this).val();
                var field_type = $(this).parent().next().children().val();
                var field_rules = $(this).parent().next().next().children().val();
                
                var field = {
                    section: section_name,
                    name: field_name,
                    type: field_type,
                    rules: field_rules,
                }
                temp['fields'].push(field);
            });
        });
        
        if(event.target.template_id.value){
            Meteor.call('templates.character.update', event.target.template_id.value, temp, function(error, result){
                if (!error){
                    console.log('Update Successful');
                }
            });
        }else{
            Meteor.call('templates.character.insert', temp, function(error, result){
                if(!error){
                    console.log("Template Saved");
                    $('#template_id').val(result);
                }else{
                    console.log(error.message);
                }
            });
        }
    }
})

Template.new_character_template.helpers({
    getSystems(){
        return Systems.find();
    },
})

Template.new_character_template.onRendered(function(){
    $('#character_template_form').validate({
        rules: {
            template_name: { required: true },
            system_name: { required: true },
            //field_name: { required: true },
        },
        messages: {
            template_name: { required: "You must enter a name for the template" },
            system_name: { required: 'You must enter an RPG system that this template is meant for.' },
            //field_name: { required: 'The field must have a name' },
        }
    })
});