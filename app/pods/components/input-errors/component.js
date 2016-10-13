import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this._super(...arguments);
        this.reopen({
            errors: Ember.computed.alias('model.errors.' + this.get('field'))
        });
    }
});
