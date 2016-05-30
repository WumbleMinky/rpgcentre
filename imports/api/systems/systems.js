import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Systems = new Mongo.Collection('systems');

Systems.schema = new SimpleSchema({
    name: { type: String },
    short_name: { type: String, optional: true },
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
})

Systems.attachSchema(Systems.schema);

Systems.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});