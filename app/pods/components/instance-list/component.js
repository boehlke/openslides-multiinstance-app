import Ember from 'ember';

export default Ember.Component.extend({
  savedInstances: Ember.computed.filter('model', function(instance) { return !!instance.get('slug'); })
});
