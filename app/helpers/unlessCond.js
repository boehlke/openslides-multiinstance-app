import Ember from 'ember';

export default Ember.Helper.helper(function(v1, operator, v2, options) {
    switch (operator) {
        case '==':
            /* jshint ignore:start */
            return (v1 == v2) ? options.inverse(this) : options.fn(this);
            /* jshint ignore:end */
        case '===':
            return (v1 === v2) ? options.inverse(this) : options.fn(this);
        case '<':
            return (v1 < v2) ? options.inverse(this) : options.fn(this);
        case '<=':
            return (v1 <= v2) ? options.inverse(this) : options.fn(this);
        case '>':
            return (v1 > v2) ? options.inverse(this) : options.fn(this);
        case '>=':
            return (v1 >= v2) ? options.inverse(this) : options.fn(this);
        case '&&':
            return (v1 && v2) ? options.inverse(this) : options.fn(this);
        case '||':
            return (v1 || v2) ? options.inverse(this) : options.fn(this);
        default:
            return options.fn(this);
    }
});
