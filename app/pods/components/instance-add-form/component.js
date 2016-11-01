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
    ],
    'event_name': [
      validatePresence(true)
    ],
    'parent_domain': [
      validatePresence(true)
    ],
    'event_description': [
      validatePresence(true)
    ],
    'event_date': [
      validatePresence(true)
    ],
    'event_location': [
      validatePresence(true)
    ],
    'event_organizer': [
      validatePresence(true)
    ],
    'admin_first_name': [
      validatePresence(true)
    ],
    'admin_last_name': [
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
  domainOptions: function () {
    if (!this.get('allDomains.isFulfilled')) {
      return [];
    }
    var domainOptions = Ember.A([Ember.Object.create({
      id: null,
      domain: '---',
      domainValue: null
    })]);
    return domainOptions.concat(this.get('allDomains').map(function(domainData) {
      return Ember.Object.create({
        id: domainData.get('id'),
        domain: domainData.get('domain'),
        domainValue: domainData.get('domain')
      });
    }));
  }.property('allDomains.isFulfilled'),
  allVersions: function () {
    return this.get('store').findAll('osversion');
  }.property(),
  allDomains: function () {
    return this.get('store').findAll('osdomain');
  }.property(),
  actions: {
    submit: function (changeset) {
      return changeset.validate().then(function () {
        if (!changeset.get('isValid')) {
          return false;
        }
        if (!this.get('model.osversion.content')) {
          this.set('model.error.osversion', {'validation': ['Cannot be blank']});
          return;
        }
        changeset.save().then(function (instance) {
          this.sendAction('saved', instance);
        }.bind(this));
      }.bind(this));
    }
  }

});
