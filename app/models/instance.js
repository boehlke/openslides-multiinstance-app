import DS from 'ember-data';

function replaceSpecialChars(adminFirstName) {
  return adminFirstName.replace(/[áàâä]/g, 'a')
    .replace(/[úùûü]/g, 'u')
    .replace(/[^A-Za-z0-9\-_]/g, '-');
}
export default DS.Model.extend({
  slug: DS.attr('string'),
  parent_domain: DS.attr('string'),
  domain: function() {
    return this.get('slug') + '.' + this.get('parent_domain');
  }.property('parent_domain', 'slug'),
  db: DS.attr('string', { defaultValue: 'postgresql' }),
  mode: DS.attr('string', { defaultValue: 'subdomain'}),

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
  admin_username: DS.attr('string'),
  admin_user_name: function() {
    var adminFirstName = this.get('admin_first_name') || '';
    var adminLastName = this.get('admin_last_name') || '';
    return replaceSpecialChars(adminLastName) + replaceSpecialChars(adminFirstName);
  }.property('admin_first_name', 'admin_last_name'),
  admin_initial_password: DS.attr('string'),

  superadmin_password: DS.attr('string'),

  active: DS.attr('boolean'),
  state: DS.attr('string') // created, installing, running, sleeping, error, inactive
});
