import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('instance-add');
  this.route('upgrade', {
    path: '/upgrade/:instance_id'
  });
});

export default Router;
