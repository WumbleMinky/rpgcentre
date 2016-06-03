import { Meteor } from 'meteor/meteor';

import '../imports/ui/components/methods.js';
import { CharacterTemplates } from '../imports/api/templates/character.js';
import '../imports/api/templates/character_subscriptions.js';
import '../imports/api/templates/character_methods.js';
import { Systems } from '../imports/api/systems/systems.js';
import '../imports/api/systems/systems_methods.js';
import '../imports/api/systems/systems_subscriptions.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (CharacterTemplates.find().count() === 0){
      
  }
  
  if (Systems.find().count() === 0){
      Systems.insert({
          name: 'Pathfinder'
      });
      Systems.insert({
          name: 'Dungeons & Dragons 5th Edition',
          short_name: 'D&D5E'
      });
  }
});
