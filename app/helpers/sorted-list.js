import Ember from 'ember';
import { forHumans } from 'allex-ember/utils/sort_for_humans';

var sortedList = Ember.Helper.helper(function (params) {
    return params[0].sort(forHumans).join(", ");
});
export default sortedList;
