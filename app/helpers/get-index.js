import Ember from 'ember';

export let getIndex = (params) =>{
    const array = params[0];
    const key = params[1];
    const result = (!Array.isArray(array) && array.toArray) ? array.toArray()[key] : array[key];
    return result;
};

export default Ember.Helper.helper(getIndex);
