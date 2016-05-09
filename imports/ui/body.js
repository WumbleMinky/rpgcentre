import { Template } from 'meteor/templating';

import './components/navbar.js';
import './body.html';

Template.body.helpers({
    var: [
        { text: 'Test' },
        { text: 'Test2' }
    ]
})