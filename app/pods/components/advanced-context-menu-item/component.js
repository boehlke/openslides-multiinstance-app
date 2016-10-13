import Ember from 'ember';

export default Ember.Component.extend({
    //tagName: '',
    name: 'root',
    rendered: Ember.computed('menu.dialogName', 'menu.dialogStack', function() {
        var name = this.get('name');

        if(name === this.get('menu.dialogName')) {
            this.get('menu').transitionComplete(this);
            return true;
        }
        return false;
        //return Ember.A(this.get('menu.dialogStack').map(function(d) { return d.get('name'); })).contains(name);
    }),
    //slideClass: Ember.computed('menu.dialogStack', 'menu.dialogName', function() {
    //    const stack = this.get('menu.dialogStack');
    //    var currentName = this.get('menu.dialogName');
    //    var name = this.get('name');
    //    if(currentName === name) {
    //        return "slideInRight animated";
    //    }
    //    if(stack.contains(name) && stack.length > 0 && stack.lastObject !== name) {
    //        return "slideOutLeft";
    //    }
    //}),
    actions: {
        descend: function(toName) {
            var menu = this.get('menu');
            menu.goToDialog(this, toName);
        },
        back: function() {
            this.get('menu').back();
        },
        close: function() {
            this.get('menu').send('close');
        }
    }
});
