import Ember from 'ember';

export default Ember.Controller.extend({
  usedVersions: Ember.computed('model.@each', function () {
    const instances = this.get('model');
    const versions = Ember.A();
    instances.forEach(function (instance) {
      let osversion = instance.get('osversion');
      if (!versions.includes(osversion)) {
        versions.pushObject(osversion);
      }
    });
    return versions;
  }),
  sortedUsedVersions: Ember.computed.sort('usedVersions', function (a, b) {
    return a.get('id') - b.get('id');
  }),
  actions: {
    update: function () {
      this.store.findAll('instance');
    }
  }
});
