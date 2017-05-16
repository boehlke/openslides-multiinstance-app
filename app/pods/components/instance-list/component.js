import Ember from "ember";

const sortFunctions = {
  name: function (a, b) {
    return a.get('event_name').toLowerCase().localeCompare(b.get('event_name').toLowerCase());
  },
  version: function (a, b) {
    return a.get('osversion.id') - b.get('osversion.id');
  },
  status: function (a, b) {
    let state = a.get('state');
    let state2 = b.get('state');
    return state ? state.localeCompare(state2) : -1;
  }
};

export default Ember.Component.extend({
  sortAscending: true,
  savedInstances: Ember.computed.filter('model', function (instance) {
    return !!instance.get('slug');
  }),
  sortedProperties: ['name'],
  sortedInstances: Ember.computed('savedInstances', 'sortedProperties.@each', 'sortAscending', function () {
    let sortedProperty = this.get('sortedProperties')[0];
    let fnCompare = this.get('sortAscending') ?
      function(a, b) { return sortFunctions[sortedProperty](a, b); } :
      function (a, b) { return sortFunctions[sortedProperty](b, a);};
    return this.get('savedInstances').sort(fnCompare);
  }),
  sortedOnName: Ember.computed('sortedProperties.[]', function () {
    return this.get('sortedProperties')[0] === 'name';
  }),
  sortedOnVersion: Ember.computed('sortedProperties.[]', function () {
    return this.get('sortedProperties')[0] === 'version';
  }),
  sortedOnStatus: Ember.computed('sortedProperties.[]', function () {
    return this.get('sortedProperties')[0] === 'status';
  }),
  glyphiconDirection: Ember.computed('sortAscending', function () {
    return this.get('sortAscending') ? "glyphicon-chevron-down" : "glyphicon-chevron-up";
  }),

  store: Ember.inject.service(),
  initRefresh: function () {
    const refresh = function () {
      this.get('store').findAll('instance').then((instances) => {
        this.set('model', instances);
      });
    }.bind(this);
    setInterval(3000, refresh);
  }.on('init'),
  actions: {
    upgradeInstance: function (instance) {
      this.sendAction('upgradeInstance', instance);
    },
    removeInstance: function (instance) {
      if (confirm('Do you really want to remove this instance?')) {
        this.set('saving', true);
        this.get('model').removeObject(instance);
        instance.destroyRecord().finally(() => {
          this.set('saving', false);
          this.sendAction('update');
        });
      }
    },
    update: function () {
      this.sendAction('update');
    },
    sortBy: function (property) {
      if(this.get('sortedProperties')[0] === property) {
        this.toggleProperty('sortAscending');
      } else {
        this.set('sortAscending', true);
        this.set('sortedProperties', [property]);
      }
    }
  }
});
