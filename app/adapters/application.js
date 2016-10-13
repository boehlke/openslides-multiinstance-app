import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  bulkCommit: true,
  // namespace: 'api',
  headers: {
    'Accept': 'application/vnd.app+json;version=1',
    'Content-Type': 'application/vnd.api+json',
    //'x-appid': '2375498237',
    //'x-secret': '238945298235236236236236375923'
  },
  ajax: function(url, type, hash) {
    if (this.headers !== undefined) {
      var headers = this.headers;
      hash.beforeSend = function (xhr) {
        Ember.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      };
    }
    return this._super(url, type, hash);
  }
});

