import { Template } from 'meteor/templating';

import './register.html';

Template.registration.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.registerEmail.value;
        var password = event.target.registerPassword.value;
        var confirm_pass = event.target.registerConfirmPassword.value;
        var username = event.target.registerUsername.value;
        console.log(username);
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
        });
    }
});

Template.registration.onRendered(function(){
    $('.register').validate({
        rules: {
            registerPassword: { required: true },
            registerConfirmPassword: { required: true, equalTo: '#registerPassword' },
        }
    });
});