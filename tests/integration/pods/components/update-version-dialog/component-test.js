import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('update-version-dialog', 'Integration | Component | update version dialog', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{update-version-dialog}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#update-version-dialog}}
      template block text
    {{/update-version-dialog}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
