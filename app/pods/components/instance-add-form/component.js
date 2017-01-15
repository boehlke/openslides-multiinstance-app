import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import {
  validatePresence,
} from 'ember-changeset-validations/validators';

const validations = {
  'slug': [
    validatePresence(true)
  ],
  'osversion': [
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
};

export default Ember.Component.extend({
  store: Ember.inject.service(),

  changeset: function () {
    if (!this.get('defaultVersion')) {
      return null;
    }

    let changeset = new Changeset(this.get('model'), lookupValidator(validations), validations);
    const defaultVersion = this.get('defaultVersion');
    changeset.set('osversion', defaultVersion);
    return changeset;

  }.property('defaultVersion'),

  defaultVersion: function () {
    if (!this.get('allVersions.isFulfilled')) {
      return null;
    }
    const allVersions = this.get('allVersions');
    return allVersions.filterBy('default', true)[0] || allVersions[0];
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
          changeset.set('osversion', this.get('defaultVersion'));
        }

        this.get('store').findAll('instance').then(function (instanceList) {
          let valid = true;
          instanceList.forEach((existingInstance) => {
            if (existingInstance.get('id') && existingInstance.get('domain').toLowerCase() === changeset.get('domain').toLowerCase()) {
              changeset.addError('slug', ['already taken']);
              valid = false;
            }
          });
          if (!valid) {
            return false;
          }

          changeset.save().then(function (instance) {
            this.sendAction('saved', instance);
          }.bind(this));

        }.bind(this));
      }.bind(this));
    }
  }
});
