import Ember from 'ember';

export default Ember.Helper.helper(function(args) {
    if(!args[0]) {
        return '';
    }
    return args[0][0].toUpperCase();
});
