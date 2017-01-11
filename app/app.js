import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
//import Pretender from 'pretender';

import FormFieldComponent from 'ember-form-for/components/form-field';

FormFieldComponent.reopen({
  propertyNameDidChange: Ember.observer('propertyName', 'errorsProperty', function () {
    let propertyName = Ember.get(this, 'propertyName');
    let errorsProperty = Ember.get(this, 'errorsProperty');

    Ember.mixin(this, {
      rawValue: Ember.computed.reads(`object.${propertyName}`),
      errors: Ember.computed.reads(`object.${errorsProperty}.${propertyName}.validation`),
      hasErrors: Ember.computed.notEmpty(`object.${errorsProperty}.${propertyName}`)
    });
  })
});

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
