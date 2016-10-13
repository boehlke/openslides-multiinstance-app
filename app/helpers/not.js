import Ember from 'ember';

export let not = (params) => !params[0];

export default Ember.Helper.helper(not);
