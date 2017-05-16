import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    update: function () {
      this.store.findAll('instance');
    }
  }
});
