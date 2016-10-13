import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this._super(...arguments);
        var field = 'model.' + this.get('field');
        if(this.get('update')) {
            this.set('value', this.get(field));
        } else {
            // if no update handler is given, make a value binding
            this.reopen({
                value: Ember.computed.alias(field)
            });
        }
    },
    actions: {
        update: function(value, event) {
            this.sendAction('update', value, event);
        },
        enterPressed: function() {
            this.sendAction('enterPressed');
        }
    }
});
