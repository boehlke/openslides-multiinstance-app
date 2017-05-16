import Ember from 'ember';

const UpgradeModel = Ember.Object.extend({
  upgradeVersionOptions: Ember.computed.filter('versions', function (version) {
    const currentVersion = this.get('instance.osversion');
    return parseInt(currentVersion.get('id')) < parseInt(version.get('id'));
  }),
  upgradeSortedVersionOptions: Ember.computed.sort('upgradeVersionOptions', function (a, b) {
    return a.get('id') - b.get('id');
  })
});

export default Ember.Route.extend({
  model: async function (data) {
    const instanceId = data['instance_id'];
    const versions = await this.get('store').findAll('osversion');

    return UpgradeModel.create({
      instance: this.store.peekRecord('instance', instanceId),
      versions: versions
    });
  },
  actions: {
    back: function () {
      this.transitionTo('/');
    }
  }

});
