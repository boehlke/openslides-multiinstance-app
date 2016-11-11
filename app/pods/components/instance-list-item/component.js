import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    toggleDetails: function() {
      this.toggleProperty('detailsOpen');
    },
    stop: function() {
      this.set('instance.state', 'stopped');
      this.get('instance').save();
    },
    start: function() {
      this.set('instance.state', 'active');
      this.get('instance').save();
    },
    remove: function() {
      if(confirm('Action cannot be undone')) {
        this.get('instance').destroyRecord();
      }
    },
    uploaded: function (blobIds) {
      this.get('instance').save();
    }
  }
});
