import Ember from 'ember';
import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

export default Ember.Component.extend({
  validations: {
    'slug': [
      validatePresence(true)
    ]
  },
  store: Ember.inject.service(),
  versionOptions: function () {
    if (!this.get('allVersions.isFulfilled')) {
      return [];
    }
    return this.get('allVersions').toArray();
  }.property('allVersions.isFulfilled'),
  allVersions: function () {
    return this.get('store').findAll('osversion');
  }.property(),
  actions: {
    submit: function (changeset) {
      return changeset.validate().then(function() {
        if(!changeset.get('isValid')) {
          return false;
        }
        if(!this.get('model.osversion.content')) {
          this.set('model.error.osversion', {'validation': ['Cannot be blank']});
          return;
        }
        changeset.save().then(function(instance) {
          this.sendAction('saved', instance);
        }.bind(this));
      }.bind(this));
    }
  }

});
