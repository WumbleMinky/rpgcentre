import { check } from 'meteor/check'

Meteor.methods({
    'register.emailUnique'(email){
        check(email, String);
        return Accounts.findUserByEmail(email);
    },
})