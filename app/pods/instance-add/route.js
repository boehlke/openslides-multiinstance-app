import Ember from 'ember';

export default Ember.Route.extend({
  model: async function () {
    const versions = await this.get('store').findAll('osversion');
    const defaultVersion = versions.filterBy('default', true)[0];
    const domains = await this.get('store').findAll('osdomain');
    return {
      instance: this.store.createRecord('instance', {
        osversion: defaultVersion
      }),
      versions: versions,
      domains: domains
    };
  },
  actions: {
    instanceSaved: function () {
      this.transitionTo('index');
    }
  }
});

