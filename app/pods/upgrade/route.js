import Ember from 'ember';

export default Ember.Route.extend({
  model: async function (data) {
    const instanceId = data['instance_id'];

    const versions = await this.get('store').findAll('osversion');
    return {
      instance: this.store.peekRecord('instance', instanceId),
      versions: versions
    };
  },
  actions: {
    back: function () {
      this.transitionTo('/');
    }
  }

});
