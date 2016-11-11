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
      if(confirm('Action cannot be undone')) {
        this.set('saving', true);
        this.get('instance').destroyRecord().finally(() => {
          this.set('saving', false);
          this.sendAction('update');
        });
      }
    },
    uploaded: function (blobIds) {
      this.get('instance').save();
    }
  }
});
