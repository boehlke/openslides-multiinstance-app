import Ember from 'ember';

export default Ember.Component.extend({
  savedInstances: Ember.computed.filter('model', function(instance) { return !!instance.get('slug'); }),
  sortedInstances: Ember.computed.sort('savedInstances', function(a, b) {
    return a.get('event_name').toLowerCase() > b.get('event_name').toLowerCase();
  }),
    store: Ember.inject.service(),
    initRefresh: function() {
	var refresh = function () {
	    this.get('store').findAll('instance').then((instances) => {
		this.set('model', instances);
	    });
	}.bind(this);
	setInterval(3000, refresh);
    }.on('init'),
    actions: {
      removeInstance: function(instance) {
        if(confirm('Action cannot be undone')) {
          this.set('saving', true);
	  this.get('model').removeObject(instance);
	  instance.destroyRecord().finally(() => {
            this.set('saving', false);
            this.sendAction('update');
          });
        }
      },
      update: function() {
        this.sendAction('update');
      }
    }
});
