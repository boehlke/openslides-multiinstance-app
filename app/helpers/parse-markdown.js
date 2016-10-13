
import Ember from 'ember';
var parseMarkdown = Ember.Helper.helper(function(params) {
    var string = params[0];
    var html = window.marked(string);
    return new Ember.Handlebars.SafeString(html);
});
export default parseMarkdown;
