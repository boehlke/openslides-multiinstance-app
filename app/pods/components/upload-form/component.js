/*globals Droplet*/
import Ember from 'ember';

export default Ember.Component.extend(Droplet, {

  initFileTypes: function() {
    this.get('options').mimeTypes = ['image/png'];
  }.on('init'),

  i18n: Ember.inject.service(),
  authorization: Ember.inject.service(),
  apiService: Ember.inject.service(),
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  url: '/api/blobs',
  options: {
    uploadImmediately: true,
    // maximumSize: 1024,
    maximumValidFiles: 1
  },
  hooks: {
    didUpload: function (data) {
      // TODO return uploaded files
      this.sendAction('blobUploaded', data.blobId);
    }
  },
  actions: {
    'clearFiles': function () {
      const files = [...this.get('uploadedFiles'), ...this.get('invalidFiles')];
      files.forEach(file => this.send('deleteFiles', file));
    }
  }
});
