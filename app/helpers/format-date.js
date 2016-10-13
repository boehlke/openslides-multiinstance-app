import { makeDate } from 'allex-ember/utils/date';

import Ember from 'ember';
var formatDate = Ember.Helper.helper(function(params) {
    var date = params[0];
    var format = params[1];
    return makeDate(date).format(format);
});
export default formatDate;
