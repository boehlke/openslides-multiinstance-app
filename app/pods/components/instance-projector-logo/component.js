import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    uploaded: function (blobIds) {
      this.set('model.projector_logo', blobIds[0]);
      this.set('isShowingModal', false);
      this.sendAction('uploaded');
    },
    removeProjectorLogo: function() {
      this.set('model.projector_logo', null);
    },
    uploadProjectorLogo: function() {
      this.set('isShowingModal', true);
    }
  }
});
