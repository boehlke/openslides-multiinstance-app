import Ember from 'ember';

var Component = Ember.Component.extend({
  tagName: '',
  openedModals: Ember.A(),
  isOpen: false,
  actions: {
    close: function () {
      this.get('openedModals').forEach(function (modalName) {
        this.set('open-' + modalName, false);
      }.bind(this));
      this.set('isOpen', false);
    },
    open: function (modalName, model) {
      if (typeof modalName !== 'string') {
        model = modalName;
        modalName = null;
      }
      this.get('openedModals').forEach(function (modalName) {
        this.set('open-' + modalName, false);
      }.bind(this));
      this.set('model', model);
      if (!modalName) {
        this.set('isOpen', true);
      }
      this.get('openedModals').pushObject(modalName);
      this.set('open-' + modalName, true);
    }
  }
});

export default Component;
