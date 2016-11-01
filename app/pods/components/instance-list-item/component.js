import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  actions: {
    toggleDetails: function() {
      this.toggleProperty('detailsOpen');
    },
    stop: function() {
      this.set('instance.state', 'stopped');
    },
    remove: function() {
      this.get('instance').destroyRecord();
    }
  }
});
