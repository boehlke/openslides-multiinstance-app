import Ember from 'ember';

export function makeAction(params) {
    const component = params[0];
    var actions = params.slice(1);
    const fnActions = [];
    for (var i = 0; i < actions.length; i++) {
        if (typeof actions[i][0] === 'function') {
            const action = actions[i][0];
            fnActions.push(function () {
                action(...arguments);
            });
        } else {
            const actionName = actions[i][0];
            const args = actions[i].slice(1);
            fnActions.push(function () {
                var allArgs = args.concat(arguments);
                component.send(actionName, ...allArgs);
            });
        }
    }
    return (...args) => {
        for (var i = 0; i < fnActions.length; i++) {
            fnActions[i](...args);
        }
    };
}

export default Ember.Helper.helper(makeAction);
