import { Meteor } from 'meteor/meteor';
import { CharacterTemplates } from './character.js';

if(Meteor.isServer){
    Meteor.publish('templates.character', function characterTemplates(){
        CharacterTemplates.find();
    })
}