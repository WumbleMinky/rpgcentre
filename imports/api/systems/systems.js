import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Systems = new Mongo.Collection('systems');

Systems.schema = new SimpleSchema({
    name: { type: String },
    short_name: { type: String, optional: true }
})

Systems.attachSchema(Systems.schema);

Systems.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});