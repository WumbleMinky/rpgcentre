import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Systems } from '../../api/systems/systems.js';
import { CharacterTemplates } from '../../api/templates/character.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
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

// NEW CHARACTER TEMPLATE RELATED =========

Template.new_character_template.onCreated(function(){
    this.subscribe('templates.character');
    this.subscribe('systems');
    delete Session.keys['template_sections'];
    delete Session.keys['template_name'];
    delete Session.keys['template_system'];
})

Template.new_character_template.events({
    'click .tab-content': function(event){
        Session.set('selectedLayoutElement', undefined);
    },
    'click #layout-link': function(event){
        Session.set('template_name', $('#template_name').val());
        Session.set('template_system', $('#system_name').val());
        var sections = [];
        $('.js-section').each(function( index ){
            var section_name = $(this).find('input.js-section-name').val();
            var section = { name: section_name, fields: [] };
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
                section['fields'].push(field);
            });
            sections.push(section);
        });
        Session.set('template_sections', sections);
    },
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
        },
        messages: {
            template_name: { required: "You must enter a name for the template" },
            system_name: { required: 'You must enter an RPG system that this template is meant for.' },
        }
    })
});

// LAYOUT RELATED ==========================

function adjustLayoutPageSize(){
    var temp = $('#template_page');
    var width = temp.width();
    var height = width * 1.29;
    temp.height(height);
}

Template.layout.onRendered(function(){
    $('#template_page').droppable( {
        accept: '.draggable_item',
        drop: function(event, ui){
            var drag_offset = ui.helper.offset();
            var drop_area_offset = $(this).offset();
            var top = drag_offset.top - drop_area_offset.top;
            var left = drag_offset.left - drop_area_offset.left;
            
            var css = "position:" + ui.helper.css("position");
            css = css + ';top:' + top + 'px;';
            css = css + 'left:' + left + 'px;';
            var text = $(ui.helper).attr('name');
            Blaze.renderWithData(Template.drag_input, {style:css, text: text}, this);
            ui.draggable.draggable( 'disable' );
        }
    });
    
    // Quickly show the Layout Tab, then calculate & adjust the height of the page div, and switch back to the default fields tab
    $('#layout-link').tab('show');
    adjustLayoutPageSize();
    $('#fields-link').tab('show');
    $(window).resize(function(){
        adjustLayoutPageSize();
    })
})

Template.layout.events({
    'click .input-placeholder': function(event){
        Session.set('selectedLayoutElement', $(event.currentTarget).find('p').text());
        event.stopPropagation();
    }
});

Template.layout.helpers({
    getTemplateSections(){
        return Session.get('template_sections');
    },
    getTemplateName(){
        return Session.get('template_name');
    },
    getTemplateSystem(){
        return Session.get('template_system');
    },
})

// LAYOUT FIELD RELATED ======================

Template.layout_field.events({
    'click .draggable_item.ui-draggable-disabled': function(event){
        event.stopPropagation();
        Session.set('selectedLayoutElement', $(event.target).text());
    },
});

Template.layout_field.helpers({
    isSelected(text){
        return Session.equals('selectedLayoutElement', text);
    },
});

Template.layout_field.onRendered(function(){
    //make this field item draggable
    var text = this.$('.draggable_item').text();
    this.$('.draggable_item').draggable({
        cursor: "move",
        cursorAt: { left: 5, top: 5 },
        containment: '.container',
        helper: function(event){
            return Blaze.toHTMLWithData(Template.drag_input, {text: text});
        }
    });
});

Template.layout_field.onDestroyed(function(){
    //remove the Draggable layout element associated with this field
    var text = this.$('.draggable_item').text();
    $('#layout div[name="' + text + '"').remove();
});

// DRAG INPUT RELATED ============================

Template.drag_input.onRendered(function(){
    var div = $(this.find('div'));
    div.draggable({
        containment: 'parent',
        handle: '.move-handler'
    });
    div.resizable({
        containment: 'parent',
        handles:{ se: '.size-handler' },
    });
    //This is a fix to stop the resize event from propgating past this <div>
    div.on('resize', function(event){
        event.stopPropagation();
    })
});

Template.drag_input.helpers({
    isSelected(text){
        return Session.equals('selectedLayoutElement', text);
    },
})