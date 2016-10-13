import Ember from 'ember';

// This is a helper that lets you package up an action
// from the current context so you can pass it elsewhere.
// The Ember 2.0 RFC says that {{action "foo"}} will
// work this way, but in 1.0 it has a different meaning, so I
// named this one `make-action` instead.
export function makeAction(params) {
    var component = params[0];
    var actionName = params[1];
    var moreArgs = params.slice(2);
    return (...args) => {
        var allArgs = moreArgs.concat(args);
        component.send(actionName, ...allArgs);
    };
}

export default Ember.Helper.helper(makeAction);
