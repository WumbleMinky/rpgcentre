import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app_body.js';
import '../../ui/pages/app_home.js';
import '../../ui/pages/user_dashboard.js';
import '../../ui/pages/new_character_template.js';

FlowRouter.route('/dashboard', {
    name: '/dashboard',
    action(){
        BlazeLayout.render('App_body', { main: 'user_dashboard' } );
    }
})

FlowRouter.route('/', {
    name: 'home',
    action(){
        BlazeLayout.render('App_body', { main: 'app_home' } );
    }
});

FlowRouter.route('/character/template/new', {
    name: 'New Character Template',
    action(){
        BlazeLayout.render('App_body', { main: 'new_character_template'});
    }
});