'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var hyphenated = require('hyphenated');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var Hyphenated = function Hyphenated(_ref) {
  var children = _ref.children,
      language = _ref.language;
  var childrenCount = React.Children.count(children);

  var hyphenateChild = function hyphenateChild(child) {
    if (child === null) {
      return null;
    } else if (child.type === Hyphenated) {
      return child;
    } else if (typeof child === 'string') {
      return hyphenated.hyphenated(child, {
        language: language
      });
    } else {
      var _child$props = child.props,
          _children = _child$props.children,
          props = _objectWithoutProperties(_child$props, ["children"]);

      return _children ? React.cloneElement(child, props, Hyphenated({
        children: _children,
        language: language
      })) : child;
    }
  };

  if (childrenCount === 1) {
    return hyphenateChild(children);
  }

  return React.Children.map(children, hyphenateChild);
};

module.exports = Hyphenated;