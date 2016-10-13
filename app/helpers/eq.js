import Ember from 'ember';

export let eq = (params) => params[0] === params[1];

export default Ember.Helper.helper(eq);
