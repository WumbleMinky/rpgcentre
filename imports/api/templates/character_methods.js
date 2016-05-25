import { Meteor } from 'meteor/meteor';
import { CharacterTemplates } from './character.js';

Meteor.methods({
    'templates.character.insert': function(templateObj){
        return CharacterTemplates.insert(templateObj);
    },
    'templates.character.update': function(id, templateObj){
        return CharacterTemplates.update({ _id: id}, {$set: templateObj});
    }
})