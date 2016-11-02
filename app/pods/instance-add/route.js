import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('osversion').then(function (versions) {
      const defaultVersion = versions.filterBy('default', true)[0];
      return this.store.createRecord('instance', {
        osversion: defaultVersion
      });
    }.bind(this))
  },
  actions: {
    instanceSaved: function(instance) {
      this.transitionTo('index');
    }
  }
});

