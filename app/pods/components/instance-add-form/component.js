import Ember from 'ember';
import Changeset from 'ember-changeset';
import {
  validatePresence,
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
    'admin_first_name': [
      validatePresence(true)
    ],
    'admin_last_name': [
      validatePresence(true)
    ]
  },

  store: Ember.inject.service(),

  changeset: function() {
    if (!this.get('allVersions.isFulfilled')) {
      return null;
    }
    let changeset = new Changeset(this.get('model'), this.get('validations'));
    const defaultVersion = this.get('allVersions').filterBy('default', true)[0];
    changeset.set('osversion', defaultVersion);
    return changeset;
  }.property('model', 'allVersions.isFulfilled'),

  versionOptions: function () {
    if (!this.get('allVersions.isFulfilled')) {
      return [];
    }
    const versions = this.get('allVersions').toArray();
    return versions;
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
    return domainOptions.concat(this.get('allDomains').map(function (domainData) {
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
        if (!changeset.get('osversion.id')) {
          const versions = this.get('allVersions').toArray();
          changeset.set('osversion', versions[0]);
        }
        changeset.save().then(function (instance) {
          this.sendAction('saved', instance);
        }.bind(this));
      }.bind(this));
    }
  }
});
