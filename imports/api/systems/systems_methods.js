import { Meteor } from 'meteor/meteor';
import { Systems } from './systems.js';

Meteor.methods({
    'systems.insert': function systemsInsert(name, short_name){
        Systems.insert({name: name, short_name: short_name});
    }
})