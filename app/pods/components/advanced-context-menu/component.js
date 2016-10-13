import Ember from 'ember';

// import { animate, stop } from "liquid-fire";
//
// function fade(oldView, insertNewView) {
//     stop(oldView);
//     return animate(oldView, {opacity: 0})
//         .then(insertNewView)
//         .then(function (newView) {
//             return animate(newView, {opacity: [1, 0]});
//         });
// }

export default Ember.Component.extend({
    tagName: '',
    dialogName: 'root',
    containerClass: 'modal-dialog',
    extraClass: '',
    init() {
        this._super(...arguments);
        this.set('dialogStack', Ember.A());
    },
    constraints: Ember.computed(function () {
        return [
            {
                to: 'window',
                attachment: 'both'
            }
        ];
    }),
    _goToDialog: function (toName) {
        this.set('dialogName', toName);
    },
    transitionComplete: function (dialog) {
        var stack = this.get('dialogStack');
        if (!stack.contains(dialog)) {
            stack.push(dialog);
        }
        this.set('extraClasses', this.get('extraClass') + ' ' + dialog.get('extraClass'));
        this.set('dialogStack', stack.slice());
    },
    // extraClass: function() {
    //     var stack = this.get('dialogStack');
    //     const lastObject = stack.get('lastObject');
    //     if(lastObject !== this) {
    //         return lastObject.get('extraClass');
    //     }
    // }.property('dialogStack'),
    goToDialog: function (from, toName) {
        this._goToDialog(toName);
    },
    back: function () {
        var stack = this.get('dialogStack');
        var dialog = stack.pop();
        var previousDialog = stack.get('lastObject');
        console.log(dialog.get('name') + ' GO TO ' + previousDialog.get('name'));
        this._goToDialog(previousDialog.get('name'));
        this.set('dialogStack', stack.slice());
    },
    actions: {
        close: function () {
            this.sendAction('close');
        }
    }
});
