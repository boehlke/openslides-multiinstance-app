import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    toggleDetails: function() {
      this.toggleProperty('detailsOpen');
    },
    stop: function() {
      this.set('instance.state', 'stopped');
      this.set('saving', true);
      this.get('instance').save().finally(() => {
        this.set('saving', false);
        this.sendAction('update');
      });
    },
    start: function() {
      this.set('instance.state', 'active');
      this.set('saving', true);
      this.get('instance').save().finally(() => {
        this.set('saving', false);
        this.sendAction('update');
      });
    },
    remove: function() {
      this.sendAction('removeInstance', this.get('instance'));
    },
    uploaded: function () {
      this.get('instance').save();
    },
    upgradeInstance: function() {
      this.sendAction('upgradeInstance', this.get('instance'));
    }
  }
});
