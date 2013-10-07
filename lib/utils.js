
exports.applyDefaults = function (defaultValues, providedValues) {
  var ret = {};

  exports.copyProperties(providedValues, ret);
  exports.copyProperties(defaultValues, ret);

  return ret;
};

exports.copyProperties = function (source, target) {
  var prop;

  if (!target) {
    target = {};
  }

  if (source) {
    for (prop in source) {
      if (!(prop in target)) {
        target[prop] = source[prop];
      }
    }
  }

  return target;
};

exports.formatObject = function (obj) {
  if (obj) {
    return JSON.stringify(obj, null, 2);
  }
  return '';
};
