import {makeDate} from 'allex-ember/utils/date';

import Ember from 'ember';
var weekDay = Ember.Helper.helper(function(params) {
    var day = params[0];
    return makeDate(day).format("D");
});
export default weekDay;
