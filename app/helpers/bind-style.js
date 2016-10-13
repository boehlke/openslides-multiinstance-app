import Ember from 'ember';

function bindStyleHelper(args, attrs) {
    var ret = [];
    var style = [];

    var attrKeys = Object.keys(attrs).filter(function(item, index, self) {
        return (item.indexOf("unit") == -1) && (item !== "static");
    });

    // For each attribute passed, create an observer and emit the
    // current value of the property as an attribute.
    attrKeys.forEach(function(attr) {
        var value = attrs[attr];

        var propertyUnit = attrs[attr+"-unit"] || attrs["unit"] || '';
        if(value) {
            style.push(attr+':'+value+propertyUnit+';'+(attrs["static"] || ''));
        }
    }, this);

    // Add the unique identifier
    ret.push(style.join(' '));
    return Ember.String.htmlSafe(ret.join(' '));
}

export default Ember.Helper.helper(bindStyleHelper);
