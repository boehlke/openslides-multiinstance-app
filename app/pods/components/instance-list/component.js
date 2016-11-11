import Ember from 'ember';

export default Ember.Component.extend({
  savedInstances: Ember.computed.filter('model', function(instance) { return !!instance.get('slug'); }),
  sortedInstances: Ember.computed.sort('savedInstances', function(a, b) {
    return a.get('event_name').toLowerCase() > b.get('event_name').toLowerCase();
  }),
  actions: {
    update: function() {
      this.sendAction('update');
    }
  }
});
