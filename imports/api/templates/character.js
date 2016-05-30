import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Systems } from '../systems/systems.js';

class CharacterTemplateCollection extends Mongo.Collection {
    insert(tempObj, callback){
        if (tempObj['system'] && !Systems.findOne({ name: tempObj['system'] })){
            Systems.insert( { name: tempObj['system'], short_name: 'None' });
        }
        return super.insert(tempObj, callback);
    }
    update(selector, tempObj, callback){
        if (tempObj['system'] && !Systems.findOne({ name: tempObj['system'] })){
            Systems.insert( { name: tempObj['system'], short_name: 'None' });
        }
        return super.update(selector, tempObj, callback);
    }
}

export const CharacterTemplates = new CharacterTemplateCollection('character_templates');

var FieldSchema = new SimpleSchema({
    section: {type: String},
    name: {type: String},
    type: {type: String},
    rules: {type: String, optional: true},
})

CharacterTemplates.schema = new SimpleSchema({
    name: {type: String},
    system: {type: String},
    userId: {type: String},
    fields: {type: [FieldSchema]},
    createdAt: { 
        type: Date, 
        autoValue:  function(){
            if (this.isInsert){
                return new Date();
            }else if(this.isUpsert){
                return {$setOnInsert: new Date()};
            }else{
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function(){
            if (this.isUpdate){
                return new Date();
            }
        },
        denyInsert: true,
        optional: true,
    }
})

CharacterTemplates.attachSchema(CharacterTemplates.schema);

CharacterTemplates.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
})
