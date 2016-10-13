import Ember from 'ember';

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
}

export default Ember.Helper.helper(function(args, options) {
    var text = args[0];
    return Ember.String.htmlSafe(urlify(text));
});
