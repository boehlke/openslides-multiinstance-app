import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  image: DS.attr('string'),
  default: DS.attr('boolean')
});
