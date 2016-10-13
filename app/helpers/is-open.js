import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
    var component = params[0];
    var prop = params[1] ? 'opened-' + params[1] :  'isOpen';
    return component.get(prop);
});
