import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('instance-projector-logo', 'Integration | Component | instance projector logo', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{instance-projector-logo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#instance-projector-logo}}
      template block text
    {{/instance-projector-logo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
