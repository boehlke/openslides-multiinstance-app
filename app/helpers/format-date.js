export function makeDate(date) {
  if (date === undefined) {
    date = moment();
    date.set('hours', 12);
    date.set('minutes', 0);
    date.set('seconds', 0);
  }
  if (moment.isMoment(date) && date.isValid()) {
    date = date.clone();
    date.set('hours', 12);
    date.set('minutes', 0);
    date.set('seconds', 0);
    return date;
  }
  if (typeof date === "string" && /^\d{4}\-\d{2}-\d{2}$/.test(date)) {
    return moment(date + "T12:00:00.000", "YYYY-MM-DDTHH:mm:ss.SSS");
  }
  return moment(date);
}

import Ember from 'ember';
var formatDate = Ember.Helper.helper(function(params) {
    var date = params[0];
    var format = params[1];
    return makeDate(date).format(format);
});
export default formatDate;
