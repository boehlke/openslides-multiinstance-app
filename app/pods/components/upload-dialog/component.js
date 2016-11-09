import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this._super(...arguments);
        this.set('blobIds', []);
    },
    actions: {
        close: function() {
            this.sendAction('close', this.get('blobIds'));
        },
        blobUploaded: function(blobId) {
            this.get('blobIds').push(blobId);
        }
    }
});
