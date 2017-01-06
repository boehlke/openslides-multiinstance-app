import Ember from 'ember';

export function makeAction(params) {
    /* jshint ignore:start */
    const component = params[0];
    /* jshint ignore:end */
    var actions = params.slice(1);
    const fnActions = [];
    for (var i = 0; i < actions.length; i++) {
        if (typeof actions[i][0] === 'function') {
            /* jshint ignore:start */
            const action = actions[i][0];
            fnActions.push(function () {
                action(...arguments);
            });
            /* jshint ignore:end */
        } else {
            /* jshint ignore:start */
            const actionName = actions[i][0];
            const args = actions[i].slice(1);
            fnActions.push(function () {
                var allArgs = args.concat(arguments);
                component.send(actionName, ...allArgs);
            });
            /* jshint ignore:end */
        }
    }
    return (...args) => {
        for (var i = 0; i < fnActions.length; i++) {
            fnActions[i](...args);
        }
    };
}

export default Ember.Helper.helper(makeAction);
