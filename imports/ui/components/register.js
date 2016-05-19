import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery'

import './register.html';

$.validator.addMethod('usernameUnique', function(username) {
    let exists = Meteor.users.findOne({ 'username': username }, { fields: { '_id': 1 } });
    return exists ? false: true;
})

$.validator.addMethod('emailUnique', function(email) {
    Meteor.call('register.emailUnique', email, function(error, result){
        if (error){
            console.log(error);
        }else{
            Session.set('uniqueEmail', result == null);
        }
    });
    return Session.get('uniqueEmail');
})

Template.registration.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.registerEmail.value;
        var password = event.target.registerPassword.value;
        var confirm_pass = event.target.registerConfirmPassword.value;
        var username = event.target.registerUsername.value;
        
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
        }, function(error){
            if (error){
                console.log(error)
            }
            $('#registration-modal').modal('hide');
        });
    }
});

Template.registration.onRendered(function(){
    $('.register').validate({
        rules: {
            registerEmail: { 
                required: true ,
                emailUnique: true,
            },
            registerUsername: { 
                required: true, 
                usernameUnique: true 
            },
            registerPassword: { required: true },
            registerConfirmPassword: { required: true, equalTo: '#registerPassword' },
        },
        messages: {
            registerConfirmPassword: { 
                equalTo: "Passwords do not match" ,
                required: "You must confirm your password"
            },
            registerPassword: "You must create a password",
            registerEmail: {
                email: "Not a valid email address",
                required: "We require an email address",
                emailUnique: 'Email address already in use'
            },
            registerUsername: {
                required: "A username is required",
                usernameUnique: "Username already taken",
            },
        }
    });
});