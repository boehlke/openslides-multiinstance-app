import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import Pretender from 'pretender';

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

//new Pretender(function () {
//  this.get('openslides-versions', function() {
//    return [200, {'content-type': 'application/json;charset=utf-8'}, JSON.stringify(
//      {
//        data: [
//          {
//            "id": "1.0",
//            "type": "openslides-version",
//            "attributes": {
//              "name": "1.0",
//              "image": "asdf"
//            }
//          }
//        ]
//      }
//    )];
//  });
//  this.post('instances', function(request) {
//    const data = JSON.parse(request.requestBody);
//    data.attributes;
//    data.osversion;
//    const admin = data.relationships.admin.data;
//    return [200, {'content-type': 'application/json;charset=utf-8'}, request.requestBody];
//  });
//  this.get("instances", function (response) {
//    return [200, {'content-type': 'application/json;charset=utf-8'}, JSON.stringify(
//      {
//        data: [
//          {
//            "id": "7",
//            "type": "instance",
//            "slug": "konferenz",
//            "domain": "dbg.de",
//            "osversion": "2.1.2",
//            "event": 7,
//            "relationships": {
//              "event": {
//                "data": {
//                  "id": "7_event",
//                  "type": "event"
//                }
//              }
//            }
//          }
//        ],
//        included: [
//          {
//            "type": "events",
//            "id": "7_event",
//            "attributes": {
//              "name": "Konferenz"
//            }
//          }
//        ]
//      }
//    )];
//  });
//});

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
