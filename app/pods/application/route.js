import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('instance');
  },
  actions: {
    upgradeInstance: function (instance) {
      this.transitionTo('upgrade', instance.get('id'));
    }
  }
});
