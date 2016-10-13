import Ember from 'ember';

export default Ember.Helper.helper(function(args, options) {
    var entity = args[0];
    var fieldTitle = args[1];
    return Ember.computed(entity.get('fieldValues'), function() {
        return Ember.String.htmlSafe(entity.get('fieldValue').call(entity, fieldTitle));
    });
});
