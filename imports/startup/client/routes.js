import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app_body.js';
import '../../ui/pages/app_home.js';
import '../../ui/pages/user_dashboard.js';
import '../../ui/pages/new_character_template.js';

var publicRoutes = FlowRouter.group({name:"public"});
var loggedInRoutes = FlowRouter.group({name:'private'})

loggedInRoutes.route('/dashboard', {
    name: 'dashboard',
    action(){
        BlazeLayout.render('App_body', { main: 'user_dashboard' } );
    }
});

publicRoutes.route('/', {
    name: 'home',
    action(){
        BlazeLayout.render('App_body', { main: 'app_home' } );
    }
});

loggedInRoutes.route('/character/template/new', {
    name: 'New Character Template',
    action(){
        BlazeLayout.render('App_body', { main: 'new_character_template'});
    }
});