
import Ember from 'ember';
var Pluralize = Ember.Helper.helper(function(params) {
    var number = params[0];
    var word = number === 1 ? params[1] : Ember.String.pluralize(params[1]);
    return number.toString() + " " + word;
});
export default Pluralize;
