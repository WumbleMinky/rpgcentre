import { Meteor } from 'meteor/meteor';
import { Systems } from './systems.js';

if (Meteor.isServer){
    Meteor.publish('systems', function systemsCollection(){
        return Systems.find();
    })
}