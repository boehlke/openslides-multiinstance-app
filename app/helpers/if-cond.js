import Ember from 'ember';

export default Ember.Helper.helper(function (args) {
  const v1 = args[0];
  const operator = args[1];
  const v2 = args[2];
  switch (operator) {
    case '==':
      /* jshint ignore:start */
      return (v1 == v2) ? true : false;
    /* jshint ignore:end */
    case '===':
      return (v1 === v2) ? true : false;
    case '!==':
      return (v1 !== v2) ? true : false;
    case '!=':
      /* jshint ignore:start */
      return (v1 != v2) ? true : false;
    /* jshint ignore:end */
    case '<':
      return (v1 < v2) ? true : false;
    case '<=':
      return (v1 <= v2) ? true : false;
    case '>':
      return (v1 > v2) ? true : false;
    case '>=':
      return (v1 >= v2) ? true : false;
    case '&&':
      return (v1 && v2) ? true : false;
    case '||':
      return (v1 || v2) ? true : false;
    default:
      return false;
  }
});
