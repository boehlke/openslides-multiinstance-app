import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    Ember.$('body').addClass('modal-open');
  },
  didDestroyElement() {
    Ember.$('body').removeClass('modal-open');
  },
  containerClassNames: ['modal-dialog'],
  translucentOverlay: true,
  clickOutsideToClose: true,
  targetAttachment: 'top center',
  attachment: 'top center',

  upgradeVersionOptions: Ember.computed.filter('versions', function (version) {
    const currentVersion = this.get('instance.osversion');
    return parseInt(currentVersion.get('id')) < parseInt(version.get('id'));
  }),
  upgradeSortedVersionOptions: Ember.computed.sort('upgradeVersionOptions', function (a, b) {
    return a.get('id') - b.get('id');
  }),
  actions: {
    close: function () {
      this.sendAction('close', this);
    },
    submit: async function () {
      let osversion = this.get('osversion');
      if (!osversion || !osversion.get('id')) {
        osversion = this.get('upgradeVersionOptions')[0];
      }
      this.set('instance.osversion', osversion);
      this.set('saving', true);
      await this.get('instance').save();
      this.set('saving', false);
      this.sendAction('close');
    },
  }
});
