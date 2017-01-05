import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function keyForAttribute(key) {
    return key;
  }
});
