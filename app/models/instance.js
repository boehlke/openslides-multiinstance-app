import DS from 'ember-data';

export default DS.Model.extend({
  slug: DS.attr('string'),
  parent_domain: DS.attr('string'),
  domain: function() {
    return this.get('slug') + '.' + this.get('parent_domain');
  }.property('parent_domain', 'slug'),

  volumes: DS.hasMany('instance-volume'),

  osversion: DS.belongsTo('osversion'),

  url: DS.attr('string'),

  // Event attributes
  event_name: DS.attr('string'),
  event_description: DS.attr('string'),
  event_date: DS.attr('date'),
  event_location: DS.attr('string'),
  event_organizer: DS.attr('string'),

  // Admin Attributes
  admin_first_name: DS.attr('string'),
  admin_last_name: DS.attr('string'),
  admin_user_name: function() {
    return this.get('admin_first_name') + this.get('admin_last_name');
  }.property('admin_first_name', 'admin_last_name'),
  admin_initial_password: DS.attr('string'),

  active: DS.attr('boolean'),
  state: DS.attr('string') // created, installing, running, sleeping, error, inactive
});
